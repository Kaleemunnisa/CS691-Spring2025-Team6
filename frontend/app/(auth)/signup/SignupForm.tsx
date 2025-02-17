import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { signUp } from "../../firebase/firebaseAuth";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const SignupForm = () => {
  const { userType } = useLocalSearchParams();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [touristData, setTouristData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [guideData, setGuideData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    location: "",
    yearsOfExperience: "",
  });
  const [businessData, setBusinessData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    businessType: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Listen for keyboard visibility changes
  useEffect(() => {
    console.log(userType);
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Handle form field changes based on userType
  const handleChange = (name: string, value: string) => {
    if (userType === "tourist") {
      setTouristData({ ...touristData, [name]: value });
    } else if (userType === "guide") {
      setGuideData({ ...guideData, [name]: value });
    } else if (userType === "business") {
      setBusinessData({ ...businessData, [name]: value });
    }
  };

  useEffect(() => {
    console.log(guideData);
  }, [guideData]);
  // Handle form submission
  const handleSubmit = async () => {
    // Check if passwords match
    if (
      (touristData.password &&
        touristData.password !== touristData.confirmPassword) ||
      (guideData.password &&
        guideData.password !== guideData.confirmPassword) ||
      (businessData.password &&
        businessData.password !== businessData.confirmPassword)
    ) {
      setError("Passwords do not match");
      return;
    }

    // Validate email format for all user types
    const emailData =
      userType === "tourist"
        ? touristData
        : userType === "guide"
        ? guideData
        : businessData;
    if (!isValidEmail(emailData.email)) {
      setError("Invalid email format");
      return;
    }

    // Validate required fields for each user type
    let userData;
    if (userType === "tourist") {
      if (
        !touristData.name ||
        !touristData.email ||
        !touristData.password ||
        !touristData.username
      ) {
        setError("Please fill in all required fields for tourist.");
        return;
      }
      userData = touristData;
    } else if (userType === "guide") {
      if (
        !guideData.name ||
        !guideData.email ||
        !guideData.password ||
        !guideData.username ||
        !guideData.location ||
        !guideData.yearsOfExperience
      ) {
        setError("Please fill in all required fields for guide.");
        return;
      }
      userData = guideData;
    } else if (userType === "business") {
      if (
        !businessData.name ||
        !businessData.email ||
        !businessData.password ||
        !businessData.username ||
        !businessData.businessType ||
        !businessData.location
      ) {
        setError("Please fill in all required fields for business.");
        return;
      }
      userData = businessData;
    }

    setLoading(true);
    setError(null);

    try {
      // Pass the correct user data to signUp
      await signUp(userType, userData);
      console.log("Signup successful!");
      router.navigate("/(tabs)/(home)"); // Navigate to home screen after successful signup
    } catch (err) {
      setError("Signup failed. " + (err as any).message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 10}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={[
              styles.scrollContainer,
              !keyboardVisible && { height: "100%" },
            ]}
          >
            <Text style={styles.title}>Signup</Text>

            {/* Common Fields */}
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              onChangeText={(value) => handleChange("name", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(value) =>
                handleChange("email", value.toLowerCase())
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={(value) => handleChange("username", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={(value) => handleChange("password", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              onChangeText={(value) => handleChange("confirmPassword", value)}
            />

            {/* Guide-Specific Fields */}
            {userType === "guide" && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Location"
                  onChangeText={(value) => handleChange("location", value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Years of Experience"
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    handleChange("yearsOfExperience", value)
                  }
                />
              </>
            )}

            {/* Business-Specific Fields */}
            {userType === "business" && (
              <>
                <Text style={styles.label}>Business Type:</Text>
                <Picker
                  selectedValue={businessData.businessType}
                  onValueChange={(value) => handleChange("businessType", value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Business Type" value="" />
                  <Picker.Item label="Restaurant" value="restaurant" />
                  <Picker.Item label="Cafe & Bakery" value="cafe" />
                  <Picker.Item label="Stay Provider" value="stay" />
                  <Picker.Item label="Movie Theaters" value="movie" />
                  <Picker.Item label="Game Spots" value="games" />
                </Picker>
                <TextInput
                  style={styles.input}
                  placeholder="Business Location"
                  onChangeText={(value) => handleChange("location", value)}
                />
              </>
            )}

            <Button
              title={loading ? "Signing up..." : "Sign Up"}
              onPress={handleSubmit}
              disabled={loading}
            />

            {loading && <ActivityIndicator size="large" color="#007BFF" />}
            {error && <Text style={styles.error}>{error}</Text>}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  picker: {
    width: "100%",
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default SignupForm;
