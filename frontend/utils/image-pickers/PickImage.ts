import * as ImagePicker from "expo-image-picker";
import { uploadToCloudinary } from "@/services/cloudinary/UploadImageToCloudinary";

const pickImage = async (
  setImage: React.Dispatch<React.SetStateAction<string | null>>,
  setImageCloudinaryLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });
  console.log(result);

  if (!result.canceled) {
    const selectedImage = result.assets[0];
    const imageUri = selectedImage.uri;
    console.log(imageUri);
    // setImage(imageUri); // Save the image URI to state
    // handleChange("profilePicture", result.uri); // Save the image URI in the form

    // Now upload to Cloudinary
    console.log("cloudinary started");
    await uploadToCloudinary(
      imageUri,
      (data) => {
        setImage(data.uri);
        // return data.uri;
      },
      setImageCloudinaryLoading
    ).then(() => {
      setImageCloudinaryLoading(false);
      console.log("Image Uploaded");

      // return null;
    });
    // return null;
  }
  // return null; // Ensure the function always returns a value
};
export default pickImage;
