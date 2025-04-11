import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import pickImage from "@/utils/image-pickers/PickImage";
import { Event, Post } from "@/types/postTypes";
import TextInputWithIcon from "../(profile)/components/TextInputWithIcon";
import { FontAwesome } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";

const GOOGLE_PLACES_API_KEY = "YOUR_GOOGLE_PLACES_API_KEY";
import { auth } from "@/config/firebaseConfig";
import { saveUserCreatedEvent } from "@/services/firebase/userEvents";

import { saveUserCreatedPost } from "@/services/firebase/userPosts";
import UserCreateEventSection from "./eventAddScreen";

const onSaveEvent = async (event: Event) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.error("User not logged in");
      return;
    }

    const userId = currentUser.uid;
    const { id, ...eventDataWithoutId } = event;

    // Save event to Firestore
    const savedId = await saveUserCreatedEvent(eventDataWithoutId);
    console.log("✅ Event saved with ID:", savedId);
  } catch (error) {
    console.error("❌ Failed to save event:", error);
  }
};

const PostAddScreen = () => {
  const [post, setPost] = useState<Post>({
    id: "",
    imageUrls: [],
    taggedUsers: [],
    description: "",
    location: null,
  });

  const [loading, setLoading] = useState(false);
  const [currentSelectedPostImage, setCurrentSelectedPostImage] =
    useState<any>(null);

  const handleAddPostImage = async () => {
    console.log("Add Post Image clicked");

    await pickImage(setCurrentSelectedPostImage, setLoading);
  };

  useEffect(() => {
    console.log("Post image selected:", currentSelectedPostImage);
    console.log("Post image selected loading state:", loading);
    // console.log("Post image selected loading state:", loading);
    console.log(
      "post image urls inside currentSelectedPostImage useEffect",
      post.imageUrls
    );
    if (currentSelectedPostImage && !loading) {
      console.log("loading state", loading);
      console.log("Post image selected:", currentSelectedPostImage);

      // Prevent adding duplicate images
      setPost((prev) => {
        const updatedImageUrls = [...prev.imageUrls];
        if (!updatedImageUrls.includes(currentSelectedPostImage)) {
          updatedImageUrls.push(currentSelectedPostImage);
        }
        return { ...prev, imageUrls: updatedImageUrls };
      });
    }
    console.log(
      "post image urls inside currentSelectedPostImage useEffect after",
      post.imageUrls
    );
  }, [currentSelectedPostImage]);

  const handleRemoveImage = (index: number) => {
    const updatedImageUrls = post.imageUrls.filter((_, i) => i !== index);
    setPost((prev) => ({ ...prev, imageUrls: updatedImageUrls }));
  };

  useEffect(() => {
    console.log("Post object updated:", post);
    console.log("Post image URLs:", post.imageUrls);
  }, [post]);

  const handleSavePost = async () => {
    try {
      console.log("Saving post...");
      saveUserCreatedPost(post).then((postId) => {
        console.log("Post saved with ID:", postId);
        console.log("Post data:", post);
        // Reset the post state after saving
        setPost({
          id: "",
          imageUrls: [],
          taggedUsers: [],
          description: "",
          location: null,
        });
        console.log("Post saved successfully");
      });
    } catch (error) {
      console.log("Error saving post:", error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1,marginTop:-40 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.heading}>Share Your Experience</Text>
            <Text style={styles.sectionTitle}>Create a Post: </Text>

            <TouchableOpacity
              onPress={handleAddPostImage}
              style={styles.addButton}
            >
              <Text style={styles.addImageText}>Add Images</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="small" color="#007bff" />}

            {post.imageUrls && post.imageUrls.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginVertical: 10 }}
              >
                {post.imageUrls.map((uri, idx) => (
                  <View key={idx} style={styles.imageContainer}>
                    <Image source={{ uri }} style={styles.image} />
                    <TouchableOpacity
                      onPress={() => handleRemoveImage(idx)}
                      style={styles.removeIcon}
                    >
                      <FontAwesome name="remove" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}

            <TextInputWithIcon
              label="Description"
              placeholder="Write something..."
              multiline
              value={post.description}
              onChangeText={(text) =>
                setPost((prev) => ({ ...prev, description: text }))
              }
            />

            <TextInputWithIcon
              label="Location"
              icon="map-pin"
              placeholder="Search for location"
              value={post.location?.name || ""}
              onChangeText={(text) =>
                setPost((prev) => ({
                  ...prev,
                  location: { ...prev.location, name: text },
                }))
              }
            />
            {post.location && (
              <Text style={styles.locationText}>
                📍 Selected: {post.location.name}
              </Text>
            )}
            <TouchableOpacity
              style={styles.savePostButton}
              onPress={() => {
                handleSavePost();
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Save
              </Text>
            </TouchableOpacity>

            <UserCreateEventSection />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addImageText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    padding: 5,
    alignSelf: "center",
  },
  addButton: {
    backgroundColor: "#78B7D0",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginVertical: 10,
    marginBottom: 20,
    padding: 10,
    maxWidth: 400,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    padding: 5,
    alignSelf: "center",
  },
  container: {
    padding: 16,
    paddingTop: 0,
    // backgroundColor: "black",
    // marginTop: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 10,
  },
  image: {
    width: 200, // Takes up the full width of the screen
    height: 200, // Adjust the height to your preference (e.g., 200px)
    marginVertical: 8,
    // minWidth: 300, // Ensures the image does not shrink below a minimum width
    resizeMode: "contain", // Ensures the image is cropped and covers the area without distorting its aspect ratio
  },
  imageContainer: {
    marginRight: 1, // To add spacing between images
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  locationText: {
    marginTop: 8,
  },
  eventContainer: {
    // borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
  },
  eventInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
    borderRadius: 6,
  },
  eventImage: {
    width: 100,
    height: 100,
    marginTop: 8,
  },
  addEventButton: {
    backgroundColor: "#78B7D0",
    padding: 10,
    borderRadius: 8,
    marginVertical: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  removeIcon: {
    position: "absolute",
    top: 15,
    right: 5,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 5,
    zIndex: 1,
  },
  savePostButton: {
    backgroundColor: "#227B94",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    // width: 100,
    alignSelf: "center",
  },
});

export default PostAddScreen;
