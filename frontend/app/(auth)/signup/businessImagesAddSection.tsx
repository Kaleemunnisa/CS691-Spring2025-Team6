// import React, { useState, useEffect } from "react";
// import {
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   Alert,
//   StyleSheet,
// } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import uploadToCloudinary from "@/services/cloudinary/UploadImageToCloudinary";

// const BusinessImagesAddSection = () => {
//   const [images, setImages] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [uploadingImages, setUploadingImages] = useState<any[]>([]); // Track images being uploaded
//   const [uploadSuccess, setUploadSuccess] = useState(false);

//   const pickAndUploadImage = async () => {
//     // Assuming you have a function to pick images
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImages((prevImages) => [...prevImages, ...result.assets]); // Append new images
//     }
//   };

//   const handleDeleteImage = (index: number) => {
//     const newImages = images.filter((_, i) => i !== index);
//     setImages(newImages); // Remove the image at the given index
//   };

//   const askToUpload = () => {
//     console.log("askToUpload called");
//     Alert.alert(
//       "Upload Images",
//       "Do you want to upload the selected images to Cloudinary?",
//       [
//         { text: "Cancel", onPress: () => setImages([]) },
//         { text: "Upload", onPress: () => uploadImagesToCloudinary() },
//       ]
//     );
//     console.log("askToUpload completed");
//     console.log("images", images);
//   };

//   const uploadImagesToCloudinary = async () => {
//     setLoading(true);
//     setUploadSuccess(false);
//     setUploadingImages(images);

//     try {
//       const cloudinaryUrls: string[] = [];
//       for (const image of images) {
//         await uploadToCloudinary(
//           image.uri,
//           (data) => {
//             cloudinaryUrls.push(data);
//           },
//           setLoading
//         );
//       }

//       // Update images state with uploaded URLs after successful upload
//       setImages(cloudinaryUrls);
//       console.log("Uploaded URLs:", images);
//       setUploadSuccess(true);
//       Alert.alert("Success", "Images uploaded successfully!");
//     } catch (error) {
//       console.error("Upload failed:", error);
//       setUploadSuccess(false);
//       Alert.alert("Error", "Error uploading images.");
//     } finally {
//       setLoading(false);
//       setUploadingImages([]);
//     }

//     console.log("imageurl", images);
//   };

//   useEffect(() => {
//     console.log("Updated images state:", images);
//   }, [images]);
//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//           width: "80%",
//           alignSelf: "center",
//         }}
//       >
//         <TouchableOpacity
//           // style={styles.buttonContainers}
//           onPress={pickAndUploadImage}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator size="small" color="black" />
//           ) : uploadSuccess && images.length > 0 ? (
//             <View style={styles.buttonContainers}>
//               <FontAwesome name="check-circle" size={24} color="green" />
//               <Text>Uploaded</Text>
//             </View>
//           ) : (
//             <View style={styles.buttonContainers}>
//               <FontAwesome name="plus" size={24} color="black" />
//               <Text>Add Images</Text>
//             </View>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity
//           // style={styles.buttonContainers}
//           onPress={askToUpload}
//           disabled={loading}
//         >
//           <View style={styles.buttonContainers}>
//             <FontAwesome name="save" size={24} color="black" />
//             <Text>save</Text>
//           </View>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.imageWrapper}>
//         {images.map((item, index) => (
//           <View key={index.toString()} style={styles.imageContainer}>
//             {/* <Text>{item.uri}</Text> */}
//             <Image
//               source={{ uri: typeof item === "string" ? item : item.uri }}
//               style={styles.image}
//             />
//             <TouchableOpacity
//               style={styles.deleteButton}
//               onPress={() => handleDeleteImage(index)}
//             >
//               <FontAwesome name="trash" size={16} color="white" />
//             </TouchableOpacity>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // flexDirection: "row",
//     // // alignItems: "center",
//     // padding: 10,
//     width: "100%",
//   },
//   imageWrapper: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 10, // Optional: space between images
//     width: "90%",
//     alignSelf: "center",
//     // marginVertical:'auto',
//     // backgroundColor:'red',
//     justifyContent: "space-between",
//   },
//   imageContainer: {
//     position: "relative",
//     width: 90,
//     height: 90,
//     margin: 2,
//     alignSelf: "center",
//     borderRadius: 8,
//     overflow: "hidden",
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 8,
//   },
//   deleteButton: {
//     position: "absolute",
//     top: 4,
//     right: 4,
//     backgroundColor: "rgba(38, 36, 36, 0.68)",
//     borderRadius: 10,
//     padding: 4,
//   },
//   uploadButton: {
//     backgroundColor: "#007BFF",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonContainers: {
//     backgroundColor: "#E0E0E0",
//     padding: 8,
//     borderRadius: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-evenly",
//     marginVertical: 10,
//     gap: 10,
//     width: 120,
//     alignSelf: "center",
//   },
//   buttonText: {
//     color: "#000",
//     marginLeft: 10,
//   },
// });

