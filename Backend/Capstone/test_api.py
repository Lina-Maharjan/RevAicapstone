#!/usr/bin/env python3

import sys
sys.path.append('.')
from utils.api_connector import test_api_connection
import json

# Try different popular ASINs
test_asins = ['B08N5WRWNW', 'B07FZ8S74R', 'B084DDDNRP', 'B08F7PTF53']

for asin in test_asins:
    print(f"\nTesting ASIN: {asin}")
    result = test_api_connection(asin)
    print(f"Success: {result['success']}")
    reviewers_count = result.get('reviewers_count', 'N/A')
    product_name = result.get('product_name', 'N/A')
    print(f"Reviewers count: {reviewers_count}")
    print(f"Product name: {product_name}")
    if not result['success']:
        error_msg = result.get('error', 'Unknown')
        print(f"Error: {error_msg}")
        break
    print('---')
