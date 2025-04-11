import { doc, getDoc,setDoc,addDoc,arrayRemove,arrayUnion,serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/config/firebaseConfig";
import { Post } from "@/types/postTypes";

/**
 * Fetches all posts saved under the user's document in Firestore.
 *
 * @returns An array of Post objects, or an empty array if none found
 */
export const fetchUserPosts = async (): Promise<Post[]> => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No user is currently authenticated.");
  }

  const userPostsRef = doc(db, "user_posts", user.uid);
  const docSnap = await getDoc(userPostsRef);

  if (!docSnap.exists()) {
    console.log("No posts found for user.");
    return [];
  }

  const data = docSnap.data();
  const posts = (data.posts as Post[]) || [];

  return posts;
};


/**
 * Saves a user-created post to an array field in the user's document (e.g., user_posts/<uid>).
 * Post ID format: <last 5 chars of UID>-<post number>
 */
export const saveUserCreatedPost = async (
  postData: Omit<Post, "id">
): Promise<Post> => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is currently authenticated.");

  const userId = user.uid;
  const uidSuffix = userId.slice(-5);
  const userPostsRef = doc(db, "user_posts", userId);

  // Get the current number of posts to generate ID
  const userDocSnap = await getDoc(userPostsRef);
  const currentPosts = userDocSnap.exists()
    ? (userDocSnap.data().posts as Post[]) || []
    : [];

  const postNumber = currentPosts.length + 1;
  const postId = `${uidSuffix}-${String(postNumber).padStart(3, "0")}`;
  console.log("postId", postId);

  const fullPost: Post = {
    ...postData,
    id: postId,
  };

  console.log("fullPost", fullPost);

  await setDoc(
    userPostsRef,
    {
      posts: arrayUnion(fullPost),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  return fullPost;
};
