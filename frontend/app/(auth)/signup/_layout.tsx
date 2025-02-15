import { Stack } from "expo-router";

export default function SignupLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="SignUpForm" />
    </Stack>
  );
}
