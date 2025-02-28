import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

interface LottieAnimationProps {
  source: any; // Path to the animation JSON file
  width?: any;
  height?: any;
  loop?: boolean;
  autoPlay?: boolean;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  source,
  width = "100%",
  height = 400,
  loop = true,
  autoPlay = true,
}) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={source}
        autoPlay={autoPlay}
        loop={loop}
        style={{ width, height }}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LottieAnimation;
