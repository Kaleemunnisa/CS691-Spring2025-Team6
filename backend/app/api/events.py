# app/api/events.py
import logging
from fastapi import APIRouter
from app.models.event import RecommendationRequest
from app.services.recommender import recommend_events

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/recommend")
async def get_recommendations(request: RecommendationRequest):
    fetched_events = request.fetched_events
    favorite_events = request.favorite_events
    recommendations=recommend_events(fetched_events, favorite_events)
    logger.info(f"Recommended Events: {recommendations}")
    return recommendations
    logger.info(f"Received Request Data: {request.fetched_events}")  # Log request
    return request.favorite_events
