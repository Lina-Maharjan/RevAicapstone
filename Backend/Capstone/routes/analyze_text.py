from fastapi import APIRouter, HTTPException, Depends
from models.schemas import TextAnalysisInput, AnalysisResponse
from models.response_models import StandardResponse
from utils.prediction import review_analyzer
from utils.auth_utils import get_current_user
from database.user_db import get_user_by_username
import logging

router = APIRouter(prefix="/text", tags=["Text Analysis"])
logger = logging.getLogger(__name__)

@router.post("/analyze", response_model=AnalysisResponse)
def analyze_text_reviews(data: TextAnalysisInput, current_user: str = Depends(get_current_user)):
    """Analyze provided text reviews for fake detection, sentiment, and categorization"""
    try:
        # Validate input
        if not data.reviews or len(data.reviews) == 0:
            raise HTTPException(status_code=400, detail="No reviews provided")
        
        # Clean and filter reviews
        clean_reviews = [review.strip() for review in data.reviews if review and review.strip()]
        
        if not clean_reviews:
            raise HTTPException(status_code=400, detail="No valid reviews found after cleaning")
        
        # Limit number of reviews to prevent overload
        if len(clean_reviews) > 100:
            clean_reviews = clean_reviews[:100]
            logger.warning(f"Limited analysis to first 100 reviews for user {current_user}")
        
        # Perform analysis
        logger.info(f"Analyzing {len(clean_reviews)} reviews for user {current_user}")
        analysis_result = review_analyzer.analyze_reviews(clean_reviews)
        
        return AnalysisResponse(**analysis_result)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in analyze_text_reviews: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error during analysis")

@router.post("/quick-analysis")
def quick_analysis(data: TextAnalysisInput, current_user: str = Depends(get_current_user)):
    """Quick analysis returning just summary statistics"""
    try:
        if not data.reviews:
            raise HTTPException(status_code=400, detail="No reviews provided")
        
        clean_reviews = [review.strip() for review in data.reviews if review and review.strip()]
        
        if not clean_reviews:
            raise HTTPException(status_code=400, detail="No valid reviews found")
        
        # Perform quick analysis (limit to 50 reviews for speed)
        sample_reviews = clean_reviews[:50]
        analysis_result = review_analyzer.analyze_reviews(sample_reviews)
        
        # Return just summary statistics
        summary = {
            "total_analyzed": len(sample_reviews),
            "fake_percentage": analysis_result["fake_percentage"],
            "overall_sentiment": analysis_result["overall_sentiment"],
            "sentiment_distribution": analysis_result["sentiment_distribution"],
            "category_distribution": analysis_result["category_distribution"]
        }
        
        return StandardResponse(
            success=True,
            message="Quick analysis completed",
            data=summary
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in quick_analysis: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/health")
def text_analysis_health():
    """Health check for text analysis service"""
    return StandardResponse(
        success=True,
        message="Text analysis service is running",
        data={"analyzer_ready": True}
    )