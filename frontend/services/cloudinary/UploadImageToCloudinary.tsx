import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";

const uploadToCloudinary = async (
  uri: string,
  setImage: (url: string) => void,
  setImageCloudinaryLoading: (status: boolean) => void
) => {
  try {
    console.log("Original Image URI: ", uri);

    // Step 1: Compress image without resizing
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [], // No resizing, keep original dimensions
      { compress: 0.4, format: ImageManipulator.SaveFormat.JPEG } // Compress to reduce file size (adjustable)
    );

    console.log("Compressed Image URI: ", manipulatedImage.uri);

    const fileName = manipulatedImage.uri.split("/").pop(); // Extract file name

    // Step 2: Prepare form data
    const formData = new FormData();
    formData.append("file", {
      uri: manipulatedImage.uri, // Use compressed image
      name: fileName,
      type: "image/jpeg",
    } as any);

    formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary preset

    console.log("Uploading to Cloudinary...");
    setImageCloudinaryLoading(true);

    // Step 3: Upload to Cloudinary
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dlbmok0ay/image/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Uploaded Image URL:", response.data.secure_url);
    setImage(response.data.secure_url);
  } catch (error: any) {
    console.error("Upload failed:", error.response?.data || error.message);
    alert(
      `Error uploading image: ${
        error.response?.data?.error?.message || "Unknown error"
      }`
    );
  }
};

export default uploadToCloudinary;
