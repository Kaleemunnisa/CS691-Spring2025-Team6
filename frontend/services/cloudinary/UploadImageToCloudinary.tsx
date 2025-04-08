import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";

const uploadToCloudinary = async (
  uri: string,
  // setImage: (url: string) => void,
  setImage: (data: { uri: string; public_id: string }) => void,
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

    // console.log("Uploaded Image URL:", response.data.secure_url);
    // setImage(response.data.secure_url);

    const originalUrl = response.data.secure_url;
    const optimizedUrl = originalUrl.replace(
      "/upload/",
      "/upload/w_800,q_auto,f_auto/"
    );

    console.log("Optimized Image URL:", optimizedUrl);
    // setImage(optimizedUrl);
    setImage({
      uri: optimizedUrl,
      public_id: response.data.public_id,
    });
    console.log("Image uploaded successfully:", response.data);
  } catch (error: any) {
    console.error("Upload failed:", error.response?.data || error.message);
    alert(
      `Error uploading image: ${
        error.response?.data?.error?.message || "Unknown error"
      }`
    );
  }
};

// Delete function
const deleteFromCloudinary = async (
  public_id: string,
  setLoading: (status: boolean) => void
) => {
  try {
    console.log("Deleting from Cloudinary, Public ID: ", public_id);

    // Step 1: Set loading state
    setLoading(true);

    // Step 2: Make delete request to Cloudinary API
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dlbmok0ay/image/destroy",
      {
        public_id: public_id, // The public ID of the image to delete
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Cloudinary delete response:", response.data);

    if (response.data.result === "ok") {
      alert("Image deleted successfully from Cloudinary!");
    } else {
      alert("Failed to delete image from Cloudinary.");
    }
  } catch (error: any) {
    console.error("Delete failed:", error.response?.data || error.message);
    alert(
      `Error deleting image: ${
        error.response?.data?.error?.message || "Unknown error"
      }`
    );
  } finally {
    setLoading(false);
  }
};

export { uploadToCloudinary, deleteFromCloudinary };
