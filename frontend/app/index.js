// app/login.js
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { auth, db } from "../firebaseConfig"; // Import auth and db from firebaseConfig
import { useRouter } from "expo-router";
import Shop from "./svgs/ShopSVG";
import Travel from "./svgs/TravelSVG";

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("satya@gmail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
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
        const email = auth.currentUser.email; // Get the email (if stored in Firestore)
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
      router.navigate("(home)");
    } catch (err) {
      switch (err.code) {
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
      console.error("Login error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ position: "relative" }}>
        <Travel />
      </View>

      <Text style={styles.header}>Login</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={[styles.input, { textTransform: "lowercase" }]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    justifyContent: "center",
    flex: 1,
  },
  header: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default LoginScreen;
