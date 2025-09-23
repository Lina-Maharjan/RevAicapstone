from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from enum import Enum

class SentimentType(str, Enum):
    POSITIVE = "positive"
    NEGATIVE = "negative"
    NEUTRAL = "neutral"

class CategoryType(str, Enum):
    QUALITY = "quality"
    PRICE = "price"
    DELIVERY = "delivery"
    SERVICE = "service"
    GENERAL = "general"

class FakeDetectionResult(str, Enum):
    FAKE = "fake"
    REAL = "real"

class User(BaseModel):
    username: str
    email: EmailStr
    password: str

class SignupUser(BaseModel):
    username: str
    email: EmailStr
    password: str

class LoginUser(BaseModel):
    identifier: str
    password: str

class ReviewInput(BaseModel):
    product_url: Optional[str] = None
    manual_reviews: Optional[List[str]] = None

class TextAnalysisInput(BaseModel):
    reviews: List[str]

class SingleReviewAnalysis(BaseModel):
    review_text: str
    is_fake: FakeDetectionResult
    sentiment: SentimentType
    sentiment_score: float
    category: CategoryType
    confidence_score: float

class AnalysisResponse(BaseModel):
    total_reviews: int
    fake_count: int
    real_count: int
    sentiment_distribution: Dict[str, int]
    category_distribution: Dict[str, int]
    detailed_results: List[SingleReviewAnalysis]
    overall_sentiment: SentimentType
    fake_percentage: float