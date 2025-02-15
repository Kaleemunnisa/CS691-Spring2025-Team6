// app/auth/login/loginform.tsx
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { auth, db } from "../../../firebaseConfig"; // Import auth and db from firebaseConfig
import { useRouter } from "expo-router"; // Import the router

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("satya@gmail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState<string | null>(null);
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
      const error = err as any;
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

  const handleSignUp = () => {
    router.navigate("/(auth)/signup");
  };

  return (
    <View style={styles.formContainer}>
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
      <View>
        <Button
          title={loading ? "Logging in..." : "Login"}
          onPress={handleLogin}
          disabled={loading}
        />
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 20,
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

export default LoginForm;
