import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { signUp } from "@/services/firebase/firebaseAuth";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { primaryBtnColor, signUpFormBG, textColor } from "../colors";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import LottieAnimation from "@/utils/animations-helper/DotLottieAnimations";
import { FontAwesome } from "@expo/vector-icons";

import uploadToCloudinary from "@/services/cloudinary/UploadImageToCloudinary";

const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};
const SignupForm = () => {
  const { userType } = useLocalSearchParams() as { userType: string };
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [touristData, setTouristData] = useState({
    profilePicture: "",
    name: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [guideData, setGuideData] = useState({
    profilePicture: "",
    name: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    location: "",
    yearsOfExperience: "",
  });
  const [businessData, setBusinessData] = useState({
    profilePicture: "",
    name: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    businessType: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const [imageCloudinaryLoading, setImageCloudinaryLoading] = useState(false);
  // const [hasPermission, setHasPermission] = useState(false);

  // // Request permission for the image picker
  // const requestPermission = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   return status === "granted";
  // };

  // Select an image for the profile picture
  const pickImage = async () => {
    // Request permission before allowing the user to pick an image
    // const permissionGranted = await requestPermission();

    // if (!permissionGranted) {
    //   alert("Permission to access media library is required!");
    //   return;
    // }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      const imageUri = selectedImage.uri;
      console.log(imageUri);
      setImage(imageUri); // Save the image URI to state
      // handleChange("profilePicture", result.uri); // Save the image URI in the form

      // Now upload to Cloudinary
      console.log("cloudinary started");
      await uploadToCloudinary(
        imageUri,
        setImage,
        setImageCloudinaryLoading
      ).then(() => {
        setImageCloudinaryLoading(false);
      });
      console.log("Image Uploaded");
    }
  };

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
        !touristData.userName
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
        !guideData.userName ||
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
        !businessData.userName ||
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
      <TouchableOpacity onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 10}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scrollContainer,
              !keyboardVisible && { height: "100%" },
            ]}
          >
            {/* Profile Picture Input Section */}
            <View style={{ marginVertical: 0 }}>
              <TouchableOpacity onPress={pickImage}>
                <View
                  style={[
                    {
                      position: "absolute",
                      bottom: 15,
                      right: -3,
                      zIndex: 10,
                      backgroundColor: "white",
                      padding: 5,
                      borderRadius: 50,
                    },
                  ]}
                >
                  {imageCloudinaryLoading ? (
                    <ActivityIndicator size={18} color="#007BFF" />
                  ) : (
                    <FontAwesome
                      name="pencil"
                      size={18}
                      color="rgb(29, 28, 28)"
                    />
                  )}
                </View>

                <View style={styles.imageContainer}>
                  {image ? (
                    <Image
                      source={{ uri: image }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <LottieAnimation
                      source={require("@/assets/animations/profile-dummy.json")}
                      width={200}
                      height={200}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ marginVertical: 5, height: 30, width: "100%" }}>
              {loading && <ActivityIndicator size="large" color="#007BFF" />}
              {error && <Text style={styles.error}>{error}</Text>}
            </View>
            <Text style={styles.title}>
              Be Our {capitalizeFirstLetter(userType as string)}
            </Text>
            <View
              style={{
                marginVertical: 0,
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

                {/* images of businessData */}
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
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 75,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 15,
    alignSelf: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  imagePlaceholder: {
    color: "gray",
    fontSize: 16,
  },
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
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "red",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    // marginBottom: 6,
  },
  label: {
    fontSize: 14,
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
    textAlign: "center",
    alignSelf: "center",
    color: "red",
    marginTop: 10,
  },
});

export default SignupForm;
