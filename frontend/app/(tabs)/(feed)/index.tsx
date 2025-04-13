import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { Post } from "@/types/postTypes";
import PostCard from "@/components/PostCard";
import { fetchUserPosts } from "@/services/firebase/userPosts";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);

  const handleFetchUserPosts = async () => {
    try {
      const fetchedPosts = await fetchUserPosts();
      console.log("Fetched posts:", fetchedPosts);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]); // Set to empty array if there's an error
    }
  };

  useEffect(() => {
    handleFetchUserPosts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <PostCard post={item} />
          </View>
        )}
        showsVerticalScrollIndicator={false} // Optionally hide the scroll bar
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16, // Adjust spacing between posts
    // alignItems: "center", // Center the post horizontally
    // paddingHorizontal: 8, // Add padding around the post
    // backgroundColor:'red',

  },
  postCard: {
    // minWidth:300,
    width: "100%", // Full width of the parent container
    maxWidth: 600, // Maximum width similar to Instagram posts
    borderRadius: 12, // Rounded corners
    backgroundColor: "#fff", // White background for the post
    overflow: "hidden", // Hide overflow content if any
    marginBottom: 16, // Space between posts
    shadowColor: "#000", // Shadow effect for Instagram-like look
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  postImage: {
    width: "100%",
    alignSelf:'center', // Full width for the image
    height: 400, // Fixed height for the image (adjustable based on your design)
    resizeMode: "cover", // Ensures the image covers the entire width of the card
  },
  postContent: {
    padding: 10,
  },
  postDescription: {
    fontSize: 16,
    color: "#333",
  },
  location: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  postFooter: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postButton: {
    backgroundColor: "#3498db",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
