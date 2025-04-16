import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import pickImage from "@/utils/image-pickers/PickImage";
import { FontAwesome } from "@expo/vector-icons";
import LottieAnimation from "@/utils/animations-helper/DotLottieAnimations";

const ProfilePicture = ({
  editable = true,
  firebasePictureUrl = null,
  editScreen = false,
  setProfilePictureUrl,
  profilePictureUrl,
}: {
  editable?: boolean;
  firebasePictureUrl?: string | null;
  editScreen?: boolean;
  setProfilePictureUrl: React.Dispatch<React.SetStateAction<string | null>>;
  profilePictureUrl: string | null;
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [imageCloudinaryLoading, setImageCloudinaryLoading] = useState(false);

  // Sync state with firebasePictureUrl if in edit mode
  useEffect(() => {
    if (editScreen && firebasePictureUrl) {
      setImage(firebasePictureUrl); // Set initial image if editing
    } else {
      setImage(null); // Reset image when not editing
    }
  }, [editScreen, firebasePictureUrl]);

  const handlePickImage = async () => {
    if (editable) {
      setImageCloudinaryLoading(true); // Start loading animation
      await pickImage(setProfilePictureUrl, setImageCloudinaryLoading); // Wait for image pick
      console.log("Image picked:", profilePictureUrl);
      setImageCloudinaryLoading(false)

      // if (profilePictureUrl) {
      //   // setProfilePictureUrl(image); // Set the parent component's state with the new image URI
      //   // setImage(image); // Optionally update local state with the image URI
      //   // setImage(profilePictureUrl); // Update local state with the new image URI
      //   console.log("Image URI set:", profilePictureUrl);
      // } else {
      //   alert("Image upload failed!");
      // }
    } else {
      alert("Image cannot be updated!");
      setImage(null); // Reset image when editable is false
    }
  };
  useEffect(() => {
    if (profilePictureUrl) {
      setImage(profilePictureUrl);
    }
  }, [profilePictureUrl]);

  return (
    <TouchableOpacity onPress={handlePickImage}>
      <View
        style={[
          {
            position: "absolute",
            bottom: 15,
            right: -3,
            zIndex: 10,
            backgroundColor: "white",
            padding: 5,
            borderRadius: 50,
            opacity: editable ? 1 : 0.5, // Opacity change when not editable
          },
        ]}
      >
        {editable && imageCloudinaryLoading ? (
          <ActivityIndicator size={18} color="#007BFF" />
        ) : editable ? (
          <FontAwesome
            name="pencil" // Icon for editable state
            size={18}
            color="rgb(29, 28, 28)"
          />
        ) : (
          <FontAwesome
            name="ban" // Icon when editable is false
            size={18}
            color="rgb(29, 28, 28)"
          />
        )}
      </View>

      <View
        style={[
          styles.imageContainer,
          !editable && { opacity: 0.5 }, // Reduce opacity when not editable
        ]}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <LottieAnimation
            source={require("@/assets/animations/profile-dummy.json")}
            width={200}
            height={200}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 75,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
});

export default ProfilePicture;
