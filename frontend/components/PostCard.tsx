import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Post, Location } from "@/types/postTypes"; // Adjust import path as needed

type Props = {
  post: Post;
};

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <View style={styles.card}>
      {/* Image Carousel */}
      <FlatList
        horizontal
        data={post.imageUrls}
        keyExtractor={(item, index) => `${post.id}-img-${index}`}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        showsHorizontalScrollIndicator={false}
        pagingEnabled // Makes images swipeable like Instagram carousel
      />

      <View style={{ height: 10, justifyContent: "flex-start" }} />
      {/* Description */}
      <Text style={styles.description}>{post.description}</Text>

      {/* Location */}
      {post.location && (
        <Text style={styles.location}>📍 {post.location.name}</Text>
      )}

      {/* Tagged Users */}
      {post.taggedUsers.length > 0 && (
        <Text style={styles.tagged}>Tagged: {post.taggedUsers.join(", ")}</Text>
      )}
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    // borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    // marginHorizontal: 16,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    // elevation: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    alignSelf: "center",
    justifyContent: "center",
    minWidth: 300,
    width: 300, // Full width of the screen minus some padding
    height: 400, // Adjustable height
    marginRight: 8,
    // borderRadius: 10,
    resizeMode: "cover", // Ensures images cover the area without distortion
  },
  description: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "500",
    color: "#333", // Darker text for readability
  },
  location: {
    marginTop: 6,
    fontSize: 14,
    color: "#666", // Lighter color for location text
  },
  tagged: {
    marginTop: 6,
    fontSize: 14,
    color: "#888", // Lighter color for tagged users
    fontStyle: "italic",
  },
});

export default PostCard;
