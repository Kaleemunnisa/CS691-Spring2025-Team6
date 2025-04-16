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
import PostCard from "./components/PostCard";
import { SafeAreaView } from "react-native-safe-area-context";

// const FeedScreen = () => {
//   const [posts, setPosts] = useState<PostDisplay[]>([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // Fetch posts when the page number changes
//   useEffect(() => {
//     if (!loading) {
//       setLoading(true);
//       fetchPaginatedPosts(page).then((newPosts: PostDisplay[]) => {
//         setPosts((prevPosts) => [...prevPosts, ...newPosts]);
//         setLoading(false);
//       });
//     }
//   }, [page]);

//   // Handle infinite scrolling (load more posts when scrolled to the bottom)
//   const handleEndReached = () => {
//     if (!loading) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   return (
//     <FlatList
//       data={posts}
//       renderItem={({ item }) => <PostCard post={item} />}
//       keyExtractor={(item) => item.postId}
//       onEndReached={handleEndReached}
//       onEndReachedThreshold={0.5} // Trigger when 50% from the bottom
//       // ListFooterComponent={loading && <Text>Loading more...</Text>}
//     />
//   );
// };

const FeedScreen = () => {
  const [posts, setPosts] = useState<PostDisplay[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = async (pageToLoad = 1, reset = false) => {
    if (loading) return;

    setLoading(true);
    const fetchedPosts = await fetchPaginatedPosts(pageToLoad);

    setPosts((prevPosts) => {
      if (reset) return fetchedPosts;

      const existingIds = new Set(prevPosts.map((post) => post.postId));
      const newUniquePosts = fetchedPosts.filter(
        (post) => !existingIds.has(post.postId)
      );
      return [...prevPosts, ...newUniquePosts];
    });

    setLoading(false);
  };

  useEffect(() => {
    loadPosts(page);
  }, [page]);

  const handleEndReached = () => {
    if (!loading && !refreshing) {
      setPage((prevPage) => prevPage + 1); // increment by 1
    }
  };

  const handleRefresh = async () => {
    // console.log("Refreshing", refreshing);
    setRefreshing(true);
    setPage(1);
    await loadPosts(1, true); // reset to first page
    setRefreshing(false);
  };

  return (
    <FlatList
      data={[...posts].reverse()}
      renderItem={({ item }) => <PostCard post={item} />}
      keyExtractor={(item) => item.postId}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  );
};

const styles = StyleSheet.create({});

export default FeedScreen;
