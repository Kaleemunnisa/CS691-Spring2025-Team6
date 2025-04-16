import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { fetchPaginatedPosts } from "@/services/firebase/postsFeed"; // Adjust as per your function
import { PostDisplay } from "@/types/types"; // Your PostDisplay interface
import { FontAwesome } from "@expo/vector-icons";
import { primaryBtnColor } from "@/app/(auth)/colors";
const screenWidth = Dimensions.get("window").width;

const PostCard = ({ post }: { post: PostDisplay }) => {
  return (
    <View style={styles.postContainer}>
      {/* User Info */}
      {/* <Text style={styles.userName}>{post.userName}</Text> */}
      <View style={styles.userInfo}>
        <Image source={{ uri: post.userImage }} style={styles.profileImage} />
        <Text style={styles.userName}>{post.userName}</Text>
      </View>

      {/* Post Image */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {post.imageUrls.map((url, index) => (
          <View key={index} style={styles.imageWrapper}>
            {/* Blurred Background */}
            <Image
              source={{ uri: url }}
              style={styles.blurredBackground}
              blurRadius={20}
            />

            {/* Main Image */}
            <Image
              source={{ uri: url }}
              style={styles.foregroundImage}
              resizeMode="contain"
            />
          </View>
        ))}
      </ScrollView>

      {/* Post Description */}
      <Text style={styles.description}>{post.description}</Text>

      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignContent: "center",
            alignItems: "center",
            padding: 10,
          },
        ]}
      >
        <FontAwesome name="map-marker" size={18} color="green" />
        <Text style={{ paddingHorizontal: 10 }}>{post.location?.name}</Text>
      </View>

      {/* Actions (Like, Comment, Share) */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="heart-o" size={24} color="red" />
          <Text>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="comment-o" size={24} color="black" />
          <Text> {post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="share-square-o" size={24} color="#3D90D7" />
          <Text>{post.shares}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    width: screenWidth,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  blurredBackground: {
    ...StyleSheet.absoluteFillObject,
    width: screenWidth,
    height: 300,
  },
  foregroundImage: {
    width: screenWidth,
    height: 300,
    zIndex: 1,
  },
  fullImage: {
    width: Dimensions.get("window").width,
    height: 300, // or adjust if needed
    backgroundColor: "black", // optional: avoids white bars
  },
  postImageCarousel: {
    width: Dimensions.get("window").width,
    height: 300,
    resizeMode: "cover",
  },
  postContainer: {
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
    backgroundColor: "white",
    paddingTop: 5,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default PostCard;
