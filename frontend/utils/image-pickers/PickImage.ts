import * as ImagePicker from "expo-image-picker";
import uploadToCloudinary from "@/services/cloudinary/UploadImageToCloudinary";

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
    setImage(imageUri); // Save the image URI to state
    // handleChange("profilePicture", result.uri); // Save the image URI in the form

    // Now upload to Cloudinary
    console.log("cloudinary started");
    await uploadToCloudinary(
      imageUri,
      setImage,
      setImageCloudinaryLoading
    ).then(() => {
      setImageCloudinaryLoading(false);
    });
    console.log("Image Uploaded");
  }
};
export default pickImage;
