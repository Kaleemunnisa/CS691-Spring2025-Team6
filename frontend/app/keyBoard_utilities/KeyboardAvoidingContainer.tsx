import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

interface KeyboardAvoidingContainerProps {
  children: ReactNode;
}

const KeyboardAvoidingContainer: React.FC<KeyboardAvoidingContainerProps> = ({
  children,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: "flex-end", padding: 0 }}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingContainer;
