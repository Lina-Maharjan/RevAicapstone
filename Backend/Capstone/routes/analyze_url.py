from fastapi import APIRouter, HTTPException, Depends
from models.schemas import ReviewInput, AnalysisResponse
from models.response_models import ReviewFetchResponse, StandardResponse
from utils.api_connector import fetch_reviews_from_amazon, extract_asin_from_url
from utils.prediction import review_analyzer
from utils.auth_utils import get_current_user
from typing import List
import logging

router = APIRouter(prefix="/analyze", tags=["URL Analysis"])
logger = logging.getLogger(__name__)

@router.post("/fetch-reviews", response_model=ReviewFetchResponse)
def fetch_reviews(data: ReviewInput, current_user: str = Depends(get_current_user)):
    """Fetch reviews from Amazon URL or accept manual reviews"""
    try:
        all_reviews = []
        source = "unknown"
        
        # Handle URL-based review extraction
        if data.product_url:
            try:
                asin = extract_asin_from_url(data.product_url)
                logger.info(f"Extracted ASIN: {asin}")
                url_reviews = fetch_reviews_from_amazon(asin)
                all_reviews.extend(url_reviews)
                source = "url" if not data.manual_reviews else "mixed"
                logger.info(f"Fetched {len(url_reviews)} reviews from URL")
            except ValueError as ve:
                raise HTTPException(status_code=400, detail=str(ve))
            except Exception as e:
                logger.error(f"Error fetching reviews from URL: {str(e)}")
                raise HTTPException(status_code=500, detail="Failed to fetch reviews from URL")
        
        # Handle manual reviews
        if data.manual_reviews:
            manual_reviews = [review.strip() for review in data.manual_reviews if review.strip()]
            all_reviews.extend(manual_reviews)
            source = "manual" if not data.product_url else "mixed"
            logger.info(f"Added {len(manual_reviews)} manual reviews")
        
        # Validate that we have reviews
        if not all_reviews:
            raise HTTPException(status_code=400, detail="No valid reviews found or provided.")
        
        # Remove duplicates while preserving order
        unique_reviews = []
        seen = set()
        for review in all_reviews:
            if review not in seen:
                unique_reviews.append(review)
                seen.add(review)
        
        return ReviewFetchResponse(
            total_reviews=len(unique_reviews),
            reviews=unique_reviews,
            source=source
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in fetch_reviews: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/complete-analysis", response_model=AnalysisResponse)
def complete_analysis(data: ReviewInput, current_user: str = Depends(get_current_user)):
    """Perform complete analysis: fetch reviews + analyze them"""
    try:
        # First fetch reviews using the existing endpoint logic
        all_reviews = []
        
        if data.product_url:
            try:
                asin = extract_asin_from_url(data.product_url)
                url_reviews = fetch_reviews_from_amazon(asin)
                all_reviews.extend(url_reviews)
            except ValueError as ve:
                raise HTTPException(status_code=400, detail=str(ve))
        
        if data.manual_reviews:
            manual_reviews = [review.strip() for review in data.manual_reviews if review.strip()]
            all_reviews.extend(manual_reviews)
        
        if not all_reviews:
            raise HTTPException(status_code=400, detail="No valid reviews found or provided.")
        
        # Remove duplicates
        unique_reviews = list(dict.fromkeys(all_reviews))
        
        # Analyze reviews
        analysis_result = review_analyzer.analyze_reviews(unique_reviews)
        
        return AnalysisResponse(**analysis_result)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in complete_analysis: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
    
@router.get("/test-api")
def test_rapidapi_connection(current_user: str = Depends(get_current_user)):
    """Test RapidAPI connection"""
    from utils.api_connector import test_api_connection
    
    result = test_api_connection()
    return StandardResponse(
        success=result["success"],
        message="API connection test completed",
        data=result
    )