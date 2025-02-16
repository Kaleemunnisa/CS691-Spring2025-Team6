import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LottieAnimation from "../../animations-helper/DotLottieAnimations";

const UserTypeSelectionScreen = ({
  onSelect,
  
}: {
  onSelect: (userType: string) => void;
 
}) => {
  return (
    <View style={styles.container}>
      {/* Animation 1 */}
      <TouchableOpacity onPress={() => onSelect("tourist")}>
        <View style={styles.animationWrapper}>
          <Text style={styles.watermark}>Travel</Text>
          <LottieAnimation
            source={require("../../../assets/animations/travellers-animation.json")}
            width={480}
            height={330}
          />
        </View>
      </TouchableOpacity>

      {/* Animation 2 */}
      <TouchableOpacity onPress={() => onSelect("guide")}>
        <View style={styles.animationWrapper}>
          <Text style={styles.watermark}>Guide</Text>
          <LottieAnimation
            source={require("../../../assets/animations/guide-animation.json")}
            width={500}
            height={290}
          />
        </View>
      </TouchableOpacity>

      {/* Animation 3 */}
      <TouchableOpacity onPress={() => onSelect("business")}>
        <View style={styles.animationWrapper}>
          <Text style={styles.watermark}>Business</Text>
          <LottieAnimation
            source={require("../../../assets/animations/business-animation.json")}
            width={500}
            height={300}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    minWidth: 350,
    padding: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 15,
  },
  animationWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  watermark: {
    position: "absolute",
    top: "40%",
    fontSize: 60,
    fontWeight: "bold",
    color: "rgba(192, 199, 193, 0.7)",
    textAlign: "center",
    letterSpacing: 5,
    zIndex: 10,
    elevation: 10,
  },
});

export default UserTypeSelectionScreen;
