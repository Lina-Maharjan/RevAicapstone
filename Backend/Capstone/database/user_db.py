from database.mongo import user_collection
from typing import Optional
from bson import ObjectId

# Create new user
def create_user(username: str, email: str, hashed_password: str) -> dict:
    user = {
        "username": username,
        "email": email,
        "password": hashed_password
    }
    result = user_collection.insert_one(user)
    user["_id"] = str(result.inserted_id)
    return user

# Get user by username
def get_user_by_username(username: str) -> Optional[dict]:
    user = user_collection.find_one({"username": username})
    if user:
        user["_id"] = str(user["_id"])
    return user

def get_user_by_email(email: str) -> Optional[dict]:
    user = user_collection.find_one({"email": email})
    if user:
        user["_id"] = str(user["_id"])
    return user

# Save analysis result
def save_analysis_result(user_id: str, analysis_data: dict) -> dict:
    analysis_data["user_id"] = user_id
    result = user_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$push": {"analyses": analysis_data}}
    )
    return {"success": result.modified_count > 0}