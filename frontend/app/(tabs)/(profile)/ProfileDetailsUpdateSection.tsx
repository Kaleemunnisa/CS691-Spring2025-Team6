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
  Image,
} from "react-native";

interface ProfileDetailsUpdateSectionProps {
  userData: {
    profilePicture: string;
    name: string;
    userName: string;
  };
}

const ProfileDetailsUpdateSection: React.FC<
  ProfileDetailsUpdateSectionProps
> = ({ userData }) => {
  // Set initial state based on userData
  const [name, setName] = useState(userData.name);
  const [userName, setUserName] = useState(userData.userName);
  const [profilePicture, setProfilePicture] = useState(userData.profilePicture);

  // Handle updating user details
  const handleSave = () => {
    // Save the updated data to Firebase or any storage
    console.log("Updated User Data:", { name, userName, profilePicture });

    // Add Firebase saving logic here
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.viewContainer}>
              {/* <Text style={styles.title}>Profile Update Section</Text> */}

              {/* Display Profile Picture */}
              <View style={styles.profilePictureContainer}>
                <Image
                  source={{ uri: profilePicture }}
                  style={styles.profilePicture}
                />
                <Button title="Change Profile Picture" onPress={() => {}} />
              </View>

              {/* Text Inputs for Name and UserName */}
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="UserName"
                value={userName}
                onChangeText={setUserName}
              />

              <Button title="Save" onPress={handleSave} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  viewContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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
