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

interface updateScreenProps {
  editClick: boolean;
  closeEditProfile: () => {};
}

const ProfileUpdateScreen: React.FC<updateScreenProps> = ({
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
        <TouchableOpacity onPress={closeEditProfile}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text>Satya</Text>
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
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
  },
});

export default ProfileUpdateScreen;
