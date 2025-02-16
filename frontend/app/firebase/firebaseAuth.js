// utils/auth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig";

// Sign up with email and password
import { doc, setDoc, getDoc } from "firebase/firestore";

// Function to create a new user
const signUp = async (userType, userData) => {
  try {
    // Create the user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    const userId = userCredential.user.uid;

    // Common user info to store
    const userInfo = {
      name: userData.name,
      email: userData.email,
      username: userData.username,
    };

    // Add user info to the correct collection based on the user type
    if (userType === "tourist") {
      await setDoc(doc(db, "users", userId), userInfo);
    } else if (userType === "guide") {
      const guideInfo = {
        ...userInfo,
        location: userData.location,
        yearsOfExperience: userData.yearsOfExperience,
      };
      await setDoc(doc(db, "guides", userId), guideInfo);
    } else if (userType === "business") {
      const businessInfo = {
        ...userInfo,
        businessType: userData.businessType,
        location: userData.location,
      };
      await setDoc(doc(db, "businesses", userId), businessInfo);
    }
    console.log("User signed up successfully");
  } catch (error) {
    console.error("Error signing up user:", error);
  }
};

// Sign in with email and password
export const signIn = async (email, password, setLoading, setError, router) => {
  setLoading(true);
  setError(null);
  try {
    // Step 1: Authenticate the user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Login success:", user.email);

    // Step 2: Fetch the user's data from Firestore
    const userDocRef = doc(db, "users", user.uid); // Reference to the user's document
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const isGuide = userData.isGuide; // Get the isGuide flag
      const email = auth.currentUser ? auth.currentUser.email : null; // Get the email (if stored in Firestore)
      console.log("isGuide flag:", isGuide);
      console.log("User email:", email);

      // Step 3: Use the isGuide flag in your app
      if (isGuide) {
        console.log("User is a guide.");
        // Navigate to the guide-specific screen or enable guide features
      } else {
        console.log("User is not a guide.");
        // Navigate to the regular user screen
      }
    } else {
      console.log("User document does not exist.");
    }

    // Step 4: Navigate to the home screen
    router.navigate("/(tabs)/(home)");
  } catch (err) {
    const error = err;
    switch (error.code) {
      case "auth/invalid-email":
        setError("Invalid email address.");
        break;
      case "auth/user-not-found":
        setError("No user found with this email.");
        break;
      case "auth/wrong-password":
        setError("Incorrect password.");
        break;
      default:
        setError("An error occurred. Please try again.");
    }
    if (err instanceof Error) {
      console.error("Login error:", err.message);
    } else {
      console.error("Login error:", err);
    }
  } finally {
    setLoading(false);
  }
};

// Sign out the current user
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return true; // Indicate successful sign-out
  } catch (error) {
    throw error; // Throw error to handle it in the component
  }
};

// Listen for authentication state changes
export const listenToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user); // Call the callback with the user object (or null if signed out)
  });
};
