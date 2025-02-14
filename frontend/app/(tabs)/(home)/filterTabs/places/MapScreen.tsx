import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Map from "./Map"; // Adjust path based on your folder structure
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { fetchFoodPlaces } from "@/app/api/fetchFoodPlaces";
import { fetchEntertainmentPlaces } from "@/app/api/fetchEntertainmentPlaces";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

interface Category {
  id: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}
const categories: Category[] = [
  { id: "restaurant", icon: "restaurant" },
  { id: "local-entertainment", icon: "local-movies" },
  // Add other categories here
];
interface mapScreenProps {
  city_id: string;
  lat: number;
  lon: number;
}
const MapScreen: React.FC<mapScreenProps> = ({ city_id, lat, lon }) => {
  const [categorySelected, setCategorySelected] = useState(categories[0].id);
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View>
      <View style={{ position: "relative" }}>
        {categorySelected === categories[0].id && (
          <Map
            lat={lat}
            lon={lon}
            placesFunction={fetchFoodPlaces}
            city_id={city_id}
            iconColor="violet"
          />
        )}

        {categorySelected === categories[1].id && (
          <Map
            lat={lat}
            lon={lon}
            placesFunction={fetchEntertainmentPlaces}
            city_id={city_id}
            iconColor="red"
          />
        )}
      </View>
      <View style={styles.placeCategories}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryIcon,
              categorySelected === category.id && styles.selectedCategory, // Change style on selection
            ]}
            onPress={() => setCategorySelected(category.id)}
          >
            <MaterialIcons
              name={category.icon}
              size={18}
              color="white"
              style={[categorySelected === category.id && { color: "#4A628A" }]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  categoryIcon: {
    width: 35,
    height: 35,
    backgroundColor: "#23486A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 5, // Spacing between icons
  },

  placeCategories: {
    position: "absolute",
    // top: 20,
    top: 20,
    left: 20,
    borderRadius: 10,
    elevation: 5,
  },
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  selectedCategory: {
    backgroundColor: "white", // Highlighted color when selected
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5, // Required for Android shadow
  },
});
