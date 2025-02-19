import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
} from "react-native";
import LottieAnimation from "../../animations-helper/DotLottieAnimations";
// import { useState, useEffect } from "react";

const getContrastColor = (bgColor: string) => {
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#000" : "#fff";
};

const { height: screenHeight } = Dimensions.get("window");
const UserTypeSelectionScreen = ({
  onSelect,
}: {
  onSelect: (userType: string) => void;
}) => {
  const slideAnim = useState<Animated.Value>(
    new Animated.Value(screenHeight)
  )[0]; // Start with 300 (below screen)

  // Function to handle button press and trigger the animation
  const handleSelectionPress = () => {
    Animated.timing(slideAnim, {
      toValue: 0, // Slide up to 0 (on screen)
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.selectionArea}>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "blue" }}>
          Select Your Role
        </Text>

        {/* Show Selection Button */}
        <TouchableOpacity style={styles.button} onPress={handleSelectionPress}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Show Selection</Text>
        </TouchableOpacity>
      </View>

      {/* Animated Selection Container */}
      <Animated.View
        style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.inCont}>
          <TouchableOpacity onPress={() => onSelect("tourist")}>
            <View style={styles.animationWrapper}>
              <Text
                style={[
                  styles.watermark,
                  { color: "rgba(117, 108, 233, 0.85)", letterSpacing: 15 },
                ]}
              >
                Travel
              </Text>
              <LottieAnimation
                source={require("../../../assets/animations/travellers-animation.json")}
                width={270}
                height={270}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onSelect("guide")}>
            <View style={styles.animationWrapper}>
              <Text
                style={[
                  styles.watermark,
                  { color: "rgba(108, 113, 113, 0.92)", letterSpacing: 20 },
                ]}
              >
                Guide
              </Text>
              <LottieAnimation
                source={require("../../../assets/animations/guide-animation.json")}
                width={300}
                height={270}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onSelect("business")}>
            <View style={styles.animationWrapper}>
              <Text
                style={[
                  styles.watermark,
                  { color: "rgba(242, 113, 93, 0.91)" },
                ]}
              >
                Business
              </Text>
              <LottieAnimation
                source={require("../../../assets/animations/business-animation.json")}
                width={300}
                height={270}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectionArea: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: 350,
    maxWidth: 350,
    padding: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    width: "100%",
    alignSelf: "center",
    position: "absolute", // Position it absolutely so it starts below the screen
    // bottom: 0,
    height: 400,
  },
  inCont: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  animationWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 270,
    backgroundColor: "#fff",
    // borderRadius:0
  },
  watermark: {
    position: "absolute",
    top: 10,
    fontSize: 60,
    fontWeight: "bold",
    // color: "rgba(203, 140, 225, 0.96)",
    textAlign: "center",
    letterSpacing: 3,
    // zIndex: 10,
    elevation: 10,
  },
});

export default UserTypeSelectionScreen;
