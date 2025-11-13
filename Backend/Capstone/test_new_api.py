"""
Quick test script to verify the new RapidAPI connection
"""
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")
RAPIDAPI_HOST = os.getenv("RAPIDAPI_HOST")

print(f"🔑 API Key (first 10 chars): {RAPIDAPI_KEY[:10]}...")
print(f"🌐 API Host: {RAPIDAPI_HOST}")
print()

# Test with a popular product ASIN
test_asin = "B0CX59KV2M"  # The one you just tried
print(f"🧪 Testing with ASIN: {test_asin}")
print()

url = "https://real-time-amazon-data.p.rapidapi.com/product-reviews"

querystring = {
    "asin": test_asin,
    "country": "US",
    "page": "1"
}

headers = {
    "x-rapidapi-key": RAPIDAPI_KEY,
    "x-rapidapi-host": RAPIDAPI_HOST
}

print("📡 Making API request...")
print(f"URL: {url}")
print(f"Params: {querystring}")
print()

try:
    # Try with a longer timeout
    response = requests.get(url, headers=headers, params=querystring, timeout=30)
    
    print(f"✅ Status Code: {response.status_code}")
    print()
    
    if response.status_code == 200:
        try:
            json_data = response.json()
            print(f"📊 Response Type: {type(json_data)}")
            
            if isinstance(json_data, dict):
                print(f"🔑 Response Keys: {list(json_data.keys())}")
                print()
                
                # Check for reviews
                if "data" in json_data:
                    print("📦 Found 'data' key")
                    data = json_data["data"]
                    if isinstance(data, dict):
                        print(f"   Data keys: {list(data.keys())}")
                        if "reviews" in data:
                            reviews = data["reviews"]
                            print(f"   ✅ Found {len(reviews)} reviews")
                            if reviews:
                                print(f"   First review keys: {list(reviews[0].keys())}")
                                print(f"   Sample review text: {reviews[0].get('review_comment', reviews[0].get('review', 'N/A'))[:100]}...")
                
                elif "Reviewers" in json_data:
                    print("📦 Found 'Reviewers' key (old format)")
                    reviewers = json_data["Reviewers"]
                    print(f"   Found {len(reviewers)} reviewers")
                
                else:
                    print("❓ No 'data' or 'Reviewers' key found")
                    print(f"   Full response: {json_data}")
            
        except Exception as e:
            print(f"❌ JSON parsing error: {e}")
            print(f"Raw response (first 500 chars): {response.text[:500]}")
    
    elif response.status_code == 401:
        print("❌ Authentication Error - Check your API key")
    elif response.status_code == 403:
        print("❌ Forbidden - Your subscription might not be active yet")
    elif response.status_code == 429:
        print("❌ Rate limit exceeded")
    else:
        print(f"❌ Error: {response.status_code}")
        print(f"Response: {response.text[:500]}")

except requests.exceptions.Timeout:
    print("⏱️ Request timed out after 30 seconds")
    print("This could mean:")
    print("  1. The API subscription is not fully activated yet")
    print("  2. Network/firewall blocking the request")
    print("  3. The API endpoint is down")
    
except requests.exceptions.ConnectionError as e:
    print(f"🔌 Connection Error: {e}")
    
except Exception as e:
    print(f"❌ Unexpected error: {e}")
