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
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { signUp } from "../../firebase/firebaseAuth";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { text } from "@fortawesome/fontawesome-svg-core";
import {
  primaryBtnColor,
  primaryColor,
  signUpFormBG,
  textColor,
} from "../colors";

const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};
const SignupForm = () => {
  const { userType } = useLocalSearchParams() as { userType: string };
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
            <Text style={styles.title}>
              Be Our {capitalizeFirstLetter(userType as string)}
            </Text>
            <View
              style={{
                marginVertical: 5,
                height: 30,
                width: "100%",
                // backgroundColor:'white'
                
              }}
            >
              {loading && <ActivityIndicator size="large" color="#007BFF" />}
              {error && <Text style={styles.error}>{error}</Text>}
            </View>

            {/* Common Fields */}
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              onChangeText={(value) => handleChange("name", value)}
              placeholderTextColor={textColor}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(value) =>
                handleChange("email", value.toLowerCase())
              }
              placeholderTextColor={textColor}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={(value) => handleChange("username", value)}
              placeholderTextColor={textColor}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={(value) => handleChange("password", value)}
              placeholderTextColor={textColor}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              onChangeText={(value) => handleChange("confirmPassword", value)}
              placeholderTextColor={textColor}
            />

            {/* Guide-Specific Fields */}
            {userType === "guide" && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Location"
                  onChangeText={(value) => handleChange("location", value)}
                  placeholderTextColor={textColor}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Years of Experience"
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    handleChange("yearsOfExperience", value)
                  }
                  placeholderTextColor={textColor}
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
                  itemStyle={styles.pickerItem}
                >
                  {/* <Picker.Item
                    label="Select Business Type"
                    value=""
                    color={textColor}
                  /> */}
                  <Picker.Item
                    label="Restaurant"
                    value="restaurant"
                    color={textColor}
                  />
                  <Picker.Item
                    label="Cafe & Bakery"
                    value="cafe"
                    color={textColor}
                  />
                  <Picker.Item
                    label="Stay Provider"
                    value="stay"
                    color={textColor}
                  />
                  <Picker.Item
                    label="Movie Theaters"
                    value="movie"
                    color={textColor}
                  />
                  <Picker.Item label="Game Spots" value="games" color="black" />
                </Picker>
                <TextInput
                  style={styles.input}
                  placeholder="Business Location"
                  onChangeText={(value) => handleChange("location", value)}
                  placeholderTextColor={textColor}
                />
              </>
            )}

            <View style={styles.signupCtn}>
              {/* Sign Up Button */}
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSubmit}
              >
                <Text style={styles.signUpText}>
                  {loading ? "Signing up..." : "Sign Up"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  signupCtn: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpButton: {
    backgroundColor: primaryBtnColor,
    //  backgroundColor: 'blue', // Background color for the button
    paddingVertical: 12, // Vertical padding for the button
    paddingHorizontal: 30, // Horizontal padding for the button
    borderRadius: 5, // Rounded corners
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10, // Adjust for spacing
  },

  signUpText: {
    fontSize: 16, // Ensure same text size as tagline
    fontWeight: "bold",
    color: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: signUpFormBG,
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
    marginBottom: 6,
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
    marginBottom: -50,
    marginTop: -60,
  },
  pickerItem: {
    fontSize: 13, // Change font size of Picker items
    fontWeight: "400",
    color: "#333",
  },
  error: {
    textAlign:'center',
    alignSelf:'center',
    color: "red",
    marginTop: 10,
  },
});

export default SignupForm;
