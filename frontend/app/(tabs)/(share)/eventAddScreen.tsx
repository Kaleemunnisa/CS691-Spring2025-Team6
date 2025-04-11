import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import TextInputWithIcon from "../(profile)/components/TextInputWithIcon";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import pickImage from "@/utils/image-pickers/PickImage";
import { saveUserCreatedEvent } from "@/services/firebase/userEvents";

type EventKey =
  | "name"
  | "dateTime"
  | "venue"
  | "city"
  | "state"
  | "category"
  | "image";

const UserCreateEventSection = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([
    {
      name: "",
      dateTime: "",
      venue: "",
      city: "",
      state: "",
      category: "",
      image: "",
    },
  ]);

  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeEventIndex, setActiveEventIndex] = useState<number | null>(null);

  const handleAddEvent = () => {
    setEvents([
      ...events,
      {
        name: "",
        dateTime: "",
        venue: "",
        city: "",
        state: "",
        category: "",
        image: "",
      },
    ]);
  };

  const handleRemoveEvent = (index: number) => {
    const updated = [...events];
    updated.splice(index, 1);
    setEvents(updated);
  };

  const updateEvent = (index: number, key: EventKey, value: string) => {
    const updated = [...events];
    updated[index][key] = value;
    setEvents(updated);
  };

  const [currentEventImage, setCurrentEventImage] = useState<any>(null);
  const [eventImageIndex, setEventImageIndex] = useState<number | null>(null);
  const handleAddEventImage = async (index: number) => {
    setEventImageIndex(index);
    setLoading(true);
    await pickImage(setCurrentEventImage, setLoading);
    setLoading(false);
  };

  useEffect(() => {
    if (currentEventImage && !loading && eventImageIndex !== null) {
      console.log("Event image selected:", currentEventImage);
      setEvents((prev) => {
        const updatedEvents = [...prev];
        updatedEvents[eventImageIndex].image = currentEventImage;
        return updatedEvents;
      });

      // Optionally reset the state
      setEventImageIndex(null);
      setCurrentEventImage(null);
    }
  }, [currentEventImage]);
  const onSaveEvent = (eventData: any) => {
    // handle saving this event to Firebase
    console.log("Event data to save:", eventData);
    saveUserCreatedEvent(eventData)
      .then((savedEvent) => {
        console.log("Event saved successfully:", savedEvent);
      })
      .catch((error) => {
        console.error("Error saving event:", error);
      });
  };

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Add Events</Text>
        <TouchableOpacity
          onPress={handleAddEvent}
          style={styles.addEventButton}
        >
          <FontAwesome name="plus" size={15} color="white" />
        </TouchableOpacity>
      </View>

      {events.map((event, index) => (
        <View key={index} style={styles.eventContainer}>
          <TextInputWithIcon
            icon="film"
            label="Event Name"
            value={event.name}
            onChangeText={(text) => updateEvent(index, "name", text)}
          />
          {event.image && (
            <Image source={{ uri: event.image }} style={styles.eventImage} />
          )}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddEventImage(index)}
          >
            <Text style={styles.buttonText}>Pick Event Image</Text>
          </TouchableOpacity>

          <View style={styles.dateTimeRow}>
            <Text style={{ marginRight: 10 }}>Date & Time:</Text>
            <Button
              title={
                event.dateTime
                  ? new Date(event.dateTime).toLocaleDateString()
                  : "Pick Date"
              }
              onPress={() => {
                setPickerMode("date");
                setActiveEventIndex(index);
                setSelectedDate(
                  event.dateTime ? new Date(event.dateTime) : new Date()
                );
                setShowPicker(true);
              }}
            />
            <Button
              title={
                event.dateTime
                  ? new Date(event.dateTime).toLocaleTimeString()
                  : "Pick Time"
              }
              onPress={() => {
                setPickerMode("time");
                setActiveEventIndex(index);
                setSelectedDate(
                  event.dateTime ? new Date(event.dateTime) : new Date()
                );
                setShowPicker(true);
              }}
            />
            {showPicker && activeEventIndex === index && (
              <View style={styles.pickerOverlay}>
                <DateTimePicker
                  style={{ alignSelf: "center" }}
                  value={selectedDate}
                  mode={pickerMode}
                  display="default"
                  minimumDate={new Date()}
                  is24Hour={true}
                  onChange={(event, date) => {
                    if (date) {
                      const updatedDate = new Date(selectedDate);
                      if (pickerMode === "date") {
                        updatedDate.setFullYear(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate()
                        );
                      } else {
                        updatedDate.setHours(date.getHours());
                        updatedDate.setMinutes(date.getMinutes());
                      }
                      setSelectedDate(updatedDate);
                      updateEvent(index, "dateTime", updatedDate.toISOString());
                    }
                    setShowPicker(false);
                  }}
                />
              </View>
            )}
          </View>

          <TextInputWithIcon
            icon="map-pin"
            label="Venue"
            value={event.venue}
            onChangeText={(text) => updateEvent(index, "venue", text)}
          />
          <TextInputWithIcon
            icon="building"
            label="City"
            value={event.city}
            onChangeText={(text) => updateEvent(index, "city", text)}
          />
          <TextInputWithIcon
            icon="map-pin"
            label="State"
            value={event.state}
            onChangeText={(text) => updateEvent(index, "state", text)}
          />
          <TextInputWithIcon
            icon="tag"
            label="Category"
            value={event.category}
            onChangeText={(text) => updateEvent(index, "category", text)}
          />

          {/* <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddEventImage(index)}
          >
            <Text style={styles.buttonText}>Pick Event Image</Text>
          </TouchableOpacity>

          {event.image && (
            <Image source={{ uri: event.image }} style={styles.eventImage} />
          )} */}

          <View style={styles.saveRemoveRow}>
            <TouchableOpacity
              style={styles.savePostButton}
              onPress={() => onSaveEvent(event)}
            >
              <Text style={styles.buttonText}>Save This Event</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.savePostButton, { backgroundColor: "gray" }]}
              onPress={() => handleRemoveEvent(index)}
            >
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default UserCreateEventSection;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
    // width:'100%'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addEventButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  eventContainer: {
    // padding: 15,
    paddingVertical: 20,
    margin: 10,
    borderRadius: 10,
    // backgroundColor: "#f5f5f5",
  },
  dateTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  addButton: {
    backgroundColor: "#78B7D0",
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  savePostButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  saveRemoveRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  eventImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  pickerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 10,
    justifyContent: "center",
    zIndex: 1000,
    padding: 20,
    alignSelf: "center",
  },
});
