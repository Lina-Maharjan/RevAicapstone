from fastapi import APIRouter, HTTPException, Depends
from models.schemas import AnalysisResponse
from models.response_models import StandardResponse
from utils.auth_utils import get_current_user
from database.user_db import get_user_by_username
import logging
from typing import List
from datetime import datetime
import pymongo
from bson import ObjectId

from database.mongo import get_database, analysis_history

router = APIRouter(prefix="/user", tags=["User Data"])
logger = logging.getLogger(__name__)

@router.post("/save-analysis", response_model=StandardResponse)
def save_analysis_to_history(
    analysis: AnalysisResponse, 
    current_user: str = Depends(get_current_user)
):
    """Save analysis result to user history"""
    try:
        user = get_user_by_username(current_user)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Convert pydantic model to dict and add metadata
        analysis_data = analysis.dict()
        analysis_data["user_id"] = str(user["_id"])
        analysis_data["timestamp"] = datetime.utcnow()
        
        # Store directly in analysis_history collection
        result = analysis_history.insert_one(analysis_data)
        
        return StandardResponse(
            success=True,
            message="Analysis saved to history",
            data={"analysis_id": str(result.inserted_id)}
        )
    except Exception as e:
        logger.error(f"Error saving analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to save analysis: {str(e)}")

@router.get("/analysis-history", response_model=StandardResponse)
def get_analysis_history(
    limit: int = 10, 
    skip: int = 0,
    current_user: str = Depends(get_current_user)
):
    """Get user's analysis history"""
    try:
        user = get_user_by_username(current_user)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Query for this user's analysis history - use analysis_history directly
        cursor = analysis_history.find(
            {"user_id": str(user["_id"])}
        ).sort(
            "timestamp", -1
        ).skip(skip).limit(limit)
        
        # Convert to list and sanitize ObjectId fields
        history = []
        for doc in cursor:
            doc["_id"] = str(doc["_id"])
            # Convert datetime objects to strings for JSON serialization
            if "timestamp" in doc and isinstance(doc["timestamp"], datetime):
                doc["timestamp"] = doc["timestamp"].isoformat()
            history.append(doc)
        
        return StandardResponse(
            success=True,
            message="Analysis history retrieved",
            data={"history": history, "total": len(history)}
        )
    except Exception as e:
        logger.error(f"Error retrieving analysis history: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to retrieve analysis history: {str(e)}")

@router.get("/dashboard-stats", response_model=StandardResponse)
def get_dashboard_stats(current_user: str = Depends(get_current_user)):
    """Get user's dashboard statistics"""
    try:
        user = get_user_by_username(current_user)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Count total analyses - use analysis_history directly
        total_analyses = analysis_history.count_documents({
            "user_id": str(user["_id"])
        })
        
        # Count fake reviews detected
        fake_reviews_count = 0
        analyses = analysis_history.find({"user_id": str(user["_id"])})
        for analysis in analyses:
            if "detailed_results" in analysis:
                fake_reviews_count += sum(
                    1 for result in analysis["detailed_results"] 
                    if result.get("is_fake") == "fake"
                )
        
        # Get sentiment distribution
        positive_count = 0
        negative_count = 0
        neutral_count = 0
        
        analyses = analysis_history.find({"user_id": str(user["_id"])})
        for analysis in analyses:
            if "sentiment_distribution" in analysis:
                positive_count += analysis["sentiment_distribution"].get("positive", 0)
                negative_count += analysis["sentiment_distribution"].get("negative", 0)
                neutral_count += analysis["sentiment_distribution"].get("neutral", 0)
        
        sentiment_distribution = {
            "positive": positive_count,
            "negative": negative_count,
            "neutral": neutral_count
        }
        
        # Get last analysis date
        last_analysis = get_last_analysis_date(str(user["_id"]))
        
        return StandardResponse(
            success=True,
            message="Dashboard stats retrieved",
            data={
                "total_analyses": total_analyses,
                "fake_reviews_detected": fake_reviews_count,
                "sentiment_distribution": sentiment_distribution,
                "last_analysis_date": last_analysis.isoformat() if last_analysis else None
            }
        )
    except Exception as e:
        logger.error(f"Error retrieving dashboard stats: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to retrieve dashboard statistics: {str(e)}")

def get_last_analysis_date(user_id):
    """Helper to get the date of last analysis"""
    last_analysis = analysis_history.find_one(
        {"user_id": str(user_id)},
        sort=[("timestamp", -1)]
    )
    
    return last_analysis["timestamp"] if last_analysis and "timestamp" in last_analysis else None

