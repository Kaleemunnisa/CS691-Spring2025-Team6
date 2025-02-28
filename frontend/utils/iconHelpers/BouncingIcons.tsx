import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface BouncingComponentProps {
  children: React.ReactNode;
  bounceHeight?: number; // Custom bounce height
  duration?: number; // Custom animation speed
}

const BouncingIcon: React.FC<BouncingComponentProps> = ({
  children,
  bounceHeight = 10,
  duration = 300,
}) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-bounceHeight, { duration }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default BouncingIcon;
