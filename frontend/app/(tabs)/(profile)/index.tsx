import { primaryColor } from "@/app/(auth)/colors";
import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Animated,
} from "react-native";

import getCurrentUserData from "@/services/api/fetchUserDetails";
import ProfileUpdateScreen from "./profileUpdateScreen";
import ProfileSection from "./profileSection";

const ProfileScreen = () => {
  const [userData, setUserData] = useState<any>(null);

  const [editClick, setEditClick] = useState(false);
  //changing the userdata
  useEffect(() => {
    getCurrentUserData().then((currentUser) => {
      if (currentUser) {
        setUserData(currentUser);
      } else {
        console.log("no user logged in?");
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ProfileUpdateScreen
        editClick={editClick}
        closeEditProfile={() => {
          setEditClick(false);
        }}
      />
      {/* <View></View> */}
      {/* Profile Section with fixed height based on content */}
      <ProfileSection userDate={userData} setEditClick={setEditClick} />

      {/* Scrollable Events Section taking remaining space */}
      <ScrollView
        style={styles.eventsSection}
        contentContainerStyle={styles.eventsContainer}
      >
        <Text style={styles.heading}>Added Events Section</Text>
        {/* Sample events */}
        {[...Array(10)].map((_, index) => (
          <View key={index} style={styles.eventCard}>
            <Text>Event {index + 1}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  eventsSection: {
    flex: 1, // Takes remaining space
    // backgroundColor: "#fff",
    // marginTop: 30,
    position: "relative", // Allows the blending effect to overlay
  },

  eventsContainer: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: "rgba(224, 226, 227, 0.31)",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default ProfileScreen;
