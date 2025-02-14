import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import PlaceCard from "./PlaceCard"; // Your place details component
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faUser, faBurger } from "@fortawesome/free-solid-svg-icons";
import BouncingIcon from "@/app/iconHelpers/BouncingIcons";
// import { BouncingIcon } from "@/app/iconHelpers/BouncingIcons";
// import ApiKeys from "@/app/api/ApiKeys";
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
interface MapProps {
  iconColor: string;
  city_id: string;
  lat: number;
  lon: number;
  placesFunction: (city_id: string) => Promise<any>;
}
const Map: React.FC<MapProps> = ({
  placesFunction,
  iconColor,
  city_id,
  lat,
  lon,
}) => {
  //const API_KEY = "ea9de81252614d3099df3bea0483f020"; // Replace with your actual API key
  // const CITY_ID =
  // "514da3c9c5986f58c059a10216af68453e40f00101f901a2ba010000000000c00208"; // Example city ID

  const [places, setPlaces] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);
  const [region, setRegion] = useState({
    latitude: lat,
    longitude: lon,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  });

  // Fetch places from API
  useEffect(() => {
    const fetchPlaces = async () => {
      const fetchedPlaces = await placesFunction(city_id);
      setPlaces(fetchedPlaces);
    };

    fetchPlaces();
  }, [places]);

  const onMarkerPress = (place: any) => {
    setSelectedPlace(place);
  };

  // Handle zoom in
  const zoomIn = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: Math.max(0.05, prevRegion.latitudeDelta - 0.05),
      longitudeDelta: Math.max(0.05, prevRegion.longitudeDelta - 0.05),
    }));
  };

  // Handle zoom out
  const zoomOut = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta + 0.05,
      longitudeDelta: prevRegion.longitudeDelta + 0.05,
    }));
  };

  // Function to choose dynamic icon based on place category
  const getIconForCategory = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.icon : "restaurant"; // Default to "restaurant" if not found
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {places.map((place, index) => {
          const categoryId = place.properties?.category ?? "restaurant"; // Default category
          const iconName = getIconForCategory(categoryId);
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: place.geometry.coordinates[1],
                longitude: place.geometry.coordinates[0],
              }}
              onPress={() => onMarkerPress(place)}
              pinColor={iconColor}
            >
              {/* Dynamically set icon based on category */}
            </Marker>
          );
        })}
      </MapView>

      {selectedPlace?.properties && (
        <View style={styles.placeDetails}>
          <PlaceCard
            place={selectedPlace}
            onMarkerPress={onMarkerPress}
            onClose={() => {
              setSelectedPlace(null);
            }}
          />
        </View>
      )}

      <View style={styles.zoomButtons}>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
          <Text style={styles.zoomText}>-</Text>
        </TouchableOpacity>
      </View>

      {/* place categories */}
    </View>
  );
};

const styles = StyleSheet.create({
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

  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  placeDetails: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    borderRadius: 10,
    elevation: 5,
  },
  zoomButtons: {
    position: "absolute",
    // bottom: 20,
    right: 10,
    borderRadius: 10,
    backgroundColor: "#4A628A",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5, // Required for Android shadow
  },

  zoomButton: {
    borderRadius: 10,
    width: 30,
    height: 30,

    backgroundColor: "#4A628A",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  zoomText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Map;
