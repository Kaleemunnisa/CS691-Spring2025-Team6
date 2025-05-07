import { Stack, Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Entypo,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
// import { primaryBtnColor } from "../(auth)/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#82C0D0",
        // tabBarActiveTintColor: "#3E5879",
        headerStyle: {
          backgroundColor: "transparent",
        },

        headerShadowVisible: false,
        headerTintColor: "#3E5879",
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,

          paddingTop: 10,

          // Increase height
          paddingHorizontal: 5, // Adjust padding for centering items
          paddingBottom: 10,

          borderTopWidth: 0, // Remove default border line at the top
          elevation: 0, // Android shadow
          // shadowColor: 'white', // iOS shadow
          // shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(chat)"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="chat"
              size={24}
              color={focused ? color : "gray"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(share)"
        options={{
          title: "Share",
          tabBarIcon: ({ color, focused }) => (
            <Feather name="share" size={24} color={focused ? color : "gray"} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(feed)"
        options={{
          title: "Feed",
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="images" size={24} color={focused ? color : "gray"} />
          ),
        }}
      />

      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="user-alt"
              size={24}
              color={focused ? color : "gray"}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
