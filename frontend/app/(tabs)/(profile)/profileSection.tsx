import { useState, useEffect } from "react";
import { primaryColor } from "@/app/(auth)/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { signOutUser } from "@/services/firebase/firebaseAuth";
import { useRouter } from "expo-router";

interface ProfileSectionProps {
  userData: {
    userType: string;
    uid: string;
    profilePicture: string;
    name: string;
    userName: string;
    email: string;
    phoneNumber: string;
    bio: string;
    location: string;
    website: string;
    socialLinks: {
      facebook: string;
      instagram: string;
      twitter: string;
    };
  };
  setEditClick: any;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  userData,
  setEditClick,
}) => {
  const handleEditClick = () => {
    setEditClick(true); // Toggle edit state
  };
  //userData

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOutUser();
      router.replace("/(auth)/login"); // Redirect to login screen
    } catch (error) {
      Alert.alert("Logout Failed", (error as any).message);
    }
  };

  return (
    <View style={styles.profileSection}>
      <TouchableOpacity onPress={handleEditClick}>
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <Image
              source={{ uri: userData?.profilePicture }}
              style={styles.profileImage}
            />
            {userData ? (
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{userData?.name}</Text>
                <Text style={styles.userUsername}>{userData?.userName}</Text>
              </View>
            ) : (
              <View style={styles.userInfo}>
                <Text style={styles.userName}>User Name</Text>
                <Text style={styles.userUsername}>Name</Text>
              </View>
            )}
            <TouchableOpacity onPress={handleLogout} style={styles.editIcon}>
              <FontAwesome
                name="power-off"
                size={26}
                color="rgba(239, 232, 232, 0.95)"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleEditClick} style={styles.editIcon}>
              <FontAwesome name="edit" size={26} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
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
