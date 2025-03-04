# app/services/recommender.py
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from app.models.event import Event

def recommend_events(fetched_events, favorite_events):
    if not favorite_events:  # If no favorites, return top 5 from fetched events
        return fetched_events[:5]

    # Convert events to DataFrame
    fetched_df = pd.DataFrame([event.dict() for event in fetched_events])
    favorite_df = pd.DataFrame([event.dict() for event in favorite_events])

    # Assign numerical values to category and genre
    all_events = pd.concat([fetched_df, favorite_df]).drop_duplicates()
    all_events["category_encoded"] = all_events["category"].astype("category").cat.codes
    all_events["genre_encoded"] = all_events["genre"].astype("category").cat.codes

    # Compute similarity based on category & genre
    all_features = all_events[["category_encoded", "genre_encoded"]]
    favorite_features = favorite_df[["category_encoded", "genre_encoded"]]

    similarity_scores = cosine_similarity(favorite_features, all_features)
    scores = np.mean(similarity_scores, axis=0)

    # Add similarity scores to DataFrame
    all_events["score"] = scores

    # Exclude already favorited events and sort by similarity
    recommended = all_events[~all_events["id"].isin(favorite_df["id"])].sort_values("score", ascending=False).head(5)

    return recommended[["id", "name", "category", "genre", "imageUrl"]].to_dict(orient="records")
