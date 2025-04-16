import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { PostDisplay } from "@/types/types"; // Adjust as needed
import { db, auth } from "@/config/firebaseConfig"; // Adjust as needed

// const db = getFirestore();

// Cache to prevent multiple lookups of the same user
const userCache: Record<string, { userName: string; userImage: string }> = {};

export const fetchPaginatedPosts = async (
  page: number = 1,
  pageSize: number = 10
): Promise<PostDisplay[]> => {
  try {
    const snapshot = await getDocs(collection(db, "user_posts"));

    let allPosts: PostDisplay[] = [];

    for (const postDoc of snapshot.docs) {
      const userId = postDoc.id;
      const postArray = postDoc.data().posts || [];

      // Lazy load user profile data (from cache or Firestore)
      if (!userCache[userId]) {
        const userInfoDoc = await getDoc(doc(db, "users", userId));
        if (userInfoDoc.exists()) {
          const userData = userInfoDoc.data();
          userCache[userId] = {
            userName: userData.userName || "Unknown",
            userImage: userData.profilePicture || "",
          };
        } else {
          userCache[userId] = { userName: "Unknown", userImage: "" };
        }
      }

      const { userName, userImage } = userCache[userId];

      const formattedPosts: PostDisplay[] = postArray.map((post: any) => ({
        postId: post.id,
        imageUrls: post.imageUrls,
        taggedUsers: post.taggedUsers,
        description: post.description,
        location: post.location || null,
        createdAt: post.createdAt || "", // Ensure it's ISO string or add logic if it's a timestamp
        userId,
        userName,
        userImage,
      }));

      allPosts.push(...formattedPosts);
    }

    // Sort by createdAt descending
    allPosts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Paginate
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    console.log("Paginated posts:", allPosts.slice(start, end));
    return allPosts.slice(start, end);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
