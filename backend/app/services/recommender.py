# app/services/recommender.py
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from models.event import Event
from sklearn.preprocessing import OneHotEncoder

def recommend_events(fetched_events, favorite_events):
    try:
        if not fetched_events:
            return []

        if not favorite_events:  # If no favorites, return top 5 from fetched events
            return fetched_events[:5]

        # Convert events to DataFrame
        fetched_df = pd.DataFrame(fetched_events)
        favorite_df = pd.DataFrame(favorite_events)

        # Check for 'id' column presence
        if 'id' not in fetched_df.columns or 'id' not in favorite_df.columns:
            return fetched_events[:5]  # fallback

        # Combine all events for encoding
        all_events = pd.concat([fetched_df, favorite_df]).drop_duplicates()

        # Features to consider for similarity
        features = ['category', 'venue', 'city', 'state'] 

        # Guard against missing feature columns
        for col in features:
            if col not in all_events.columns:
                all_events[col] = ''

        # One-hot encode categorical features
        encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
        encoded_features = encoder.fit_transform(all_events[features])
        encoded_df = pd.DataFrame(encoded_features, index=all_events.index)

        # Combine encoded features with original DataFrame
        all_events = pd.concat([all_events, encoded_df], axis=1)

        # Separate fetched and favorite events with encoded features
        fetched_df = all_events[all_events['id'].isin(fetched_df['id'])]
        favorite_df = all_events[all_events['id'].isin(favorite_df['id'])]

        if favorite_df.empty or fetched_df.empty:
            return fetched_events[:5]

        # Compute similarity based on encoded features
        favorite_features = favorite_df[encoded_df.columns]
        all_features = all_events[encoded_df.columns]

        similarity_scores = cosine_similarity(favorite_features, all_features)
        scores = np.mean(similarity_scores, axis=0)

        # Add similarity scores to DataFrame
        all_events["score"] = scores

        # Exclude already favorited events and sort by similarity
        recommended = all_events[~all_events["id"].isin(favorite_df["id"])] \
                        .sort_values("score", ascending=False).head(5)

        # Return only original fields (excluding encoded and score columns)
        recommended_ids = recommended['id'].tolist()
        recommended_events = [event for event in fetched_events if event['id'] in recommended_ids]

        return recommended_events

    except Exception as e:
        print(f"Recommendation error: {e}")
        return fetched_events[:5]  # fallback to top 5
# uvicorn main:app --reload
# uvicorn main:app --host 0.0.0.0 --port 8000
