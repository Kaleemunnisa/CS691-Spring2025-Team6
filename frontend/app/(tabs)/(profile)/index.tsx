import { primaryColor } from "@/app/(auth)/colors";
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";

const ProfileScreen = () => {
  const user = {
    name: "John Doe",
    username: "@johndoe",
    profileImage:
      "https://github.com/user-attachments/assets/2e38c683-dff5-4e8c-88a2-ddd98e208d8e", // Replace with actual user image
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Section with fixed height based on content */}
      <View style={styles.profileSection}>
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <Image
              source={{ uri: user.profileImage }}
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userUsername}>{user.username}</Text>
            </View>
          </View>
        </View>
      </View>

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
