import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

interface updateScreenProps {
  height: any;
}

const ProfileUpdateScreen: React.FC<updateScreenProps> = ({ height }) => {
  return (
    <SafeAreaView style={[styles.container, { height: height }]}>
      <View style={styles.viewContainer}>
        <Text>Satya</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1, // Ensures the SafeAreaView takes up full height and width
    height: "100%",
  },
  viewContainer: {
    flex: 1, // Makes the View fill the entire screen
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
  },
});

export default ProfileUpdateScreen;
