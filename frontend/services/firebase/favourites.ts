import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig"; // Import Firestore instance

// Save either an event or a spot
export const saveUserFavorite = async (uid: string, event: any) => {
  if (!uid || !event || !event.id) return;

  const userRef = doc(db, "user_favorites", uid);

  try {
    await setDoc(
      userRef,
      {
        events: arrayUnion(event), // Save full event object
        savedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log(`Event ${event.id} saved successfully!`);
  } catch (error) {
    console.error(`Error saving event:`, error);
  }
};

// Fetch all favorites (both events and spots)
export const getUserFavorites = async (uid: string|null) => {
  if (!uid) return null;

  const userRef = doc(db, "user_favorites", uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    console.log("docsnap",docSnap.data());
    return docSnap.data(); // Returns { events: [...], spots: [...] }
  } else {
    console.log("No favorites found");
    return null;
  }
};

// Remove either an event or a spot
export const removeUserFavorite = async (uid: string, eventId: string) => {
  if (!uid || !eventId) return;

  const userRef = doc(db, "user_favorites", uid);

  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const updatedEvents = userData.events.filter(
        (event: any) => event.id !== eventId
      );

      await updateDoc(userRef, {
        events: updatedEvents, // Save updated list without the removed event
      });

      console.log(`Event ${eventId} removed successfully!`);
    }
  } catch (error) {
    console.error(`Error removing event:`, error);
  }
};
