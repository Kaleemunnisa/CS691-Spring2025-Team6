import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import _ from "lodash";

const ChangePasswordScreen = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePasswordDisable, setChangePasswordDisable] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    if (user) {
      try {
        // Reauthenticate the user with their current password
        if (user.email) {
          const credentials = EmailAuthProvider.credential(
            user.email,
            oldPassword
          );
          await reauthenticateWithCredential(user, credentials);
        } else {
          alert("User email is not available.");
          return;
        }

        // Update the password
        await updatePassword(user, newPassword);
        Alert.alert("Success", "Password updated successfully!");
      } catch (error) {
        console.error(error);
        alert("Error updating password: " + (error as Error).message);
      }
    }
  };

  useEffect(() => {
    if (
      oldPassword.length > 0 &&
      newPassword.length > 0 &&
      confirmPassword.length > 0 &&
      newPassword === confirmPassword
    ) {
      setChangePasswordDisable(false);
    } else {
      setChangePasswordDisable(true);
    }
  }, [oldPassword, newPassword, confirmPassword]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Old Password"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button
        title="Change Password"
        onPress={handlePasswordChange}
        disabled={changePasswordDisable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default ChangePasswordScreen;
