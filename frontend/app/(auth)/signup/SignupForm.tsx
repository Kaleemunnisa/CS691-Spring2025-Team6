import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
// import {useParams} from "reat-native"
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const SignupForm = () => {
  const router = useRouter();
  const { userType } = useLocalSearchParams(); // Get the userType from the query parameters

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    expertise: "",
  });

  // Handle form field changes
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Form submitted for:", userType, formData);
    // Handle form submission (e.g., API call or save data to state)
  };

  const handleBack = () => {
    router.push("/signup"); // Navigate back to the selection screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Signup as {userType}</Text>

      {/* Common fields for all user types */}
      <TextInput
        style={styles.input}
        placeholder={`Enter your name for ${userType}`}
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
      />

      {/* Conditionally render fields based on userType */}
      {userType === "Guide" && (
        <TextInput
          style={styles.input}
          placeholder="Enter your expertise"
          value={formData.expertise}
          onChangeText={(text) => handleChange("expertise", text)}
        />
      )}

      {userType === "Business" && (
        <TextInput
          style={styles.input}
          placeholder="Enter your company name"
          value={formData.companyName}
          onChangeText={(text) => handleChange("companyName", text)}
        />
      )}

      <Button title="Submit" onPress={handleSubmit} />
      <Button title="Back" onPress={handleBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
});

export default SignupForm;
