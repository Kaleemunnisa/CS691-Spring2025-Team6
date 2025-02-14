// utils/auth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

// Sign up with email and password
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; // Return the user object
  } catch (error) {
    throw error; // Throw error to handle it in the component
  }
};

// Sign in with email and password
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; // Return the user object
  } catch (error) {
    throw error; // Throw error to handle it in the component
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
