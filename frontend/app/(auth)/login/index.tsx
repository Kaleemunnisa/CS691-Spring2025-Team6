// app/auth/login/index.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LoginForm from "./LoginForm"; // Import the login form component
import LottieAnimation from "../../animations-helper/DotLottieAnimations"; // Lottie animation component

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      {/* Lottie animation */}
      <View style={{ position: "relative" }}>
        <LottieAnimation
          source={require("../../../assets/animations/travel-animation.json")}
          width={300}
          height={300}
        />
      </View>

      {/* Header */}
      <Text style={styles.header}>Login</Text>

      {/* Login form */}
      <LoginForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    justifyContent: "flex-start",
    flex: 1,
  },
  header: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default LoginScreen;
