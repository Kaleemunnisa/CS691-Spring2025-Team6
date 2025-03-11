import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
      {/* <Stack.Screen name="(profile)" /> */}
    </Stack>
  );
}
// import { useEffect, useState } from "react";
// import { View, ActivityIndicator } from "react-native";
// import { Stack, useRouter } from "expo-router";
// import { auth } from "@/config/firebaseConfig"; // Adjust path if needed
// import { onAuthStateChanged } from "firebase/auth";
// import LoginScreen from "./(auth)/login"; // Adjust path if needed

// export default function RootLayout() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState<any | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
//       setUser(authenticatedUser);
//       console.log("User: ", authenticatedUser);
//       setLoading(false);
//     });

//     return () => unsubscribe(); // Cleanup subscription
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#82C0D0" />
//       </View>
//     );
//   }

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       {user != null ? <Stack.Screen name="(tabs)" /> : <LoginScreen />}
//     </Stack>
//   );
// }
