import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
// import { fetchEvents } from "../api/fetchEvents";
import { fetchEvents } from "@/app/api/fetchEvents";
import useKeyboardStatus from "@/app/keyBoard_utilities/KeyboardStatus";

// import { fetchCitySuggestions } from "../api/fetchCitySuggestions";
import { fetchCitySuggestions } from "@/app/api/fetchCitySuggestions";

// import { fetchCitySuggestions } from "../api/fetchCitySuggestions";

function InputSection({
  showContent,
  setPlaceID,
  setLon,
  setLat,
  city,
  setCity,
  
  setState,
stateCode,
  setStateCode,
  // country,
  // setCountry,
  setLoading,
  setCountry,
  countryCode,
  setCountryCode,
  setCityEvents,
  setOtherEvents,
  clearEvents,
  fetchEvents,
  cityEvents,
}) {
  const [changeToClear, setChangeToClear] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const isKeyboardVisible = useKeyboardStatus();

  
  
  
  useEffect(() => {
    setChangeToClear(cityEvents.length > 0);
  }, [cityEvents]);

  const handleTextChange = (text) => {
    setCity(text);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (city.trim().length > 0) {
        const fetchedSuggestions = await fetchCitySuggestions(city);

        // Remove duplicates based on city, state, and country
        const uniqueSuggestions = fetchedSuggestions.filter(
          (item, index, self) =>
            index ===
            self.findIndex(
              (t) =>
                t.placeID===item.placeID&&
                t.city === item.city &&
                t.state === item.state &&
                t.stateCode === item.stateCode &&
                t.country === item.country &&
                t.countryCode === item.countryCode
            )
        );

        setSuggestions(uniqueSuggestions);
        setShowSuggestions(true); // Show suggestions when updated
      } else {
        setSuggestions([]); // Clear suggestions if input is empty
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [city]); // Runs every time city is updated

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  // console.log(keyboardHeight);

  return (
    <>
      {showSuggestions && suggestions.length > 0 && !showContent && (
        <View style={styles.suggestionsWrapper}>
          <ScrollView
            style={styles.suggestionsContainer}
            keyboardShouldPersistTaps="handled"
          >
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => {
                  setPlaceID(suggestion.placeID);
                  setLon(suggestion.lon);
                  setLat(suggestion.lat);
                  setCity(suggestion.city);
                  setState(suggestion.state);
                  setStateCode(suggestion.stateCode);
                  setCountry(suggestion.country);
                  setCountryCode(suggestion.countryCode);

                  setShowSuggestions(false);
                }}
              >
                <Text style={styles.suggestionText}>
                  {suggestion.city}, {suggestion.stateCode},{" "}
                  {suggestion.countryCode}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.customizedSafeAreaHeader,
            isKeyboardVisible &&
              !showContent && [
                styles.keyBoardisActiveInputStyle,
                { height: keyboardHeight + 50 },
              ],
          ]}
        >
          <View style={styles.inputSection}>
            {!showContent && (
              <TextInput
                style={[styles.textInput]}
                placeholder="Enter city name"
                value={city}
                placeholderTextColor={"#23486A"}
                onChangeText={handleTextChange}
                onFocus={() => setShowSuggestions(true)}
              />
            )}

            {showContent && <Text style={styles.cityName}>{city}</Text>}

            <View style={styles.buttonContainer}>
              {changeToClear ? (
                <TouchableOpacity
                  style={[styles.button, styles.clearButton]}
                  onPress={clearEvents}
                >
                  <Text style={styles.clrText}>Clear</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    fetchEvents(
                      city,
                      stateCode,
                      countryCode,
                      setLoading,
                      setCityEvents,
                      setOtherEvents
                    );

                    setShowSuggestions(false);
                  }}
                >
                  <Text style={styles.buttonText}>Let's Go</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

export default InputSection;

const styles = StyleSheet.create({
  suggestionsWrapper: {
    maxHeight: 200, // Restrict height to avoid overlapping the entire screen
  },
  suggestionsContainer: {
    maxWidth: 400,
    width: "90%",
    marginHorizontal: "auto",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    maxHeight: 200, // Limit height for scroll
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  suggestionText: {
    fontSize: 16,
    color: "#333",
  },
  keyBoardisActiveInputStyle: {
    // height: "40%",
    marginTop: "20",
    justifyContent: "flex-start",
  },

  cityName: {
    flex: 1,
    justifyContent: "center", // Centers content vertically
    // alignItems: "center", // Centers content horizontally
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    // backgroundColor: "#23486A", // Set background to black
    color: "white", // Ensure text is visible on black background
    paddingVertical: 10, // Add vertical padding
    // paddingHorizontal: 15, // Add horizontal padding
    borderRadius: 10, // Rounded corners
    height: "100%",
    color: "#23486A",
    borderBottomWidth: 2,
  },
  customizedSafeAreaHeader: {
    marginTop: "35%",
    paddingHorizontal: 40,
    backgroundColor: "white",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingVertical: 40,
    paddingBottom: 25,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    // height: "",
  },
  inputSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 40,
    // position: "absolute",
  },
  textInputContainer: {
    flex: 1,
    position: "absolute",
    flex: 1,
    width: "100%",
    bottom: 300,
  },
  textInput: {
    minHeight: "40",
    height: "100%",
    fontSize: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    flex: 1,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    height: "100%",
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#23486A",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 110,
    maxWidth: 120,
  },
  clearButton: {
    backgroundColor: "#7E99A3",
  },
  clrText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  suggestionList: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    maxHeight: 150,
    zIndex: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  suggestionText: {
    fontSize: 14,
    color: "#23486A",
  },
});
