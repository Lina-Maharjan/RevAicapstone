import requests
import json

def test_fetch_reviews():
    """Test the /analyze/fetch-reviews endpoint"""
    print("===== TESTING FETCH REVIEWS ENDPOINT =====")
    
    # First, get a token
    login_response = requests.post(
        "http://localhost:8000/auth/login",
        json={"identifier": "testuser", "password": "password123"}
    )
    
    if login_response.status_code != 200:
        print(f"Failed to login: {login_response.status_code}")
        print(login_response.text)
        return
    
    token = login_response.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test with manual reviews only
    manual_data = {
        "manual_reviews": ["This is a test review", "Another test review here"]
    }
    
    manual_response = requests.post(
        "http://localhost:8000/analyze/fetch-reviews",
        json=manual_data,
        headers=headers
    )
    
    print("\nManual Reviews Test:")
    print(f"Status Code: {manual_response.status_code}")
    print(f"Response: {json.dumps(manual_response.json(), indent=2)}")
    
    # Test with URL only
    url_data = {
        "product_url": "https://www.amazon.com/dp/B08N5WRWNW"
    }
    
    url_response = requests.post(
        "http://localhost:8000/analyze/fetch-reviews",
        json=url_data,
        headers=headers
    )
    
    print("\nURL Reviews Test:")
    print(f"Status Code: {url_response.status_code}")
    try:
        print(f"Response: {json.dumps(url_response.json(), indent=2)}")
    except:
        print(f"Response (not JSON): {url_response.text}")

    # Test with both
    mixed_data = {
        "product_url": "https://www.amazon.com/dp/B08N5WRWNW",
        "manual_reviews": ["This is a test review", "Another test review here"]
    }
    
    mixed_response = requests.post(
        "http://localhost:8000/analyze/fetch-reviews",
        json=mixed_data,
        headers=headers
    )
    
    print("\nMixed Reviews Test:")
    print(f"Status Code: {mixed_response.status_code}")
    try:
        print(f"Response: {json.dumps(mixed_response.json(), indent=2)}")
    except:
        print(f"Response (not JSON): {mixed_response.text}")

if __name__ == "__main__":
    test_fetch_reviews()
