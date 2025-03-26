import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Initialize Firestore
const db = getFirestore();

async function fetchTopCities() {
  const user = getAuth().currentUser;
  if (!user) {
    console.log("User not authenticated");
    return null;
  }

  const userRef = doc(db, "previous-searches", user.uid);

  // Get the current data for the user
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    // Fetch the data (now it's an array of search records)
    const data = userDoc.data()?.searches || [];

    // Sort the cities by the search count (in descending order)
    const sortedCities = data
      .sort((a: { count: number }, b: { count: number }) => b.count - a.count) // Sort by search count in descending order
      .slice(0, 3); // Get the top 3 cities (or fewer if not available)

    // Return the top cities
    return sortedCities.map(
      (search: { cityName: any; latitude: any; longitude: any }) => ({
        cityName: search.cityName,
        latitude: search.latitude,
        longitude: search.longitude,
      })
    );
  } else {
    console.log("No search records found for this user");
    return null;
  }
}

export default fetchTopCities;
