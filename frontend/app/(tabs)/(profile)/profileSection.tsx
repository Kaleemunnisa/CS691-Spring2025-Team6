// import React from 'react';
import React, { useEffect, useState } from "react";
import { primaryColor } from "@/app/(auth)/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import getCurrentUserData from "@/services/firebase/fetchUserDetails";
import { MaterialIcons } from "@expo/vector-icons"; // Make sure you have this installed

interface ProfileSectionProps {
  userDate: {
    name: String;
    userName: String;
  };
  setEditClick: any;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  userDate,
  setEditClick,
}) => {
  const user = {
    name: "John Doe",
    username: "@johndoe",
    profileImage:
      "https://github.com/user-attachments/assets/2e38c683-dff5-4e8c-88a2-ddd98e208d8e", // Replace with actual user image
  };

  const handleEditClick = () => {
    setEditClick(true); // Toggle edit state
  };
  //userData

  return (
    <View style={styles.profileSection}>
      <View style={styles.profileCard}>
        <View style={styles.profileRow}>
          <Image
            source={{ uri: user.profileImage }}
            style={styles.profileImage}
          />
          {userDate ? (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userDate.name}</Text>
              <Text style={styles.userUsername}>{userDate.userName}</Text>
            </View>
          ) : (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>User Name</Text>
              <Text style={styles.userUsername}>Name</Text>
            </View>
          )}

          <TouchableOpacity onPress={handleEditClick} style={styles.editIcon}>
            <FontAwesome name="edit" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileSection;

const styles = StyleSheet.create({
  profileSection: {
    padding: 16,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  profileCard: {
    width: "100%",
    backgroundColor: primaryColor, // Dynamic primary color
    padding: 16,
    borderRadius: 10,

    // iOS Shadow
    shadowColor: primaryColor,
    shadowOffset: { width: 0, height: 8 }, // Creates depth
    shadowOpacity: 1, // Adjust for smoothness
    shadowRadius: 20,

    // Android Shadow
    elevation: 6, // Required for Android shadows
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,

    // White Border
    borderWidth: 1,
    borderColor: "#ffffff", // White border
  },
  userInfo: {
    flex: 1,
    justifyContent: "space-around",
    alignContent: "space-around",
    // backgroundColor:'black',
    // height:60
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  userUsername: {
    color: "#fff",
    fontSize: 14,
    // color: "#666",
    marginTop: 5,
  },
  editIcon: {
    padding: 10,
    // backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 50,
  },
});
