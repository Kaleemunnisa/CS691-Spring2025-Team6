// app/auth/login/index.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import LoginForm from "./LoginForm"; // Import the login form component
import LottieAnimation from "../../animations-helper/DotLottieAnimations"; // Lottie animation component
import { primaryColor } from "../colors";

const LoginScreen = () => {
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.container}>
            {/* Lottie animation */}
            <View style={{ position: "relative" }}>
              <LottieAnimation
                source={require("../../../assets/animations/travel-animation.json")}
                width={250}
                height={250}
              />
            </View>

            {/* Header */}
            <Text style={styles.header}>Welcome Back!</Text>

            {/* Login form */}
            <LoginForm />

            {/* Fixed Bottom Text */}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Text style={styles.bottomText}>
        Travel Guide - Smart Travel Companion
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    // margin:-10,
    flex: 1,
    paddingTop: 0,
    padding: 30,
    justifyContent: "center",
    // flexGrow: 1,
    // alignItems:'center'
    // height: "100%",
    backgroundColor: primaryColor,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    color: "#BCCCDC",
    fontFamily: "Arial",
    fontWeight: "500",
  },
  bottomText: {
    position: "absolute",
    bottom: 20, // Adjust as needed
    fontSize: 12,
    fontWeight: "bold",
    color: "#BCCCDC", // Match the theme
    textAlign: "center",
    alignSelf: "center",
  },
});

export default LoginScreen;
