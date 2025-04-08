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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { signUp } from "@/services/firebase/firebaseAuth";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { primaryBtnColor, signUpFormBG, textColor } from "../colors";
import Feather from "@expo/vector-icons/Feather";
import ProfilePicture from "@/components/ProfilePicture";
import BusinessImagesAddSection from "./businessImagesAddSection";

const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

type BusinessData = {
  profilePicture: string | null;
  name: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  businessType: string;
  location: string;
  images: any[]; // <-- Define images as an array of any type
};
const SignupForm = () => {
  const [imagesAddedToCloudinaryStatus, setImagesAddedToCloudinaryStatus] =
    useState(false);
  const { userType } = useLocalSearchParams() as { userType: string };
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null
  );
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
  // const [businessData, setBusinessData] = useState({
  //   profilePicture: "",
  //   name: "",
  //   email: "",
  //   userName: "",
  //   password: "",
  //   confirmPassword: "",
  //   businessType: "",
  //   location: "",
  // });
  const [businessData, setBusinessData] = useState<BusinessData>({
    profilePicture: "",
    name: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    businessType: "",
    location: "",
    images: [], // Add this!
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
  // const handleSubmit = async () => {
  //   // Check if passwords match
  //   if (
  //     (touristData.password &&
  //       touristData.password !== touristData.confirmPassword) ||
  //     (guideData.password &&
  //       guideData.password !== guideData.confirmPassword) ||
  //     (businessData.password &&
  //       businessData.password !== businessData.confirmPassword)
  //   ) {
  //     setError("Passwords do not match");
  //     return;
  //   }

  //   // Validate email format for all user types
  //   const emailData =
  //     userType === "tourist"
  //       ? touristData
  //       : userType === "guide"
  //       ? guideData
  //       : businessData;
  //   if (!isValidEmail(emailData.email)) {
  //     setError("Invalid email format");
  //     return;
  //   }

  //   // Validate required fields for each user type
  //   let userData;
  //   if (userType === "tourist") {
  //     if (
  //       !touristData.name ||
  //       !touristData.email ||
  //       !touristData.password ||
  //       !touristData.userName
  //     ) {
  //       setError("Please fill in all required fields for tourist.");
  //       return;
  //     }
  //     userData = touristData;
  //   } else if (userType === "guide") {
  //     if (
  //       !guideData.name ||
  //       !guideData.email ||
  //       !guideData.password ||
  //       !guideData.userName ||
  //       !guideData.location ||
  //       !guideData.yearsOfExperience
  //     ) {
  //       setError("Please fill in all required fields for guide.");
  //       return;
  //     }
  //     userData = guideData;
  //   } else if (userType === "business") {
  //     const missingFields: string[] = [];

  //     // Check for missing required fields and collect the names of missing fields
  //     if (!businessData.name) missingFields.push("Name");
  //     if (!businessData.email) missingFields.push("Email");
  //     if (!businessData.password) missingFields.push("Password");
  //     if (!businessData.userName) missingFields.push("UName");
  //     if (!businessData.businessType) missingFields.push("Business Type");
  //     if (!businessData.location) missingFields.push("Location");

  //     // If there are missing fields, show an error message
  //     if (missingFields.length > 0) {
  //       setError(
  //         `Please fill in the following required fields for business: ${missingFields.join(
  //           ", "
  //         )}.`
  //       );
  //       return;
  //     }

  //     userData = businessData;
  //   }

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     // Pass the correct user data to signUp
  //     await signUp(userType, userData);
  //     console.log("Signup successful!");
  //     router.navigate("/(tabs)/(home)"); // Navigate to home screen after successful signup
  //   } catch (err) {
  //     setError("Signup failed. " + (err as any).message);
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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
      const missingFields: string[] = [];

      if (!businessData.name) missingFields.push("Name");
      if (!businessData.email) missingFields.push("Email");
      if (!businessData.password) missingFields.push("Password");
      if (!businessData.userName) missingFields.push("UName");
      if (!businessData.businessType) missingFields.push("Business Type");
      if (!businessData.location) missingFields.push("Location");

      if (missingFields.length > 0) {
        setError(
          `Please fill in the following required fields for business: ${missingFields.join(
            ", "
          )}.`
        );
        return;
      }

      userData = businessData;
    }

    setLoading(true);
    setError(null);

    try {
      await signUp(userType, userData);
      console.log("Signup successful!");
      router.navigate("/(tabs)/(home)"); // Navigate to home screen after successful signup
    } catch (err) {
      const errorCode = (err as any).code;
      if (errorCode === "auth/email-already-in-use") {
        setError(
          "This email is already in use. Please try logging in or use another email."
        );
      } else {
        setError("Signup failed. " + (err as any).message);
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Business Data:", businessData);
  }, [businessData]);

  useEffect(() => {
    console.log("Profile Picture URL:", profilePictureUrl);

    setBusinessData((prevData) => ({
      ...prevData,
      profilePicture: profilePictureUrl,
    }));
    // setGuideData((prevData) => ({
    //   ...prevData,
    //   profilePicture: profilePictureUrl,
    // }));
    // setTouristData((prevData) => ({
    //   ...prevData,
    //   profilePicture: profilePictureUrl,
    // }));
  }, [profilePictureUrl]);

  const fetchImagePublic_ids = (images: any) => {
    const public_ids = images.map((image: any) => ({
      assetId: image.assetId,
      public_id: image.public_id,
    }));
    return public_ids;
  };

  useEffect(() => {
    if (
      businessData.images.length > 0 &&
      businessData.images[0].public_id &&
      imagesAddedToCloudinaryStatus
    ) {
      setBusinessData((prevData) => ({
        ...prevData,
        images: fetchImagePublic_ids(businessData.images),
      }));
      console.log("Business Data with Public IDs:", businessData);
    }
  }, [imagesAddedToCloudinaryStatus]);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: "absolute", top: 40, left: 10 }}
      >
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
              // !keyboardVisible && { height: "100%" },
            ]}
          >
            {/* Profile Picture Input Section */}
            <View style={{ marginVertical: 0 }}>
              <ProfilePicture
                setProfilePictureUrl={setProfilePictureUrl}
                profilePictureUrl={profilePictureUrl}
              />
            </View>

            <View style={{ marginVertical: 5, height: 30, width: "100%" }}>
              {/* {loading && <ActivityIndicator size="large" color="#007BFF" />} */}
              {/* {error && <Text style={styles.error}>{error}</Text>} */}
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
              {loading && <ActivityIndicator size={18} color="#007BFF" />}
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
              placeholder="UserName"
              onChangeText={(value) => handleChange("userName", value)}
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
                <BusinessImagesAddSection
                  setImagesAddedToCloudinaryStatus={
                    setImagesAddedToCloudinaryStatus
                  }
                  images={businessData.images}
                  setImages={(newImages) => {
                    setBusinessData((prevData) => ({
                      ...prevData,
                      images: newImages,
                    }));
                  }}
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
    // flex: 1,
    backgroundColor: signUpFormBG,
    justifyContent: "center",
    padding: 20,
    // height:"100%"
    flexGrow: 1,
  },
  scrollContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "red",
    // height: "auto",
    // flex:1,
    flexGrow: 1,
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
