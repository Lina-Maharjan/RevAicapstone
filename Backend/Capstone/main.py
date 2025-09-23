from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.mongo import ping_mongo
from routes import auth, analyze_url, analyze_text, demo
from utils.model_loader import model_loader
import logging
import uvicorn


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Fake Review Detection API",
    description="API for detecting fake reviews, analyzing sentiment, and categorizing reviews",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(analyze_url.router)
app.include_router(analyze_text.router)
app.include_router(demo.router)
# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    try:
        # Test MongoDB connection
        await ping_mongo()
        logger.info("✅ MongoDB connection established")
        
        # Load ML models
        model_loader.load_models()
        logger.info("✅ ML models initialized")
        
        logger.info("🚀 Application startup completed successfully")
        
    except Exception as e:
        logger.error(f"❌ Startup failed: {str(e)}")
        raise

# Shutdown event
@app.on_event("shutdown")
def shutdown_event():
    """Cleanup on shutdown"""
    logger.info("🛑 Application shutting down")

# Root endpoint
@app.get("/")
def read_root():
    """Root endpoint with API information"""
    return {
        "message": "Fake Review Detection API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
        "endpoints": {
            "auth": "/auth",
            "url_analysis": "/analyze",
            "text_analysis": "/text"
        }
    }

# Health check endpoint
@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "services": {
            "database": "connected",
            "ml_models": "loaded" if model_loader.is_ready() else "not_loaded",
            "api": "running"
        }
    }

# API status endpoint
@app.get("/status")
def api_status():
    """Detailed API status information"""
    return {
        "api": {
            "name": "Fake Review Detection API",
            "version": "1.0.0",
            "status": "operational"
        },
        "services": {
            "authentication": "active",
            "review_fetching": "active",
            "fake_detection": "active",
            "sentiment_analysis": "active",
            "categorization": "active"
        },
        "models": {
            "ready": model_loader.is_ready(),
            "fake_detection": "mock_implementation",
            "sentiment_analysis": "textblob",
            "categorization": "keyword_based"
        }
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
