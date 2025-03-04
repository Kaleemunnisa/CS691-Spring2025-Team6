import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
// import { AnimatedView } from "react-native-reanimated/lib/typescript/component/View";
import Feather from "@expo/vector-icons/Feather";
import { primaryBtnColor } from "@/app/(auth)/colors";
import ProfileDetailsUpdateSection from "./ProfileDetailsUpdateSection";

interface updateScreenProps {
  userData: any;
  editClick: boolean;
  closeEditProfile: () => void;
}

const ProfileUpdateScreen: React.FC<updateScreenProps> = ({
  userData,
  editClick,
  closeEditProfile,
}) => {
  const rightPosition = useRef(new Animated.Value(-2000)).current; // Start off-screen

  useEffect(() => {
    Animated.timing(rightPosition, {
      toValue: editClick ? 0 : -2000, // Move to 0 when `editClick` is true, back when false
      duration: 1000, // Animation duration
      useNativeDriver: false, // Right property doesn't support native driver
    }).start();
  }, [editClick]); // Run effect whenever `editClick` changes

  return (
    <Animated.View style={[styles.container, { right: rightPosition }]}>
      <SafeAreaView style={styles.viewContainer}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            onPress={closeEditProfile}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color="white" style={[]} />
          </TouchableOpacity>
          <Text style={styles.EditProfileText}>Update Profile</Text>
        </View>

        <View style={[{ width: "100%", height: "100%" }]}>
          <ProfileDetailsUpdateSection userData={userData} />
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1, // Ensures the SafeAreaView takes up full height and width
    height: "100%",
    position: "absolute",
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    // borderWidth:2,
    zIndex: 10,
    // right: -2000,
  },
  viewContainer: {
    flex: 1, // Makes the View fill the entire screen
    // justifyContent: "flex-start", // Centers content vertically
    // alignItems: "center", // Centers content horizontally
    // backgroundColor:'red'
  },
  backButtonContainer: {
    position: "relative",
    // alignSelf:'flex-start'
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
  },
  backButton: {
    position: "absolute",
    // left:10,
    zIndex: 10,
    backgroundColor: primaryBtnColor,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    width: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    // width:30,
  },
  EditProfileText: {
    // alignContent: "center",
    textAlignVertical: "center",
    paddingVertical: 10,
    // paddingLeft: 15,
    // width: "100%",
    // backgroundColor: "grey",
    textAlign: "center",
    flex: 1,
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileUpdateScreen;
