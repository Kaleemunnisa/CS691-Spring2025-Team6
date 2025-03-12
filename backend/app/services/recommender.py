# app/services/recommender.py
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from models.event import Event
from sklearn.preprocessing import OneHotEncoder

def recommend_events(fetched_events, favorite_events):
    if not favorite_events:  # If no favorites, return top 5 from fetched events
        return fetched_events[:5]

    # Convert events to DataFrame
    fetched_df = pd.DataFrame([event for event in fetched_events])
    favorite_df = pd.DataFrame([event for event in favorite_events])

    # Combine all events for encoding
    all_events = pd.concat([fetched_df, favorite_df]).drop_duplicates()

    # Features to consider for similarity (add more as needed)
    features = ['category', 'venue', 'city', 'state'] 

    # One-hot encode categorical features
    encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')  # sparse=False for cosine_similarity
    encoded_features = encoder.fit_transform(all_events[features])
    encoded_df = pd.DataFrame(encoded_features, index=all_events.index)

    # Combine encoded features with original DataFrame
    all_events = pd.concat([all_events, encoded_df], axis=1)

    # Separate fetched and favorite events with encoded features
    fetched_df = all_events[all_events['id'].isin(fetched_df['id'])]
    favorite_df = all_events[all_events['id'].isin(favorite_df['id'])]

    # Compute similarity based on selected features
    favorite_features = favorite_df[encoded_df.columns] # Use encoded columns for similarity
    all_features = all_events[encoded_df.columns] # Use encoded columns for similarity

    similarity_scores = cosine_similarity(favorite_features, all_features)
    scores = np.mean(similarity_scores, axis=0) 

    # Add similarity scores to DataFrame
    all_events["score"] = scores

    # Exclude already favorited events and sort by similarity
    recommended = all_events[~all_events["id"].isin(favorite_df["id"])].sort_values("score", ascending=False).head(5)

    # Return all fields of the original fetched events (without encoded columns)
    recommended_ids = recommended['id'].tolist()
    recommended_events = [event for event in fetched_events if event['id'] in recommended_ids]  

    return recommended_events