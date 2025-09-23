#!/usr/bin/env python3

import sys
sys.path.append('.')
from database.mongo import user_collection
from utils.auth_utils import hash_password

# Create a test user if it doesn't exist
def create_test_user():
    test_user = {
        "username": "testuser",
        "email": "test@example.com",
        "password": hash_password("password123")
    }
    
    existing_user = user_collection.find_one({"email": test_user["email"]})
    
    if existing_user:
        print("Test user already exists")
    else:
        result = user_collection.insert_one(test_user)
        print(f"Created test user with ID: {result.inserted_id}")

if __name__ == "__main__":
    create_test_user()
    print("Test user setup complete")
