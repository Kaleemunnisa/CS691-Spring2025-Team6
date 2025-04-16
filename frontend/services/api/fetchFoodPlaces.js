import { GEOAPIFY_KEY } from "./ApiKeys";
// const CITY_ID =
//   "514da3c9c5986f58c059a10216af68453e40f00101f901a2ba010000000000c00208"; // Example city ID

// Function to fetch places from API
export const fetchFoodPlaces = async (CITY_ID) => {
  try {
    console.log("city id in fetch food places:->>", CITY_ID);
    const response = await fetch(
      `https://api.geoapify.com/v2/places?categories=catering.fast_food,catering.cafe,catering.food_court,catering.bar,catering.pub,catering.ice_cream&filter=place:${CITY_ID}&limit=50&apiKey=${GEOAPIFY_KEY}`
    );
    const data = await response.json();
    // console.log("food places", data.features);

    return data.features || [];
  } catch (error) {
    // console.error("Error fetching places:", error);
    console.log("cant no data");
    return [];
  }
};

// export const fetchFoodPlaces = async (lat, lon) => {
//   try {
//     const response = await fetch(
//       `https://api.geoapify.com/v2/places?categories=catering.fast_food,catering.cafe,catering.food_court,catering.bar,catering.pub,catering.ice_cream&filter=circle:${lon},${lat},10000&limit=50&apiKey=${GEOAPIFY_KEY}`
//     );
//     const data = await response.json();

//     return data.features || [];
//   } catch (error) {
//     console.log("Can't fetch data:", error);
//     return [];
//   }
// };
