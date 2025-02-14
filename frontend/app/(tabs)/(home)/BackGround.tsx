import useKeyboardStatus from "@/app/keyBoard_utilities/KeyboardStatus";
import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

interface BackGroundProps {
  loading: boolean;
}

const BackGround: React.FC<BackGroundProps> = ({ loading }) => {
  // const isKeyboardActive = useKeyboardStatus();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.textview}>
        {/* {isKeyboardActive && <Text>Keyboard is active</Text>} */}
        <Text style={styles.text}>Unlock the Best Experiences Around You!</Text>
        {loading && <ActivityIndicator size="large" color="white" />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BackGround;

const styles = StyleSheet.create({
  textview: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#23486A",
    height: "100%",
    padding: 30,
    paddingTop: 100,
  },

  text: {
    paddingTop: 100,
    paddingBottom: 20,
    fontSize: 58,
    fontWeight: 700,
    fontFamily:
      Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif-condensed",
    color: "white",
  },
});
