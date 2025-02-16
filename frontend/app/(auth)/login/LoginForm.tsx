// app/auth/login/loginform.tsx
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
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
