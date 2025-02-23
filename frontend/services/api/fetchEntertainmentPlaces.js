import { GEOAPIFY_KEY } from "./ApiKeys";
// const CITY_ID =
//   "514da3c9c5986f58c059a10216af68453e40f00101f901a2ba010000000000c00208"; //
export const fetchEntertainmentPlaces = async (CITY_ID) => {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v2/places?categories=entertainment&filter=place:${CITY_ID}&limit=50&apiKey=${GEOAPIFY_KEY}`
    );
    const data = await response.json();
    console.log(data);
    return data.features || [];
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
};
