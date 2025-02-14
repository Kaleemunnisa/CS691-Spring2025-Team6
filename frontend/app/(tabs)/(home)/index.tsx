import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  SafeAreaView,
  Animated,
  Platform,
} from "react-native";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
// import EventCard from "./EventCard";
import { fetchEvents } from "../../api/fetchEvents";
import BackGround from "./BackGround";
import FilterTabBar from "./filterTabs/FilterTabBar";
import InputSection from "./inputSection/InputSection";
import KeyboardAvoidingContainer from "@/app/keyBoard_utilities/KeyboardAvoidingContainer";

export default function HomeScreen() {
  const [placeID, setPlaceID] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [cityEvents, setCityEvents] = useState<any[]>([]);
  // Events from the entered city
  const [otherEvents, setOtherEvents] = useState<Record<string, any[]>>({}); // Events grouped by genre
  const [loading, setLoading] = useState(false);
  const [expandedGenre, setExpandedGenre] = useState<string | null>(null); // Track expanded genre for "See More"
  const tabBarHeight = useBottomTabBarHeight(); // Get the height of the bottom tab bar

  const [showContent, setShowContent] = useState(false);

  const clearEvents = () => {
    setPlaceID("");
    setCity("");
    setCountry("");
    setCityEvents([]);
    setOtherEvents({});
    setExpandedGenre(null);
  };

  useEffect(() => {
    console.log(`${cityEvents} city events....`);
    let cityEventsLength: any = cityEvents.length;
    console.log({ cityEventsLength });
    console.log(cityEvents);
    setShowContent(() => cityEventsLength > 0);
    console.log("city_id->>>>>", placeID);
    console.log(otherEvents);
  }, [cityEvents]);

  return (
    <View style={[styles.safeArea, { bottom: tabBarHeight }]}>
      <BackGround loading={loading} />

      <InputSection
        setPlaceID={setPlaceID}
        setLat={setLat}
        setLon={setLon}
        city={city}
        setCity={setCity}
        // country={country}
        setState={setState}
        stateCode={stateCode}
        setStateCode={setStateCode}
        setCountry={setCountry}
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        fetchEvents={fetchEvents}
        setCityEvents={setCityEvents}
        setOtherEvents={setOtherEvents}
        setLoading={setLoading}
        clearEvents={clearEvents}
        showContent={showContent}
        cityEvents={cityEvents}
      />

      {/* Scrollable Content Section */}

      {showContent && (
        <FilterTabBar
          placeID={placeID}
          lon={lon}
          lat={lat}
          city={city}
          cityEvents={cityEvents}
          otherEvents={otherEvents}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // filterContainer: {
  // //  backgroundColor: "red", // 🔴 Red background
  //   paddingVertical: 15, // Add some padding
  //   // marginTop: 20, // Space below input section
  //   // marginBottom: 20, // Space above EventCard
  //   // borderRadius: 10, // Rounded edges
  //   alignItems: "center", // Center horizontally
  //   justifyContent: "center", // Center vertically
  //   width: "100%", // Responsive width
  //   alignSelf: "center", // Center on the screen
  // },

  safeArea: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "flex-end", //edited to flex-start correct is flex-end
  },

  buttonContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
