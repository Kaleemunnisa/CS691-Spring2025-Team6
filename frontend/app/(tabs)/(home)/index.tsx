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
// import { fetchEvents } from "../../api/fetchEvents";
import { fetchEvents } from "@/services/api/fetchEvents";
import BackGround from "./BackGround";
import FilterTabBar from "./filterTabs/FilterTabBar";
import InputSection from "./inputSection/InputSection";
import KeyboardAvoidingContainer from "@/utils/keyBoard_utilities/KeyboardAvoidingContainer";
// import auth from "@react-native-firebase/auth";
import { getUserFavorites } from "@/services/firebase/favourites";
import auth from "@react-native-firebase/auth";

export default function HomeScreen() {
  const [placeID, setPlaceID] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  // Events from the entered city_id
  const [cityEvents, setCityEvents] = useState<any[]>([]);
  const [userFavorites, setUserFavorites] = useState<any[] | null>(null);

  const [otherEvents, setOtherEvents] = useState<Record<string, any[]>>({}); // Events grouped by genre
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedGenre, setExpandedGenre] = useState<string | null>(null); // Track expanded genre for "See More"
  const tabBarHeight = useBottomTabBarHeight(); // Get the height of the bottom tab bar

  const [showContent, setShowContent] = useState(false);

  const [noEvents, setNoEvents] = useState(false);

  const [userUid, setUserUid] = useState("");

  const clearEvents = () => {
    setPlaceID("");
    setCity("");
    setCountry("");
    setCityEvents([]);
    setOtherEvents({});
    setExpandedGenre(null);
    setShowContent(false);
  };

  useEffect(() => {
    console.log(`${cityEvents} city events....`);
    let cityEventsLength: any = cityEvents.length;
    console.log({ cityEventsLength });
    console.log(cityEvents);
    setNoEvents(() => cityEventsLength === 0);
    console.log("city_id->>>>>", placeID);
    console.log(otherEvents);
  }, [cityEvents]);

  //getCurrentUserUid
  const getCurrentUserUid = async () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUserUid(currentUser.uid);
    }
  };

  //fetch saved user events

  //changing the userdata
  useEffect(() => {
    getCurrentUserUid().then((uid) => {
      console.log("Current User UID:", uid);
    });
    console.log("User UID:", userUid);
  }, []);

  const fetchFavorites = async () => {
    const favoriteData = await getUserFavorites(userUid).then((data) => {
      if (data) {
        setUserFavorites(data.events); // Assuming `events` is an array of favorite events  // Assuming `events` is an array of favorite events // Assuming `events` is an array of favorite events     // Assuming `events` is an array of favorite events
      }
    });
  };

  // useEffect(() => {
  //   if (userUid) {
  //     fetchFavorites();
  //   }
  //   console.log("favourties", userFavorites);
  //   console.log("shouldFetchFavorites", userFavorites);
  // }, [userUid]);
  //to fetch the recommended events
  // useEffect(() => {
  //   const sendRecommendationRequest = async (
  //     fetchedEvents: any,
  //     favoriteEvents: any
  //   ) => {
  //     const requestBody = {
  //       fetched_events: fetchedEvents,
  //       favorite_events: favoriteEvents,
  //     };

  //     try {
  //       const response = await fetch("http://127.0.0.1:8000/recommend", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(requestBody),
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log("Recommendations:", data.recommendations);
  //         return data.recommendations;
  //       } else {
  //         console.error("Error fetching recommendations:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  //   console.log(cityEvents.length, userFavorites?.length);
  //   if (cityEvents.length > 0 && userFavorites && userFavorites.length > 0) {
  //     sendRecommendationRequest(cityEvents, userFavorites).then((data) => {
  //       setRecommendations(data);
  //     });
  //   }
  // }, [cityEvents, userFavorites]);

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
        setShowContent={setShowContent}
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
