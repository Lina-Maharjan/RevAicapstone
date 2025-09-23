from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class StandardResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None

class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    detail: Optional[str] = None

class AuthResponse(BaseModel):
    access_token: str
    token_type: str
    user_info: Dict[str, str]

class ReviewFetchResponse(BaseModel):
    total_reviews: int
    reviews: List[str]
    source: str  # "url" or "manual" or "mixed"