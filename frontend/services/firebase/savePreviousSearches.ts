import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Initialize Firestore
const db = getFirestore();

async function updateCitySearchCount(
  coordinates: { lat: string; lon: string },
  placeID: string,
  cityName: string
) {
  const user = getAuth().currentUser;
  if (!user) return;

  const userRef = doc(db, "previous-searches", user.uid);

  // Get the current data for the user
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    // If the user doesn't have any previous searches, create a new record
    await setDoc(userRef, {
      searches: [
        {
          placeID: placeID,
          cityName: cityName,
          latitude: coordinates.lat,
          longitude: coordinates.lon,
          count: 1,
        },
      ],
    });
  } else {
    // If the user already has previous searches, update the search count for the coordinates and placeID
    const searches = userDoc.data()?.searches || [];
    const existingSearch = searches.find(
      (search: {
        latitude: string;
        longitude: string;
        placeID: string;
        cityName: string;
      }) =>
        search.latitude === coordinates.lat &&
        search.longitude === coordinates.lon &&
        search.placeID === placeID &&
        search.cityName === cityName
    );

    if (existingSearch) {
      // Update the count for the existing coordinates and placeID
      await updateDoc(userRef, {
        searches: searches.map(
          (search: {
            latitude: string;
            longitude: string;
            placeID: string;
            cityName: string;
            count: number;
          }) =>
            search.latitude === coordinates.lat &&
            search.longitude === coordinates.lon &&
            search.placeID === placeID &&
            search.cityName === cityName
              ? { ...search, count: search.count + 1 }
              : search
        ),
      });
    } else {
      // Add a new entry for the coordinates and placeID
      await updateDoc(userRef, {
        searches: [
          ...searches,
          {
            placeID: placeID,
            cityName: cityName,
            latitude: coordinates.lat,
            longitude: coordinates.lon,
            count: 1,
          },
        ],
      });
    }
  }
}

export default updateCitySearchCount;
