from fastapi import APIRouter, HTTPException, Request
from models.schemas import TextAnalysisInput, AnalysisResponse, ReviewInput
from utils.prediction import review_analyzer
from utils.api_connector import fetch_reviews_from_amazon, extract_asin_from_url
import logging
from datetime import datetime, timedelta

router = APIRouter(prefix="/demo", tags=["Demo Analysis"])
logger = logging.getLogger(__name__)

# Store demo attempts with IP addresses
demo_attempts = {}

def check_demo_limit(ip: str) -> bool:
    """Check if the IP has exceeded demo limits"""
    now = datetime.now()
    
    if ip not in demo_attempts:
        demo_attempts[ip] = {"count": 1, "last_try": now}
        return True
        
    attempts = demo_attempts[ip]
    # Reset counter if 24 hours have passed
    if now - attempts["last_try"] > timedelta(hours=24):
        attempts["count"] = 1
        attempts["last_try"] = now
        return True
        
    if attempts["count"] >= 3:
        return False
        
    attempts["count"] += 1
    attempts["last_try"] = now
    return True

@router.post("/analyze-text", response_model=AnalysisResponse)
async def demo_analyze_text(data: TextAnalysisInput, request: Request):
    """Demo endpoint for analyzing text reviews"""
    client_ip = request.client.host
    
    if not check_demo_limit(client_ip):
        raise HTTPException(
            status_code=429,
            detail={
                "message": "Demo limit reached. Please register or login to continue.",
                "tries_used": demo_attempts[client_ip]["count"],
                "requires_auth": True
            }
        )
    
    try:
        results = review_analyzer.analyze_reviews(data.reviews)
        remaining_tries = 3 - demo_attempts[client_ip]["count"]
        
        return {
            **results,
            "message": f"Demo analysis complete. {remaining_tries} tries remaining."
        }
    except Exception as e:
        logger.error(f"Demo analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail="Analysis failed")

@router.post("/analyze-url")
async def demo_analyze_url(data: ReviewInput, request: Request):
    """Demo endpoint for analyzing reviews from URL"""
    client_ip = request.client.host
    
    if not check_demo_limit(client_ip):
        raise HTTPException(
            status_code=429,
            detail={
                "message": "Demo limit reached. Please register or login to continue.",
                "tries_used": demo_attempts[client_ip]["count"],
                "requires_auth": True
            }
        )
    
    try:
        reviews = []
        if data.product_url:
            asin = extract_asin_from_url(data.product_url)
            reviews.extend(fetch_reviews_from_amazon(asin, max_pages=1))
        
        if data.manual_reviews:
            reviews.extend(data.manual_reviews)
        
        if not reviews:
            raise HTTPException(status_code=400, detail="No reviews found")
        
        results = review_analyzer.analyze_reviews(reviews)
        remaining_tries = 3 - demo_attempts[client_ip]["count"]
        
        return {
            **results,
            "message": f"Demo analysis complete. {remaining_tries} tries remaining."
        }
    except Exception as e:
        logger.error(f"Demo URL analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail="Analysis failed")