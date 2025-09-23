import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    MONGODB_URI = os.getenv("MONGODB_URI")
    SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret-key")
    RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")
    RAPIDAPI_HOST = os.getenv("RAPIDAPI_HOST")
    
    # JWT Settings
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30
    
    # Database Settings
    DATABASE_NAME = "review_db"
    REVIEWS_COLLECTION = "reviews"
    USERS_COLLECTION = "users"

settings = Settings()