import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import EventCard from "./events/Events";
// import MapScreen from "./places/MapScreen";
// import PlaceListScreen from "./places/PlaceListScreen";
// import Map from "./places/Map";
import MapScreen from "./places/MapScreen";

const OutlinedButton = ({ title, onPress, isActive, activeColor }) => (
  <TouchableOpacity
    style={[
      styles.outlinedButton,
      isActive ? { backgroundColor: activeColor } : styles.unfocusedButton,
    ]}
    onPress={onPress}
  >
    <Text style={[styles.buttonText, isActive && styles.activeButtonText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const FilterTabBar = ({ placeID, lon, lat, city, cityEvents, otherEvents }) => {
  const [activeTab, setActiveTab] = useState("Events");
  console.log("FilterTabBar");
  console.log("cityEvents inside FilterTabBar:", cityEvents.length);
  console.log("otherEvents inside FilterTabBar:", otherEvents.length);
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.buttonContainerParent}>
      <View
        style={[
          styles.buttonContainer,
          {
            borderBottomColor:
              activeTab === "Events"
                ? "#A5D6A7"
                : activeTab === "Places"
                ? "#95b0ed"
                : activeTab === "More"
                ? "#90CAF9"
                : "#E0E0E0",
          },
        ]}
      >
        <OutlinedButton
          title="Events"
          onPress={() => setActiveTab("Events")}
          isActive={activeTab === "Events"}
          activeColor="#A5D6A7"
        />
        <OutlinedButton
          title="Places"
          onPress={() => setActiveTab("Places")}
          isActive={activeTab === "Places"}
          activeColor="#95b0ed"
        />
        <OutlinedButton
          title="More"
          onPress={() => setActiveTab("More")}
          isActive={activeTab === "More"}
          activeColor="#90CAF9"
        />
      </View>

      {/* Content Display */}
      <View style={[styles.contentContainer]}>
        {activeTab === "Events" &&
          (cityEvents.length === 0 ? (
            <Text>Loading Events...</Text>
          ) : (
            <View>
              <EventCard
                city={city}
                cityEvents={cityEvents}
                otherEvents={otherEvents}
              />
            </View>
          ))}
        {activeTab === "Places" && (
          <View style={styles.mapContentetContainer}>
            <MapScreen city_id={placeID} lat={lat} lon={lon} />
          </View>
        )}
        {activeTab === "More" && <Text>Showing More Content</Text>}
      </View>
    </View>
  );
};

export default FilterTabBar;

const styles = StyleSheet.create({
  buttonShodow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5, // Required for Android shadow
  },
  buttonContainerParent: {
    position: "relative",
    backgroundColor: "white", // Light Grey Background
    padding: 10,
    flex: 1,
  },
  buttonContainer: {
    position: "relative",
    paddingBottom: 0,
    borderBottomWidth: 3,
    borderBottomColor: "white", // Light Grey Background
    marginTop: 10,
    maxWidth: 500,
    flexDirection: "row",
    justifyContent: "space-between",
    // borderBottomWidth: 1,
    // borderBottomColor: "#E0E0E0", // Light Grey Border
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: "white", // Neutral Grey Border
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
    fontWeight: "bold",
    position: "relative",
  },
  unfocusedButton: {
    backgroundColor: "white", // Light Grey for all buttons when unfocused
  },
  buttonText: {
    color: "#000",
  },
  activeButtonText: {
    color: "#424242", // Darker text for contrast when focused
    fontWeight: "bold",
  },
  contentContainer: {
    marginTop: 20,
    padding: 10,
    width: "100%",
    height: "100%",
  },
  mapContentetContainer: {
    height: "90%",
    width: "100%",
  },
});
