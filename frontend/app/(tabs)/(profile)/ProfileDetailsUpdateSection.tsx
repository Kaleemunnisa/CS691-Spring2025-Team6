import ProfilePicture from "@/components/ProfilePicture";
import React, { useState } from "react";
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
} from "react-native";

import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import ChangePasswordScreen from "./components/ChangePasswordSection";
import TextInputWithIcon from "./components/TextInputWithIcon";
interface ProfileDetailsUpdateSectionProps {
  userData: {
    profilePicture: string;
    name: string;
    userName: string;
    email: string;
    userType: string;
  };
}

const ProfileDetailsUpdateSection: React.FC<
  ProfileDetailsUpdateSectionProps
> = ({ userData }) => {
  // Set initial state based on userData
  const [name, setName] = useState(userData.name);
  const [userName, setUserName] = useState(userData.userName);
  const [email, setEmail] = useState(userData.email);
  // const [useType,s]
  const [profilePicture, setProfilePicture] = useState(userData.profilePicture);

  // State for password and confirm password
  const [changePasswordAllow, setChangePasswordAllow] = useState(false);
  // const [oldPassword, setOldPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  // const auth = getAuth();
  // const user = auth.currentUser;
  // Handle updating user details
  // const handleSave = () => {
  //   if (newPassword != "" && confirmPassword !== confirmPassword) {
  //     alert("Passwords do not match.");
  //     return;
  //   }

  //   // Save the updated data to Firebase or any storage
  //   console.log("Updated User Data:", {
  //     name,
  //     userName,
  //     profilePicture,
  //     newPassword,
  //   });

  //   // Add Firebase saving logic here
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : "height"} // Ensure proper keyboard handling on both iOS & Android
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.viewContainer}>
            {/* Display Profile Picture */}
            <View style={styles.profilePictureContainer}>
              <ProfilePicture
                firebasePictureUrl={userData.profilePicture}
                editScreen={true}
              />
            </View>

            {/* Text Inputs for Name and UserName */}
            <TextInputWithIcon
              icon="pencil"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.nativeEvent.text)}
            />
            <TextInputWithIcon
              icon="pencil"
              placeholder="UserName"
              value={userName}
              onChange={(e) => setUserName(e.nativeEvent.text)}
            />
            <TextInputWithIcon
              icon="pencil"
              placeholder="Email"
              value={userData.email}
              onChange={(e) => setEmail(e.nativeEvent.text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Change Password"
              value={"*******"}
              secureTextEntry
              editable={false}
              onTouchEnd={() => setChangePasswordAllow(!changePasswordAllow)}
            />
            {changePasswordAllow && <ChangePasswordScreen />}

            <Button title="Save" />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    // backgroundColor: "red",
    height: "100%",
  },
  scrollContainer: {
    // flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    // backgroundColor: "gray",
    height: "100%",
  },
  viewContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "green",
    height: "100%",
    paddingBottom: 100,
    paddingTop: 10,
  },
  input: {
    width: "80%",
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
});

export default ProfileDetailsUpdateSection;
