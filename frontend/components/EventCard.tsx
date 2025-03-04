import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import {
  saveUserFavorite,
  removeUserFavorite,
} from "@/services/firebase/favourites";

interface EventCardProps {
  event: any;
  uid?: string; // User ID (optional)
  showFavorite?: boolean; // Controls whether favorite button is shown
  setShouldFetchFavorites?:any;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  uid,
  showFavorite = false,
    setShouldFetchFavorites,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);


  const checkFavoriteStatus = async () => {
    // @ts-ignore
    const userRef = doc(db, "user_favorites", uid);
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (
            userData?.events?.some(
                (savedEvent: any) => savedEvent.id === event.id
            )
        ) {
          setIsFavorite(true);
          console.log(isFavorite);
        }
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };
  useEffect(() => {
    console.log(uid);
    if (!showFavorite || !uid || !event.id) return;

    checkFavoriteStatus();
  }, [uid, event, showFavorite]);

  const handleFavoriteToggle = async () => {
    if (!uid) return;

    if (isFavorite) {
      await removeUserFavorite(uid, event.id);
    } else {
      await saveUserFavorite(uid, event);
    }
    setIsFavorite(!isFavorite);
    setShouldFetchFavorites(true);
  };

  return (
    <View style={styles.eventCard}>
      {event.image && (
        <Image source={{ uri: event.image }} style={styles.eventImage} />
      )}
      <Text style={styles.eventTitle}>{event.name}</Text>
      <Text style={styles.eventDetails}>📅 {event.dateTime}</Text>
      <Text style={styles.eventDetails}>
        📍 {event.venue}, {event.city}, {event.state}
      </Text>
      <Text style={styles.eventCategory}>🎟️ {event.category}</Text>

      {/* Favorite Button (Only if showFavorite is true) */}
      {showFavorite && uid && (
        <TouchableOpacity
          onPress={handleFavoriteToggle}
          style={styles.favoriteButton}
        >
          <FontAwesome
            name={isFavorite ? "heart" : "heart-o"}
            size={24}
            color="red"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    minWidth:320,
    maxWidth:360,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventDetails: {
    fontSize: 14,
    color: "#555",
  },
  eventCategory: {
    fontSize: 14,
    color: "#888",
    marginVertical: 5,
  },
  eventImage: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    marginTop: 5,
  },
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    position: "absolute",
    right: 0,
    bottom: 0,
    padding: 10,
    zIndex: 10,
  },
  favoriteButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: "blue",
  },
});

export default EventCard;
