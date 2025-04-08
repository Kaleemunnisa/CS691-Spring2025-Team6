import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const getUserDataByType = async (userType: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    // Get Firestore instance
    const db = getFirestore();

    // Determine the collection based on userType
    let userDocRef;

    if (userType === "business") {
      userDocRef = collection(db, "businesses");
    } else if (userType === "guide") {
      userDocRef = collection(db, "guides");
    } else if (userType === "tourist") {
      userDocRef = collection(db, "tourists");
    } else {
      console.error("Invalid user type");
      return null;
    }

    // Query the collection to find the document by user ID
    const q = query(userDocRef, where("uid", "==", user.uid));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // Assuming each collection has a single document per user
        const userData = querySnapshot.docs[0].data();
        console.log(userData);
        return userData; // Return the user data
      } else {
        console.log("No user document found for this type");
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

export default getUserDataByType;