// export default BusinessImagesAddSection;

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "@/services/cloudinary/UploadImageToCloudinary";

type Props = {
  setImagesAddedToCloudinaryStatus: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  images: any[];
  setImages: (images: any[]) => void;
};
const BusinessImagesAddSection = ({
  setImagesAddedToCloudinaryStatus,
  images,
  setImages,
}: Props) => {
  // const [images, setImages] = useState<any[]>([]); // All images, including local and Cloudinary
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState<any[]>([]); // Track images being uploaded
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const pickAndUploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets]); // Append new images
    }
  };

  const handleDeleteImage = async (index: number) => {
    const imageToDelete = images[index];

    if (imageToDelete.public_id) {
      // If it's a Cloudinary image, delete it from Cloudinary
      setLoading(true);
      try {
        // await deleteFromCloudinary(imageToDelete.public_id, setLoading);
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages); // Remove image from state after successful deletion
      } catch (error) {
        // console.error("Error deleting image from Cloudinary:", error);
      } finally {
        setLoading(false);
      }
    } else {
      // If it's a local image, just remove it from the local state
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
    }
  };

  useEffect(() => {
    const hasUploadedImages = images.some((img) => img.public_id);
    setUploadSuccess(hasUploadedImages);
  }, [images]);

  const askToUpload = () => {
    Alert.alert(
      "Upload Images",
      "Do you want to upload the selected images to Cloudinary?",
      [
        { text: "Cancel", onPress: () => setImages([]) },
        { text: "Upload", onPress: () => uploadImagesToCloudinary() },
      ]
    );
  };

  const askToDelete = (index: number) => {
    Alert.alert("Delete Image", "Do you want to delete this image?", [
      {
        text: "Cancel",
        onPress: () => {
          return;
        },
      },
      { text: "Delete", onPress: () => handleDeleteImage(index) },
    ]);
  };

  const uploadImagesToCloudinary = async () => {
    setLoading(true);
    setUploadSuccess(false);
    setUploadingImages(images);

    try {
      const cloudinaryUrls: string[] = [];
      for (const image of images) {
        const uploadedImage = await uploadToCloudinary(
          image.uri,
          (data) => {
            cloudinaryUrls.push(data.uri);
          },
          setLoading
        );
      }

      // Update images state with Cloudinary URLs after successful upload
      const updatedImages = images.map((image, index) =>
        cloudinaryUrls[index]
          ? {
              ...image,
              uri: cloudinaryUrls[index],
              public_id: cloudinaryUrls[index],
            }
          : image
      );
      setImages(updatedImages);
      setUploadSuccess(true);
      setImagesAddedToCloudinaryStatus(true);
      Alert.alert("Success", "Images uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadSuccess(false);
      Alert.alert("Error", "Error uploading images.");
    } finally {
      setLoading(false);
      setUploadingImages([]);
    }
  };

  useEffect(() => {
    console.log("Updated images state:", images);
  }, [images]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity onPress={pickAndUploadImage} disabled={loading}>
          {loading ? (
            <View style={styles.buttonContainers}>
              <ActivityIndicator size="small" color="black" />
            </View>
          ) : uploadSuccess && images.length > 0 ? (
            <View style={styles.buttonContainers}>
              <FontAwesome name="check-circle" size={24} color="green" />
              <Text>Uploaded</Text>
            </View>
          ) : (
            <View style={styles.buttonContainers}>
              <FontAwesome name="plus" size={24} color="black" />
              <Text>Add Images</Text>
            </View>
          )}
        </TouchableOpacity>

        {images.length > 0 && (
          <TouchableOpacity onPress={askToUpload} disabled={loading}>
            <View style={styles.buttonContainers}>
              <FontAwesome name="save" size={24} color="black" />
              <Text>Save</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.imageWrapper}>
        {images.map((item, index) => (
          <View key={index.toString()} style={styles.imageContainer}>
            <Image
              source={{ uri: uploadSuccess ? item.public_id : item.uri }}
              style={styles.image}
            />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => askToDelete(index)}
            >
              <FontAwesome name="trash" size={16} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  imageWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    position: "relative",
    width: 90,
    height: 90,
    margin: 2,
    alignSelf: "center",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  deleteButton: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(38, 36, 36, 0.68)",
    borderRadius: 10,
    padding: 4,
  },
  buttonContainers: {
    backgroundColor: "#E0E0E0",
    padding: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 10,
    gap: 10,
    width: 120,
    alignSelf: "center",
  },
});

export default BusinessImagesAddSection;
