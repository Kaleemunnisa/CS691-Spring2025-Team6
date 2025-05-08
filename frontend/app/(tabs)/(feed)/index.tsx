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
import { Post, PostDisplay } from "@/types/types";
import PostCard from "@/components/PostCard";
import { fetchUserPosts } from "@/services/firebase/userPosts";
import { fetchPaginatedPosts } from "@/services/firebase/postsFeed";
import FeedScreen from "./FeedScreen";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const { width } = Dimensions.get("window");

export default function PostScreen() {
  const [posts, setPosts] = useState<PostDisplay[]>([]);
  const tabBarHeight = useBottomTabBarHeight(); // Get the height of the bottom tab bar

  // const handleFetchUserPosts = async () => {
  //   try {
  //     const fetchedPosts = await fetchUserPosts();
  //     console.log("Fetched posts:", fetchedPosts);
  //     setPosts(fetchedPosts);
  //   } catch (error) {
  //     console.error("Error fetching posts:", error);
  //     setPosts([]); // Set to empty array if there's an error
  //   }
  // };

  useEffect(() => {
    // handleFetchUserPosts();
    console.log("Bottom tab bar height:", tabBarHeight);
    fetchPaginatedPosts(1, 10);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingBottom: tabBarHeight - 34 }}>
        <FeedScreen />
      </View>
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
    alignSelf: "center", // Full width for the image
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
