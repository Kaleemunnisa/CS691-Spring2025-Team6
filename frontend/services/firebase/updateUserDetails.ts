import { updateEmail } from "firebase/auth";
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "@/config/firebaseConfig";

const updateUserDetails = async (updatedUserData: any) => {
  const user = auth.currentUser;

  if (!user || !updatedUserData?.uid || !updatedUserData?.userType) {
    console.error("Missing user, uid, or userType");
    return { success: false, message: "Missing user or required data" };
  }

  try {
    // 1. Update email in Firebase Auth if changed
    if (updatedUserData.email && updatedUserData.email !== user.email) {
      await updateEmail(user, updatedUserData.email);
    }

    // 2. Only update existing fields in "users" collection
    const userRef = doc(db, "users", updatedUserData.uid);
    const existingUserSnap = await getDoc(userRef);

    if (existingUserSnap.exists()) {
      const existingData = existingUserSnap.data();
      const filteredUpdates: any = {};

      Object.keys(updatedUserData).forEach((key) => {
        if (key in existingData) {
          filteredUpdates[key] = updatedUserData[key];
        }
      });

      await updateDoc(userRef, filteredUpdates);
    }

    // 3. Determine user type collection
    let collectionName = "";
    switch (updatedUserData.userType) {
      case "business":
        collectionName = "businesses";
        break;
      case "guide":
        collectionName = "guides";
        break;
      case "tourist":
        collectionName = "tourists";
        break;
      default:
        console.error("Invalid user type");
        return { success: false, message: "Invalid user type" };
    }

    // 4. Update existing fields in userType-specific collection
    const userTypeCollection = collection(db, collectionName);
    const q = query(
      userTypeCollection,
      where("uid", "==", updatedUserData.uid)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;
      const existingTypeData = snapshot.docs[0].data();

      const filteredTypeUpdates: any = {};
      Object.keys(updatedUserData).forEach((key) => {
        if (key in existingTypeData) {
          filteredTypeUpdates[key] = updatedUserData[key];
        }
      });

      await updateDoc(docRef, filteredTypeUpdates);
    } else {
      console.log(
        "No existing userType document. Skipping creation as per rules."
      );
    }

    return { success: true, message: "User details updated successfully." };
  } catch (error) {
    console.error("Error updating user details:", error);
    return { success: false, message: "Error updating user details." };
  }
};

export default updateUserDetails;
