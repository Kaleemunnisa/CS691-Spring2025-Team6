import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

// Define the interface for props
interface TextInputWithIconProps extends TextInputProps {
  icon: string; // FontAwesome icon
}

// Reusable Component
const TextInputWithIcon: React.FC<TextInputWithIconProps> = ({
//   style,
  placeholder,
  value,
  onChangeText,
  icon,
  ...rest
}) => {
  const handleOnChange = () => {
    onChangeText;
  };
  return (
    <View style={styles.inputContainer}>
      <TextInput
      style={[{width:'100%'}]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        {...rest} // Spread other props (optional)
      />
      <FontAwesome
        style={styles.icon}
        name="pencil" // "pencil" icon when editable is true
        size={18}
        color="rgba(29, 28, 28, 0.42)" // Color when editable is true
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  icon: {
    position: "absolute",
    right: 10,
    alignSelf: "auto",
    marginLeft: 10, // Space between input and icon
  },
});

export default TextInputWithIcon;
