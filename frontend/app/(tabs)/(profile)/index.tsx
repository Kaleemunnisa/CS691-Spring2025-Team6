import { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  View,
  Alert,
} from "react-native";
import getCurrentUserData from "@/services/firebase/fetchUserDetails";
import ProfileUpdateScreen from "./profileUpdateScreen";
import ProfileSection from "./profileSection";
import userAuth from "@/services/firebase/userAuth";
import FavoritesSection from "./favoritesSection";
// import { faV } from "@fortawesome/free-solid-svg-icons";
import { signOutUser } from "@/services/firebase/firebaseAuth";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const [userData, setUserData] = useState<any>();
  const [editClick, setEditClick] = useState(false);
  const router = useRouter();

  const { user, loading } = userAuth();
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

  const handleLogout = async () => {
    try {
      const success = await signOutUser();
      if (success) {
        router.replace("/(auth)/login"); // Redirect to login screen
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Logout Failed", error.message);
      } else {
        Alert.alert("Logout Failed", "An unknown error occurred");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      ) : (
        <>
          {userData ? (
            <View style={styles.container}>
              <ProfileUpdateScreen
                userData={userData}
                editClick={editClick}
                closeEditProfile={() => {
                  setEditClick(false);
                }}
              />

              <ProfileSection userData={userData} setEditClick={setEditClick} />

              <FavoritesSection uid={user?.uid || ""} />
            </View>
          ) : (
            <Text>Loading user data...</Text>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
