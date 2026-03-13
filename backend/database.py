"""
Database connection module
"""
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
import logging

logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection with production-ready settings
mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME', 'test_database')

if not mongo_url:
    raise ValueError("MONGO_URL environment variable is required")

# Configure client for MongoDB Atlas production environment
client = AsyncIOMotorClient(
    mongo_url,
    serverSelectionTimeoutMS=5000,  # 5 seconds timeout
    connectTimeoutMS=10000,          # 10 seconds connection timeout
    socketTimeoutMS=45000,           # 45 seconds socket timeout
    maxPoolSize=50,                  # Maximum connections in pool
    minPoolSize=10,                  # Minimum connections in pool
    retryWrites=True,                # Retry writes on network errors
    retryReads=True,                 # Retry reads on network errors
    w='majority'                     # Write concern for durability
)

db = client[db_name]

logger.info(f"MongoDB client configured for database: {db_name}")

