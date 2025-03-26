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

async function updateCitySearchCount(placeId: string) {
  const user = getAuth().currentUser;
  if (!user) return;

  const userRef = doc(db, "previous-searches", user.uid);

  // Get the current data for the user
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    // If the user doesn't have any previous searches, create a new record
    await setDoc(userRef, {
      [placeId]: 1,
    });
  } else {
    // If the user already has previous searches, update the search count for the placeId
    const currentCount = userDoc.data()?.[placeId] || 0;
    await updateDoc(userRef, {
      [placeId]: increment(1),
    });
  }
}

export default updateCitySearchCount;