import { Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Text, View } from "react-native";

export default function HomeLayout() {
  return (
    // <Drawer
    // screenOptions={{

    // }}>
    //   <Drawer.Screen
    //     name="index" // This corresponds to the file name `index.js` or `index.tsx`
    //     options={{
    //       title: 'Home',
    //     }}
    //   />
    //   <Drawer.Screen
    //     name="profile" // This corresponds to the file name `profile.js` or `profile.tsx`
    //     options={{
    //       title: 'Profile',
    //     }}
    //   />
    //   <Drawer.Screen
    //     name="settings" // This corresponds to the file name `settings.js` or `settings.tsx`
    //     options={{
    //       title: 'Settings',
    //     }}
    //   />
    // </Drawer>
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="index" /> */}
      <Stack.Screen name="index" />
    </Stack>
  );
}
