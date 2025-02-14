// firebaseConfig.js (root folder)
import { initializeApp } from "@firebase/app";
import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtRM3AtfedyU5_7B87RdIe27fh_UDoG2o",
  authDomain: "travel-guide-5ebe5.firebaseapp.com",
  projectId: "travel-guide-5ebe5",
  storageBucket: "travel-guide-5ebe5.firebasestorage.app",
  messagingSenderId: "164863489258",
  appId: "1:164863489258:web:fb62b13f63a91e19c09393",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db=getFirestore(app);

export { auth,db}; // Export auth
