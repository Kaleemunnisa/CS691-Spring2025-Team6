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
  ActivityIndicator,
} from "react-native";

import getCurrentUserData from "@/services/firebase/fetchUserDetails";
import ProfileUpdateScreen from "./profileUpdateScreen";
import ProfileSection from "./profileSection";
import { getUserFavorites } from "@/services/firebase/favourites";
import userAuth from "@/services/firebase/userAuth";
import FavoritesSection from "./favoritesSection";
// import { faV } from "@fortawesome/free-solid-svg-icons";
import getUserDataByType from "@/services/firebase/fetchUserDetailsByType";
import LottieAnimation from "@/utils/animations-helper/DotLottieAnimations";

const ProfileScreen = () => {
  const [userData, setUserData] = useState<any>();
  const [editClick, setEditClick] = useState(false);

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

  const [userDataFull, setUserDataFull] = useState<any>(null);

  // useEffect(() => {
  //   console.log("User Type: -->>", userData?.userType);
  //   getUserDataByType(userData?.userType)
  //     .then((data) => {
  //       setUserDataFull(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [userData]);

  useEffect(() => {
    if (!userData?.userType) return; // wait until userType is available

    console.log("User Type: -->>", userData.userType);

    getUserDataByType(userData.userType)
      .then((data) => {
        setUserDataFull(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData?.userType]);

  useEffect(() => {
    console.log(userDataFull);
  }, [userDataFull]);

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
          {userDataFull ? (
            <>
              <ProfileUpdateScreen
                userData={userDataFull}
                editClick={editClick}
                closeEditProfile={() => {
                  setEditClick(false);
                }}
              />

              <ProfileSection
                userData={userDataFull}
                setEditClick={setEditClick}
              />

              <FavoritesSection uid={user?.uid || ""} />
            </>
          ) : (
            <View style={styles.loadingUserDataIndicator}>
              <LottieAnimation
                source={require("@/assets/animations/loading-animation.json")}
                autoPlay
                loop
                width={100}
                height={100}
              />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingUserDataIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(225,225,225,0.3)",
    // height:"100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
