// import { primaryColor } from "@/app/(auth)/colors";
// import React, { useEffect, useState, useRef } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   Image,
//   Animated,
//   ActivityIndicator,
// } from "react-native";

// import getCurrentUserData from "@/services/firebase/fetchUserDetails";
// import ProfileUpdateScreen from "./profileUpdateScreen";
// import ProfileSection from "./profileSection";
// import { getUserFavorites } from "@/services/firebase/favourites";
// import userAuth from "@/services/firebase/userAuth";
// import FavoritesSection from "./favoritesSection";
// // import { faV } from "@fortawesome/free-solid-svg-icons";
// import getUserDataByType from "@/services/firebase/fetchUserDetailsByType";
// import LottieAnimation from "@/utils/animations-helper/DotLottieAnimations";
// import AppointmentsScreen from "./AppointmentsSection";

// const ProfileScreen = () => {
//   const [userData, setUserData] = useState<any>();
//   const [editClick, setEditClick] = useState(false);

//   const { user, loading } = userAuth();
//   //changing the userdata
//   useEffect(() => {
//     getCurrentUserData().then((currentUser) => {
//       if (currentUser) {
//         setUserData(currentUser);
//       } else {
//         console.log("no user logged in?");
//       }
//     });
//   }, []);

//   const [userDataFull, setUserDataFull] = useState<any>(null);

//   // useEffect(() => {
//   //   console.log("User Type: -->>", userData?.userType);
//   //   getUserDataByType(userData?.userType)
//   //     .then((data) => {
//   //       setUserDataFull(data);
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //     });
//   // }, [userData]);

//   useEffect(() => {
//     if (!userData?.userType) return; // wait until userType is available

//     console.log("User Type: -->>", userData.userType);

//     getUserDataByType(userData.userType)
//       .then((data) => {
//         setUserDataFull(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [userData?.userType]);

//   useEffect(() => {
//     console.log(userDataFull);
//   }, [userDataFull]);

//   return (
//     <SafeAreaView style={styles.container}>
//       {loading ? (
//         <ActivityIndicator
//           size="large"
//           color="#0000ff"
//           style={styles.loadingIndicator}
//         />
//       ) : (
//         <>
//           {userDataFull ? (
//             <>
//               <ProfileUpdateScreen
//                 userData={userDataFull}
//                 editClick={editClick}
//                 closeEditProfile={() => {
//                   setEditClick(false);p
//                 }}
//               />

//               <ProfileSection
//                 userData={userDataFull}
//                 setEditClick={setEditClick}
//               />

//               <AppointmentsScreen />

//               <FavoritesSection uid={user?.uid || ""} />
//             </>
//           ) : (
//             <View style={styles.loadingUserDataIndicator}>
//               <LottieAnimation
//                 source={require("@/assets/animations/loading-animation.json")}
//                 autoPlay
//                 loop
//                 width={100}
//                 height={100}
//               />
//             </View>
//           )}
//         </>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   loadingUserDataIndicator: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(225,225,225,0.3)",
//     // height:"100%",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   loadingIndicator: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   eventsContainer: {
//     padding: 16,
//   },
//   eventCard: {
//     backgroundColor: "rgba(224, 226, 227, 0.31)",
//     padding: 16,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
// });

// export default ProfileScreen;

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import getCurrentUserData from "@/services/firebase/fetchUserDetails";
import userAuth from "@/services/firebase/userAuth";
import ProfileUpdateScreen from "./profileUpdateScreen";
import ProfileSection from "./profileSection";
import FavoritesSection from "./favoritesSection";
import AppointmentsScreen from "./AppointmentsSection";
import LottieAnimation from "@/utils/animations-helper/DotLottieAnimations";
import getUserDataByType from "@/services/firebase/fetchUserDetailsByType";
import { FontAwesome } from "@expo/vector-icons";
import { primaryBtnColor } from "@/app/(auth)/colors";
import { primaryColor } from "@/app/(auth)/colors";

const ProfileScreen = () => {
  const [userData, setUserData] = useState<any>();
  const [editClick, setEditClick] = useState(false);
  const [selectedTab, setSelectedTab] = useState("favorites"); // Track the selected tab

  const { user, loading } = userAuth();

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

  useEffect(() => {
    if (!userData?.userType) return;
    getUserDataByType(userData.userType)
      .then((data) => {
        setUserDataFull(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData?.userType]);

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

              {/* Horizontal Navbar for toggling between Favorites and Appointments */}
              <View style={styles.navbar}>
                <TouchableOpacity
                  style={[
                    styles.navItem,
                    selectedTab === "favorites" && styles.activeTab,
                  ]}
                  onPress={() => setSelectedTab("favorites")}
                >
                  <Text
                    style={[
                      styles.navText,
                      selectedTab === "favorites" && styles.activeText,
                    ]}
                  >
                    Fa
                    <FontAwesome name="heart" size={24} color="red" />
                    orites
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.navItem,
                    selectedTab === "appointments" && styles.activeTab,
                  ]}
                  onPress={() => setSelectedTab("appointments")}
                >
                  <Text
                    style={[
                      styles.navText,
                      selectedTab === "appointments" && styles.activeText,
                    ]}
                  >
                    My Appointments
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Render the selected screen based on the tab */}
              {selectedTab === "favorites" ? (
                <FavoritesSection uid={user?.uid || ""} />
              ) : (
                <AppointmentsScreen />
              )}
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  navItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
  },
  navText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  activeTab: {
    // borderBottomWidth: 3,
    // borderBottomColor: "#3498db", // Active tab color
    backgroundColor: primaryColor,
    borderRadius: 20,
  },
  activeText: {
    // color: "#3498db", // Active text color
    color: "white",
  },
  loadingUserDataIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(225,225,225,0.3)",
  },
});

export default ProfileScreen;
