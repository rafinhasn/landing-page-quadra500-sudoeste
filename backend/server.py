from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path

# Import database
from database import db, client

# Import routes
from routes.leads import router as leads_router


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(
    title="Quadra 500 Sudoeste API",
    description="API para captura de leads do lançamento Quadra 500 Sudoeste",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Health check route
@api_router.get("/")
async def root():
    return {"message": "Quadra 500 Sudoeste API - Online", "status": "healthy"}

@api_router.get("/health")
async def health_check():
    """
    Health check endpoint that verifies database connectivity
    """
    try:
        # Try to ping MongoDB
        await db.command('ping')
        return {
            "status": "healthy",
            "message": "API and Database are operational",
            "database": "connected"
        }
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return {
            "status": "unhealthy",
            "message": "Database connection failed",
            "error": str(e)
        }

# Include routers
app.include_router(leads_router)
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("Starting Quadra 500 Sudoeste API...")
    try:
        # Create indexes with error handling for production
        try:
            await db.leads.create_index("email", unique=True)
            logger.info("Email index created (unique)")
        except Exception as e:
            # Index may already exist, which is fine
            logger.warning(f"Email index creation skipped: {str(e)}")
        
        try:
            await db.leads.create_index("created_at")
            logger.info("Created_at index created")
        except Exception as e:
            logger.warning(f"Created_at index creation skipped: {str(e)}")
        
        logger.info("Database indexes setup complete")
    except Exception as e:
        logger.error(f"Error during startup: {str(e)}")
        # Don't fail the app if index creation fails
        pass

@app.on_event("shutdown")
async def shutdown_db_client():
    try:
        client.close()
        logger.info("Database connection closed")
    except Exception as e:
        logger.error(f"Error closing database connection: {str(e)}")