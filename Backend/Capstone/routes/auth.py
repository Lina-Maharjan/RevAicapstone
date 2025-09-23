from fastapi import APIRouter, HTTPException, Depends
from models.schemas import SignupUser, LoginUser
from models.response_models import AuthResponse, StandardResponse
from utils.auth_utils import hash_password, verify_password, create_access_token, get_current_user
from database.user_db import create_user, get_user_by_username, get_user_by_email

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/signup", response_model=StandardResponse)
def signup(user: SignupUser):
    """User registration endpoint"""
    try:
        # Check if username already exists
        if get_user_by_username(user.username):
            raise HTTPException(status_code=400, detail="Username already exists")
        
        # Check if email already exists
        if get_user_by_email(user.email):
            raise HTTPException(status_code=400, detail="Email already exists")
        
        # Hash password and create user
        hashed_pw = hash_password(user.password)
        new_user = create_user(user.username, user.email, hashed_pw)
        
        return StandardResponse(
            success=True,
            message="User created successfully",
            data={"username": user.username, "email": user.email}
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.post("/login", response_model=AuthResponse)
def login(user: LoginUser):
    """User login endpoint"""
    try:
        # Try to find user by username first
        db_user = get_user_by_username(user.identifier)
        
        # If not found, try finding by email
        if not db_user:
            db_user = get_user_by_email(user.identifier)
        
        # Validate credentials
        if not db_user or not verify_password(user.password, db_user["password"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        # Create access token
        token = create_access_token(data={"sub": db_user["username"]})
        
        return AuthResponse(
            access_token=token,
            token_type="bearer",
            user_info={
                "username": db_user["username"],
                "email": db_user["email"],
                "user_id": db_user["_id"]
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/me", response_model=StandardResponse)
def get_current_user_info(current_user: str = Depends(get_current_user)):
    """Get current user information"""
    try:
        user = get_user_by_username(current_user)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        return StandardResponse(
            success=True,
            message="User information retrieved successfully",
            data={
                "username": user["username"],
                "email": user["email"],
                "user_id": user["_id"]
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/secure")
def secure_route(current_user: str = Depends(get_current_user)):
    """Protected route for testing authentication"""
    return StandardResponse(
        success=True,
        message=f"Welcome, {current_user}! You are authenticated.",
        data={"user": current_user}
    )