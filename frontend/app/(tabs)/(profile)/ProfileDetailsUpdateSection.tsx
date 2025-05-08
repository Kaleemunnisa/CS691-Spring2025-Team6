import ProfilePicture from "@/components/ProfilePicture";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Button,
  Platform,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import ChangePasswordScreen from "./components/ChangePasswordSection";
import TextInputWithIcon from "./components/TextInputWithIcon";

import BusinessImagesUpdateSection from "./components/BusinessImages";
import { FontAwesome } from "@expo/vector-icons";

import _ from "lodash";
import updateUserDetails from "@/services/firebase/updateUserDetails";

import LottieAnimation from "@/utils/animations-helper/DotLottieAnimations";
interface ProfileDetailsUpdateSectionProps {
  userData: any;
}

interface BusinessImage {
  // assetId: string;
  public_id: string;
  [key: string]: any;
}
const ProfileDetailsUpdateSection: React.FC<
  ProfileDetailsUpdateSectionProps
> = ({ userData }) => {
  //enable Save
  const [enableSave, setEnableSave] = useState(false);
  //userData state
  const [currentUserData, setCurrentUserData] = useState(userData);

  const [profilePicture, setProfilePicture] = useState<string | null>(
    userData.profilePicture
  );

  // State for password and confirm password
  const [changePasswordAllow, setChangePasswordAllow] = useState(false);

  const [businessImages, setBusinessImages] = useState<BusinessImage[]>([]);

  const [loadScreen, setLoadScreen] = useState(false);

  useEffect(() => {
    if (userData.images && userData.images.length > 0) {
      setBusinessImages(userData.images);
    }
  }, [userData]);

  const handleFieldChange = (field: string) => (event: any) => {
    const text = event.nativeEvent.text;

    setCurrentUserData((prevData: any) => ({
      ...prevData,
      [field]: text,
    }));
  };
  //state to update business images
  useEffect(() => {
    console.log("Business Images inside update section", businessImages);
    if (currentUserData.userType === "business") {
      setCurrentUserData((prevData: any) => ({
        ...prevData,
        images: businessImages,
      }));
    }

    console.log("Current User Data", currentUserData.images);
  }, [businessImages, currentUserData.images]);

  // state to update profile picture
  useEffect(() => {
    console.log("Profile Picture", profilePicture);
    setCurrentUserData((prevData: any) => ({
      ...prevData,
      profilePicture: profilePicture,
    }));
  }, [profilePicture]);

  // useEffect(() => {

  //   console.log(currentUserData=== userData);
  //   const hasChanged = !_.isEqual(currentUserData, userData);
  //   setEnableSave(hasChanged);
  // }, [currentUserData, userData]);

  useEffect(() => {
    const changes: Record<string, { from: any; to: any }> = {};

    Object.keys(currentUserData || {}).forEach((key) => {
      if (!_.isEqual(currentUserData[key], userData[key])) {
        changes[key] = {
          from: userData[key],
          to: currentUserData[key],
        };
      }
    });

    if (Object.keys(changes).length > 0) {
      console.log("Changed fields:", changes);
    } else {
      console.log("No changes detected.");
    }

    const hasChanged = Object.keys(changes).length > 0;
    setEnableSave(hasChanged);
  }, [currentUserData, userData]);

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  //handle save button
  const handleSave = async () => {
    setLoadScreen(true);
    // Perform save operation here
    console.log("Save button clicked");
    console.log("Current User Data", currentUserData);
    console.log("Business Images", businessImages);
    console.log("Profile Picture", profilePicture);
    // Reset the enableSave state

    const result = await updateUserDetails(currentUserData);

    if (result.success) {
      // Handle success (e.g., navigate to another screen, show success message)
      setLoadScreen(false);
      console.log("Update successful:", result.message);
    } else {
      // Handle failure (e.g., show error message)
      console.error("Update failed:", result.message);
    }
    setEnableSave(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      {loadScreen && (
        <View style={styles.loadScreen}>
          <LottieAnimation
            source={require("@/assets/animations/loading-animation.json")}
            width={100}
            height={100}
          />
        </View>
      )}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.viewContainer}>
            {/* Display Profile Picture */}
            <View style={styles.profilePictureContainer}>
              <ProfilePicture
                profilePictureUrl={profilePicture}
                setProfilePictureUrl={setProfilePicture}
                firebasePictureUrl={currentUserData.profilePicture}
                editScreen={true}
              />
            </View>

            {/* Text Inputs for Name and UserName */}
            <TextInputWithIcon
              icon="pencil"
              placeholder="Name"
              value={currentUserData.name}
              onChange={handleFieldChange("name")}
              label="Name"
            />
            <TextInputWithIcon
              icon="pencil"
              placeholder="UserName"
              value={currentUserData.userName}
              onChange={handleFieldChange("userName")}
              label="User Name"
            />
            <TextInputWithIcon
              icon="pencil"
              placeholder="Email"
              value={currentUserData.email}
              onChange={handleFieldChange("email")}
              label="Email"
              editable={false}
            />

            {userData.location && (
              <TextInputWithIcon
                icon="pencil"
                placeholder="Location"
                value={currentUserData.location.city}
                onChange={handleFieldChange("location")}
                label="Location of you Business"
                editable={false}
              />
            )}

            {userData.businessType && (
              <TextInputWithIcon
                // icon="pencil"

                placeholder="Business Type"
                value={capitalizeFirst(currentUserData.businessType)}
                onChange={handleFieldChange("businessType")}
                editable={false}
                label="Business Type"
              />
            )}

            {userData.userType && (
              <TextInputWithIcon
                icon="pencil"
                placeholder="User Type"
                value={capitalizeFirst(currentUserData.userType)}
                onChange={handleFieldChange("userType")}
                editable={false}
                label="User Type"
              />
            )}
            <View style={styles.passWordInputContainerButton}>
              <TouchableOpacity
                onPress={() => setChangePasswordAllow(!changePasswordAllow)}
                style={{ width: "100%" }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Change Password"
                  value="Update Password"
                  editable={false}
                />
                {changePasswordAllow ? (
                  <FontAwesome
                    style={styles.passwordContainerIcon}
                    name="arrow-up" // "pencil" icon when editable is true
                    size={18}
                    color="rgba(29, 28, 28, 0.42)" // Color when editable is true
                  />
                ) : (
                  <FontAwesome
                    style={styles.passwordContainerIcon}
                    name="arrow-down" // "pencil" icon when editable is true
                    size={18}
                    color="rgba(29, 28, 28, 0.42)" // Color when editable is true
                  />
                )}
              </TouchableOpacity>
            </View>

            {changePasswordAllow && (
              <View style={{ width: "100%", marginBottom: 20 }}>
                <ChangePasswordScreen />
              </View>
            )}

            {/* <Text>{userData.images[0].public_id}</Text> */}

            {currentUserData.userType === "business" && (
              <BusinessImagesUpdateSection
                setBusinessImages={setBusinessImages}
                businessImages={businessImages}
              />
            )}

            <Pressable
              onPress={handleSave}
              disabled={!enableSave}
              style={({ pressed }) => [
                {
                  width: 150,
                  backgroundColor: enableSave ? "#2196F4" : "#ccc",
                  padding: 12,
                  borderRadius: 6,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loadScreen: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    opacity: 0.5,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    // flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    paddingVertical: 20,
    // maxHeight: 2000,
    // width: "80%",
  },
  viewContainer: {
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 100,
    paddingTop: 10,
    // position:"absolute"
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  profilePictureContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },

  passWordInputContainerButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  passwordContainerIcon: {
    position: "absolute",
    right: 10,
    bottom: 25,
    alignSelf: "auto",
    // marginLeft: 10, // Space between input and icon
  },
});

export default ProfileDetailsUpdateSection;

// {"businessType": "restaurant", "email": "fishmarket@gmail.com", "images": [{"assetId": "259CE205-35D5-47D1-B54C-44FAF372B3AF/L0/001", "base64": null, "duration": null, "exif": null, "fileName": "IMG_1218.jpg", "fileSize": 2954916, "height": 4032, "mimeType": "image/jpeg", "pairedVideoAsset": null, "public_id": "https://res.cloudinary.com/dlbmok0ay/image/upload/w_800,q_auto,f_auto/v1743960827/cbjrrekotsn0vthquxen.jpg", "type": "image", "uri": "https://res.cloudinary.com/dlbmok0ay/image/upload/w_800,q_auto,f_auto/v1743960827/cbjrrekotsn0vthquxen.jpg", "width": 3024}, {"assetId": "A14183CC-0D51-456C-99DF-B4514742FF9C/L0/001", "base64": null, "duration": null, "exif": null, "fileName": "IMG_1221.jpg", "fileSize": 2802565, "height": 4032, "mimeType": "image/jpeg", "pairedVideoAsset": null, "public_id": "https://res.cloudinary.com/dlbmok0ay/image/upload/w_800,q_auto,f_auto/v1743960829/ehwncyzh8bmnf7p9ccck.jpg", "type": "image", "uri": "https://res.cloudinary.com/dlbmok0ay/image/upload/w_800,q_auto,f_auto/v1743960829/ehwncyzh8bmnf7p9ccck.jpg", "width": 3024}], "location": "Jerseycity", "name": "Riyaz", "profilePicture": "https://res.cloudinary.com/dlbmok0ay/image/upload/w_800,q_auto,f_auto/v1743960722/g5dwlpkmd27skmhduz93.jpg", "uid": "m5bFkAidFIXZ6WsKbxy27cvOXi92", "userName": "Fishermen", "userType": "business"}
