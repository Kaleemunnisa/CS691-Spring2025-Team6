# app/api/events.py
from fastapi import APIRouter
from app.models.event import Event
from app.services.recommender import recommend_events
from app.models.event import RecommendationRequest

router = APIRouter()

@router.post("/recommend")
async def get_recommendations(request: RecommendationRequest):
    recommendations = recommend_events(request.fetched_events, request.favorite_events)
    return {"recommendations": recommendations}
