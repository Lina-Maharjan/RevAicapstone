from fastapi import FastAPI
import logging
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from config.settings import settings

app = FastAPI()

# Create a new client and connect to the server
client = MongoClient(settings.MONGODB_URI, server_api=ServerApi('1'))
db = client[settings.DATABASE_NAME]

# Define specific collections for easy access
review_collection = db[settings.REVIEWS_COLLECTION]
user_collection = db[settings.USERS_COLLECTION]

# Set up logging to capture info and errors
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def ping_mongo():
    try:
        client.admin.command('ping')
        logger.info("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        logger.error(f"Error connecting to MongoDB: {e}")
        raise Exception("Failed to connect to MongoDB")

def get_database():
    return db