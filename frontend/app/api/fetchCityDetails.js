const GEOAPIFY_API_KEY = "ea9de81252614d3099df3bea0483f020";

// Fetch city suggestions based on user input
export const fetchCitySuggestions = async (query) => {
  if (!query) return [];

  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        query
      )}&type=city&apiKey=${GEOAPIFY_API_KEY}`
    );
    const data = await response.json();

    if (data.features) {
      return data.features.map((feature) => ({
        city: feature.properties.city,
        country: feature.properties.country,
        countryCode: feature.properties.country_code,
        placeId: feature.properties.place_id,
        coordinates: {
          latitude: feature.properties.lat,
          longitude: feature.properties.lon,
        },
      }));
    }
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
};

// Fetch detailed city data based on selected city
export const fetchCityDetails = async (city, country) => {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        city + ", " + country
      )}&type=city&format=json&apiKey=${GEOAPIFY_API_KEY}`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        cityName: result.city,
        countryName: result.country,
        countryCode: result.country_code,
        placeId: result.place_id,
        coordinates: {
          latitude: result.lat,
          longitude: result.lon,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching city details:", error);
    return null;
  }
};
