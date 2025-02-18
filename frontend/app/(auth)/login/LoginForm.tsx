// app/auth/login/loginform.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { auth, db } from "../../../firebaseConfig"; // Import auth and db from firebaseConfig
import { useRouter } from "expo-router"; // Import the router

import { signIn } from "../../firebase/firebaseAuth";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("satya@gmail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    signIn(email, password, setLoading, setError, router);
  };

  const handleSignUp = () => {
    router.navigate("/(auth)/signup");
  };

  return (
    <View style={styles.formContainer}>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        placeholderTextColor="rgba(255,255,255,0.7)"
        style={[styles.input, { textTransform: "lowercase" }]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        selectionColor={"white"}
      />
      <TextInput
        placeholderTextColor="rgba(255,255,255,0.7)"
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        selectionColor={"white"}
      />
      <View>
        <View style={styles.loginINbtn}>
          <Button
            title={loading ? "Logging in..." : "Login"}
            onPress={handleLogin}
            disabled={loading}
            color={"white"}
          />
        </View>
        <View style={styles.signupCtn}>
          {/* Tagline */}
          <Text style={styles.tagLine}>Join our travel family today!</Text>

          {/* Sign Up Button */}
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signupCtn: {
    marginTop: 20,
    flexDirection: "row", // Align elements side by side
    alignItems: "center", // Keep them vertically centered
    justifyContent: "center", // Adjust spacing
    gap: 10, // Space between text and button
  },
  tagLine: {
    fontSize: 16, // Ensure the text size matches the button text
    fontWeight: "bold",
    color: "#BCCCDC", // Adjust color to match the theme
  },
  // signUpButton: {
  //   backgroundColor: "#007BFF",
  //   paddingVertical: 8,
  //   paddingHorizontal: 16,
  //   borderRadius: 8,
  // },
  signUpText: {
    fontSize: 16, // Ensure same text size as tagline
    fontWeight: "bold",
    color: "#82C0D0",
  },
  loginINbtn: {
    backgroundColor: "#82C0D0",
    maxWidth: 200, // or any value you prefer
    alignSelf: "center",
    width: "100%", // Ensures it respects maxWidth
    // height:60
    borderRadius: 10,
  },
  formContainer: {
    marginTop: 20,
    // backgroundColor:'red',
  },
  input: {
    height: 45, // Slightly taller input for better UX
    borderColor: "gray",
    borderWidth: 2,
    marginBottom: 16,
    paddingLeft: 10, // More padding for readability
    borderRadius: 5,
    color: "white", // Ensures input text is white
    // backgroundColor: "#333", // Optional: Dark background for contrast
    fontSize: 16, // Increases text size
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default LoginForm;
