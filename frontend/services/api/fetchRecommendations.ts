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
    console.log("fetched_events in fetchRecommendations", fetchedEvents);
    console.log("FetchRecommendation try function");
    const response = await fetch("http://192.168.1.82:8000/events/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    console.log("response", response);

    if (response.ok) {
      const data: RecommendationResponse = await response.json();
      console.log("Recommendations:", data.recommendations);
      return data;
    } else {
      console.log("Error fetching recommendations:", response.statusText);
      return null;
    }
  } catch (error) {
    // console.error("Error:", error);
    return null;
  }
};
