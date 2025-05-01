import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import { BusinessData } from "@/types/types";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { getAuth } from "firebase/auth";

type Props = {
  business: BusinessData;
};

const BusinessCard: React.FC<Props> = ({ business }) => {
  const [expanded, setExpanded] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [bookingName, setBookingName] = useState("");
  const [bookingCount, setBookingCount] = useState("");

  const auth = getAuth();
  const user = auth.currentUser; // Access the current user directly from auth

  const handleBook = async () => {
    if (!user) {
      alert("Please log in to book an appointment.");
      return;
    }

    const appointment = {
      bookingId: Date.now().toString(),
      businessId: business.id,
      bookingName,
      dateTime: selectedDate.toISOString(),
      count: Number(bookingCount),
    };

    try {
      if (!business.id) {
        throw new Error("Business ID is undefined.");
      }
      const businessRef = doc(db, "businesses", business.id);
      const userRef = doc(db, "appointments", user.uid);

      // Update business's appointments with the new booking
      await setDoc(
        businessRef,
        {
          appointments: {
            [appointment.bookingId]: appointment,
          },
        },
        { merge: true }
      );

      // Update user's appointments collection with the new booking
      await setDoc(
        userRef,
        {
          appointments: {
            [appointment.bookingId]: appointment,
          },
        },
        { merge: true }
      );

      alert("Appointment booked successfully!");
      setBookingName("");
      setBookingCount("");
    } catch (err) {
      console.error("Booking failed", err);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <TouchableOpacity
      onPress={() => setExpanded(!expanded)}
      style={styles.cardContainer}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        {business.profilePicture && (
          <Image
            source={{ uri: business.profilePicture }}
            style={styles.profilePic}
          />
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{business.name}</Text>
          <Text style={styles.email}>{business.email}</Text>
          <Text style={styles.location}>
            {business.location.city}, {business.location.state}
          </Text>
        </View>
      </View>

      {expanded && (
        <View style={styles.details}>
          <Text style={styles.detailText}>City: {business.location.city}</Text>
          <Text style={styles.detailText}>
            State: {business.location.state}
          </Text>
          <Text style={styles.detailText}>
            Country: {business.location.country}
          </Text>

          <Text style={styles.imageGalleryTitle}>Gallery:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {business.images.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img.public_id }}
                style={styles.galleryImage}
              />
            ))}
          </ScrollView>

          <Text style={styles.imageGalleryTitle}>Book Appointment</Text>
          <TextInput
            placeholder="Booking Name"
            value={bookingName}
            onChangeText={setBookingName}
            style={styles.input}
          />
          <TextInput
            placeholder="Number of People"
            value={bookingCount}
            onChangeText={setBookingCount}
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={styles.dateTimeRow}>
            <Button
              title={selectedDate.toLocaleDateString()}
              onPress={() => {
                setPickerMode("date");
                setShowPicker(true);
              }}
            />
            <Button
              title={selectedDate.toLocaleTimeString()}
              onPress={() => {
                setPickerMode("time");
                setShowPicker(true);
              }}
            />
          </View>
          {showPicker && (
            <DateTimePicker
              value={selectedDate}
              mode={pickerMode}
              display="default"
              minimumDate={new Date()}
              is24Hour={true}
              onChange={(event, date) => {
                if (date) {
                  const updated = new Date(selectedDate);
                  if (pickerMode === "date") {
                    updated.setFullYear(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate()
                    );
                  } else {
                    updated.setHours(date.getHours());
                    updated.setMinutes(date.getMinutes());
                  }
                  setSelectedDate(updated);
                }
                setShowPicker(false);
              }}
            />
          )}
          <TouchableOpacity style={styles.bookBtn} onPress={handleBook}>
            <Text style={styles.buttonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default BusinessCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  location: {
    fontSize: 13,
    color: "#999",
  },
  details: {
    marginTop: 10,
  },
  detailText: {
    fontSize: 14,
    marginVertical: 2,
  },
  imageGalleryTitle: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  galleryImage: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  dateTimeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  bookBtn: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
