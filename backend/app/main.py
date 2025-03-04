# app/main.py

from fastapi import FastAPI
from app.api import get_recommendations
from app.models import Event, RecommendationRequest
from app.services.recommender import recommend_events

app = FastAPI()

@app.post("/recommend")
async def get_recommendations(request: RecommendationRequest):
    recommendations = recommend_events(request.fetched_events, request.favorite_events)
    return {"recommendations": recommendations}
