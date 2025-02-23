// import CONFIG from "../config";
import { GEOAPIFY_KEY } from "./ApiKeys";

export const fetchCitySuggestions = async (text: any) => {
  //   API_KEY = "ea9de81252614d3099df3bea0483f020";
  if (!text) return [];

  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&type=city&limit=5&apiKey=${GEOAPIFY_KEY}`
    );
    const data = await response.json();

    return data.features
      ? data.features.map((feature: any) => ({
          placeID: feature.properties.place_id,
          lon: feature.properties.lon,
          lat: feature.properties.lat,
          city: feature.properties.city,
          state: feature.properties.state,
          stateCode: feature.properties.state_code,
          country: feature.properties.country,
          countryCode: feature.properties.country_code,
        }))
      : [];
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
};
