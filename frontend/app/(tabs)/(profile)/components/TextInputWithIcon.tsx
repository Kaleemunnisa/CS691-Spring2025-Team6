import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// Define the interface for props
interface TextInputWithIconProps extends TextInputProps {
  icon?: any;
  editable?: boolean;
  label?: string;
}

// Reusable Component
const TextInputWithIcon: React.FC<TextInputWithIconProps> = ({
  editable = true,
  icon = "pencil",
  placeholder,
  value,
  onChangeText,
  label,
  ...rest
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inputContainer}>
        {label && <Text style={styles.label}>{label}</Text>}

        <TextInput
          style={[
            styles.input,
            { color: editable ? "#000" : "rgba(0,0,0,0.4)" },
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          placeholderTextColor="rgba(0,0,0,0.3)"
          {...rest}
        />

        <FontAwesome
          style={styles.icon}
          name={icon}
          size={18}
          color={
            editable ? "rgba(126, 192, 79, 0.79)" : "rgba(255, 0, 0, 0.43)"
          }
        />
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 15,
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  label: {
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    fontSize: 12,
    color: "#444",
    zIndex: 1,
  },
  input: {
    width: "100%",
    height: "100%",
    fontSize: 14,
    paddingRight: 25, // spacing for icon
  },
  icon: {
    position: "absolute",
    right: 10,
  },
});

export default TextInputWithIcon;
