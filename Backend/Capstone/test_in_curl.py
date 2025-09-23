import requests
import json
import time

def main():
    # Wait for the server to start
    print("Waiting for server to start...")
    time.sleep(2)

    # Test the API test endpoint first
    test_api()
    
    # Then test the review fetching
    test_fetch_reviews()

def test_api():
    print("\n===== TESTING API CONNECTION =====")
    try:
        response = requests.get("http://localhost:8000/analyze/test-api")
        print(f"Status: {response.status_code}")
        if response.status_code == 401:  # Unauthorized, need to login
            print("Need to login first...")
            return
        else:
            print("Response:", response.json())
    except Exception as e:
        print(f"Error testing API: {e}")

def test_fetch_reviews():
    print("\n===== TESTING FETCH REVIEWS ENDPOINT =====")
    
    try:
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
        
        print("\nTesting with manual reviews...")
        manual_response = requests.post(
            "http://localhost:8000/analyze/fetch-reviews",
            json=manual_data,
            headers=headers
        )
        
        print(f"Status: {manual_response.status_code}")
        if manual_response.status_code == 200:
            print("Success! Got reviews from manual input.")
        else:
            print(f"Error: {manual_response.text}")
        
        # Test with URL
        url_data = {
            "product_url": "https://www.amazon.com/dp/B08N5WRWNW"
        }
        
        print("\nTesting with URL...")
        url_response = requests.post(
            "http://localhost:8000/analyze/fetch-reviews",
            json=url_data,
            headers=headers
        )
        
        print(f"Status: {url_response.status_code}")
        if url_response.status_code == 200:
            print("Success! Got reviews from URL.")
            result = url_response.json()
            print(f"Total reviews: {result['total_reviews']}")
            print(f"First review: {result['reviews'][0] if result['reviews'] else 'No reviews'}")
        else:
            print(f"Error: {url_response.text}")
            
    except Exception as e:
        print(f"Error in test: {e}")

if __name__ == "__main__":
    main()
