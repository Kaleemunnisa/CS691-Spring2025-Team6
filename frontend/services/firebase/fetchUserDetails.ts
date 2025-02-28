import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const getCurrentUserData = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    // Get Firestore instance
    const db = getFirestore();

    // Reference to the user's document in Firestore
    const userDocRef = doc(db, "users", user.uid);

    try {
      // Fetch the document data
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log(userData);
        return {
          ...userData,
        };
      } else {
        console.log("No user document found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data from Firestore:", error);
      return null;
    }
  } else {
    return null; // Return null if no user is logged in
  }
};

export default getCurrentUserData;
