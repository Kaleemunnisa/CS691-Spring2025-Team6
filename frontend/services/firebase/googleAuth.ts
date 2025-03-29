import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/config/firebaseConfig"; // Import your Firebase config
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";

/**
 * Handles Google Sign-In with Firebase Authentication
 * @param idToken The Google ID Token received after successful Google Sign-In
 * @returns void
 */
export const signInWithGoogle = async (idToken: string) => {
  try {
    // Create a Google credential with the ID Token
    const credential = GoogleAuthProvider.credential(idToken);

    // Sign in with the credential using Firebase Authentication
    const userCredential = await signInWithCredential(auth, credential);

    // Successful sign-in
    console.log("User signed in with Google: ", userCredential.user);
  } catch (error) {
    // Handle errors here
    if (error instanceof FirebaseError) {
      console.error("Firebase Authentication Error:", error.message);
    } else {
      console.error("Google Sign-In Error:", error);
    }
  }
};

/**
 * Handles Google Sign-In and Firebase Authentication
 * @param request The AuthRequest object from expo-auth-session
 * @param response The AuthResponse object from expo-auth-session
 */
export const handleGoogleSignIn = async (request: any, response: any) => {
  if (response?.type === "success") {
    const { authentication } = response;
    if (authentication?.idToken) {
      // Sign in with the Google ID Token
      await signInWithGoogle(authentication.idToken);
    }
  }
};

/**
 * Initiates the Google Sign-In process
 * @param clientId Web Client ID
 */
export const useGoogleSignIn = () => {
  console.log("useGoogleSignIn");
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "com.googleusercontent.apps.608284775680-biutu0f7n1ho0ipjn4ctssekoclirbff",
    androidClientId:
      "608284775680-4mr6s3j3v303okir98aru2h2u5nd7bg2.apps.googleusercontent.com",
    webClientId:
      "608284775680-ofta4b1hi2p1lggef8bm7u0l9psd37bt.apps.googleusercontent.com",
  });
  console.log("request", request);
  console.log("response", response);
  console.log("promptAsync", promptAsync);
  // State to manage the Google sign-in process
  const [googleAuthLoading, setgoogleAuthLoading] = useState(false);

  useEffect(() => {
    if (response?.type === "success") {
      handleGoogleSignIn(request, response);
    }
  }, [response]);

  const initiateSignIn = async () => {
    setgoogleAuthLoading(true);
    try {
      // Trigger Google Sign-In
      await promptAsync();
    } catch (error) {
      console.error("Google Sign-In initiation error:", error);
    } finally {
      setgoogleAuthLoading(false);
    }
  };

  return { initiateSignIn, googleAuthLoading };
};

// 164863489258-roor2tvdhf4jmq0007fis5gg3i9ts3n7.apps.googleusercontent.com
