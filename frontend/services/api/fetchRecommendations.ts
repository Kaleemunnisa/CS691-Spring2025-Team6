export interface RecommendationRequest {
  fetched_events: any[]; // Adjust the type based on your data structure
  favorite_events: any[];
}

export interface RecommendationResponse {
  recommendations: any[]; // Adjust this based on expected response data
}

export const fetchRecommendations = async (
  fetchedEvents: any[],
  favoriteEvents: any[]
): Promise<RecommendationResponse | null> => {
  const requestBody: RecommendationRequest = {
    fetched_events: fetchedEvents,
    favorite_events: favoriteEvents,
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/events/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data: RecommendationResponse = await response.json();
      console.log("Recommendations : ", data);
      return data;
    } else {
      console.error("Error fetching recommendations:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
