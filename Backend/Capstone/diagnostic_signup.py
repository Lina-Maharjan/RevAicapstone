import sys
import logging
from database.mongo import user_collection, ping_mongo, db, client
from database.user_db import create_user, get_user_by_username
from utils.auth_utils import hash_password

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

print("="*60)
print("🔍 SIGNUP DIAGNOSTIC TEST")
print("="*60)

# Test 1: MongoDB Connection
print("\n1️⃣ Testing MongoDB Connection...")
try:
    ping_mongo()
    print("   ✅ Connection successful")
except Exception as e:
    print(f"   ❌ Connection failed: {e}")
    sys.exit(1)

# Test 2: Database and Collection Info
print("\n2️⃣ Checking Database & Collection...")
print(f"   Database name: {db.name}")
print(f"   Collection name: {user_collection.name}")
print(f"   Full namespace: {user_collection.full_name}")

# Test 3: List existing databases
print("\n3️⃣ Listing all databases...")
try:
    databases = client.list_database_names()
    print(f"   Available databases: {databases}")
    if db.name in databases:
        print(f"   ✅ '{db.name}' exists")
    else:
        print(f"   ⚠️  '{db.name}' doesn't exist yet (will be created on first insert)")
except Exception as e:
    print(f"   ❌ Error listing databases: {e}")

# Test 4: Count existing users
print("\n4️⃣ Counting existing users...")
try:
    count = user_collection.count_documents({})
    print(f"   Current user count: {count}")
    
    if count > 0:
        print("\n   📋 Existing users:")
        for user in user_collection.find({}, {"password": 0}).limit(5):
            print(f"      - {user.get('username')} ({user.get('email')})")
except Exception as e:
    print(f"   ❌ Error counting: {e}")

# Test 5: Try creating a test user
print("\n5️⃣ Testing user creation...")
test_username = "diagnostic_test_user"
test_email = "test@diagnostic.com"
test_password = "TestPassword123"

try:
    # Check if test user already exists
    existing = get_user_by_username(test_username)
    if existing:
        print(f"   ℹ️  Test user already exists, deleting...")
        user_collection.delete_one({"username": test_username})
    
    # Hash password
    hashed_pw = hash_password(test_password)
    print(f"   ✅ Password hashed successfully")
    
    # Create user
    print(f"   🔄 Attempting to create user '{test_username}'...")
    new_user = create_user(test_username, test_email, hashed_pw)
    print(f"   ✅ User created! ID: {new_user['_id']}")
    
    # Verify it was actually inserted
    print(f"   🔄 Verifying user was stored...")
    found = get_user_by_username(test_username)
    
    if found:
        print(f"   ✅ SUCCESS! User found in database:")
        print(f"      - Username: {found['username']}")
        print(f"      - Email: {found['email']}")
        print(f"      - ID: {found['_id']}")
        
        # Clean up
        user_collection.delete_one({"username": test_username})
        print(f"   🧹 Test user deleted")
    else:
        print(f"   ❌ FAIL! User was not found after creation!")
        print(f"   This means insert_one() returned success but data didn't persist")
        
except Exception as e:
    print(f"   ❌ Error during test: {e}")
    import traceback
    traceback.print_exc()

# Test 6: Check write concern
print("\n6️⃣ Checking write concern...")
try:
    write_concern = user_collection.write_concern
    print(f"   Write concern: {write_concern.document}")
except Exception as e:
    print(f"   ⚠️  Could not check write concern: {e}")

print("\n" + "="*60)
print("🏁 DIAGNOSTIC COMPLETE")
print("="*60)