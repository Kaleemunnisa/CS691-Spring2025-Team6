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

// import { useEffect } from "react";

const ProfilePicture = ({
  editable = true,
  firebasePictureUrl = null,
  editScreen = false,
}: {
  editable?: boolean;
  firebasePictureUrl?: string | null;
  editScreen?: boolean;
}) => {
  const [image, setImage] = useState<string | null>(null);
  //   if (editScreen) {
  //     setImage(firebasePictureUrl);
  //   }
  const [imageCloudinaryLoading, setImageCloudinaryLoading] = useState(false);

  useEffect(() => {
    if (editScreen) {
      // If the screen is in edit mode, use the firebasePictureUrl
      setImage(firebasePictureUrl);
    } else {
      // If not in edit mode, set image to null or some default value
      setImage(null);
    }
  }, [editScreen, firebasePictureUrl]);
  const handlePickImage = () => {
    // Call pickImage with the correct arguments
    if (editable) {
      pickImage(setImage, setImageCloudinaryLoading);
    } else {
      alert("Image cannot be updated!");
      setImage(null);
      //   console.log("disabled", image);
    }
  };
  return (
    // editable is false then disabled is true
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
            opacity: editable ? 1 : 0.5, // Change opacity when not editable
          },
        ]}
      >
        {editable && imageCloudinaryLoading ? (
          <ActivityIndicator size={18} color="#007BFF" />
        ) : editable ? (
          <FontAwesome
            name="pencil" // "pencil" icon when editable is true
            size={18}
            color="rgb(29, 28, 28)" // Color when editable is true
          />
        ) : (
          <FontAwesome
            name="ban" // "pencil" icon when editable is true
            size={18}
            color="rgb(29, 28, 28)" // Color when editable is true
          />
        )}
      </View>

      <View
        style={[
          styles.imageContainer,
          !editable && {
            /* Styles when editable is false */
            opacity: 0.5,
          },
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
    // marginBottom: 15,
    alignSelf: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
});
export default ProfilePicture;
