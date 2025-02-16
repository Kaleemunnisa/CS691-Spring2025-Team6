import React, { useState } from "react";

// Importing the login and signup components from their respective folders
import LoginScreen from "./(auth)/login";
// import SignUpPage from "./(auth)/signup";

export default function Index() {
  const [isSignIn, setIsSignIn] = useState(false); // State to manage view

  // Toggle between login and signup (signin) screens
  const toggleScreen = () => setIsSignIn(!isSignIn);

  return (
    // <div>
    //   {/* Conditionally render Login or SignUp screen */}
    //   {isSignIn ? <SignUpScreen /> : <LoginScreen />}

    //   {/* Add a button to toggle between Login and SignUp */}
    //   <button onClick={toggleScreen}>
    //     {isSignIn ? "Go to Login" : "Go to Sign Up"}
    //   </button>
    // </div>

    // <SignUpPage />

    <LoginScreen />
  );
}
