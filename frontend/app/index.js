import React, { useState } from "react";

// Importing the login and signup components from their respective folders
import LoginScreen from "./(auth)/login";

export default function Index() {
  const [isSignIn, setIsSignIn] = useState(false); // State to manage view

  // Toggle between login and signup (signin) screens
  //const toggleScreen = () => setIsSignIn(!isSignIn);

  return (
    <LoginScreen />
  );
}
