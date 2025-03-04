from pydantic import BaseModel
from typing import List

class Event(BaseModel):
    id: str
    name: str
    category: str
    genre: str
    imageUrl: str

class RecommendationRequest(BaseModel):
    fetched_events: List[Event]  # Events from Ticketmaster
    favorite_events: List[Event]  # User’s saved events from Firebase
