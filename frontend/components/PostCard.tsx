import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchPaginatedPosts } from "@/services/firebase/postsFeed"; // Adjust as per your function
import { PostDisplay } from "@/types/types"; // Your PostDisplay interface

const PostCard = ({ post }: { post: PostDisplay }) => {
  return (
    <View style={styles.postContainer}>
      {/* User Info */}
      <View style={styles.userInfo}>
        <Image source={{ uri: post.userImage }} style={styles.profileImage} />
        <Text style={styles.userName}>{post.userName}</Text>
      </View>

      {/* Post Image */}
      <Image source={{ uri: post.imageUrls[0] }} style={styles.postImage} />

      {/* Post Description */}
      <Text style={styles.description}>{post.description}</Text>

      {/* Actions (Like, Comment, Share) */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text>👍 {post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text>💬 {post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text>🔄 {post.shares}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FeedScreen = () => {
  const [posts, setPosts] = useState<PostDisplay[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch posts when the page number changes
  useEffect(() => {
    if (!loading) {
      setLoading(true);
      fetchPaginatedPosts(page).then((newPosts: PostDisplay[]) => {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setLoading(false);
      });
    }
  }, [page]);

  // Handle infinite scrolling (load more posts when scrolled to the bottom)
  const handleEndReached = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostCard post={item} />}
      keyExtractor={(item) => item.postId}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5} // Trigger when 50% from the bottom
      // ListFooterComponent={loading && <Text>Loading more...</Text>}
    />
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
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

export default FeedScreen;
