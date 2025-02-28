import { Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Text, View } from "react-native";

export default function HomeLayout() {
  return (
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
