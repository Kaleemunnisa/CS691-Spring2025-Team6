import React, { useState } from "react";

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

// // Define TypeScript interfaces for props
// interface Event {
//   image?: string;
//   name: string;
//   dateTime: string;
//   venue: string;
//   city: string;
//   state: string;
//   category: string;
// }

interface EventCardProps {
  city: string;
  cityEvents: any;
  otherEvents: any;
}

const EventCard: React.FC<EventCardProps> = ({
  city,
  cityEvents,
  otherEvents,
}) => {
  const [expandedGenre, setExpandedGenre] = useState<string | null>(null);

  const handleSeeMore = (genre: string) => {
    setExpandedGenre(expandedGenre === genre ? null : genre);
  };
  console.log("cityEvents inside EventTab:", cityEvents);
  console.log("otherEvents inside EventTab:", otherEvents.length);

  return (
    <View style={styles.contentSection}>
      <ScrollView style={styles.scrollView}>
        {/* City-Specific Events Section */}
        <Text style={[styles.sectionTitle,{marginTop:10}]}>Events in {city}</Text>
        {cityEvents.length > 0 ? (
          cityEvents.map((event: any, index: any) => (
            <View key={index} style={styles.eventCard}>
              {event.image && (
                <Image
                  source={{ uri: event.image }}
                  style={styles.eventImage}
                />
              )}
              <Text style={styles.eventTitle}>{event.name}</Text>
              <Text style={styles.eventDetails}>📅 {event.dateTime}</Text>
              <Text style={styles.eventDetails}>
                📍 {event.venue}, {event.city}, {event.state}
              </Text>
              <Text style={styles.eventCategory}>🎟️ {event.category}</Text>
            </View>
          ))
        ) : (
          <Text>No events found in {city}.</Text>
        )}

        {/* You Might Like Section */}
        <Text style={styles.sectionTitle}>You Might Like</Text>
        {Object.keys(otherEvents).length > 0 ? (
          Object.keys(otherEvents).map((genre, genreIndex) => (
            <View key={genreIndex}>
              <Text style={styles.genreHeader}>{genre}</Text>
              {otherEvents[genre].slice(0, 2).map((event: any, index: any) => (
                <View key={index} style={styles.eventCard}>
                  {event.image && (
                    <Image
                      source={{ uri: event.image }}
                      style={styles.eventImage}
                    />
                  )}
                  <Text style={styles.eventTitle}>{event.name}</Text>
                  <Text style={styles.eventDetails}>📅 {event.dateTime}</Text>
                  <Text style={styles.eventDetails}>
                    📍 {event.venue}, {event.city}, {event.state}
                  </Text>
                  <Text style={styles.eventCategory}>🎟️ {event.category}</Text>
                </View>
              ))}

              {expandedGenre === genre &&
                otherEvents[genre].slice(2).map((event: any, index: any) => (
                  <View key={index} style={styles.eventCard}>
                    {event.image && (
                      <Image
                        source={{ uri: event.image }}
                        style={styles.eventImage}
                      />
                    )}
                    <Text style={styles.eventTitle}>{event.name}</Text>
                    <Text style={styles.eventDetails}>📅 {event.dateTime}</Text>
                    <Text style={styles.eventDetails}>
                      📍 {event.venue}, {event.city}, {event.state}
                    </Text>
                    <Text style={styles.eventCategory}>
                      🎟️ {event.category}
                    </Text>
                  </View>
                ))}

              {otherEvents[genre].length > 2 && (
                <TouchableOpacity onPress={() => handleSeeMore(genre)}>
                  <Text style={styles.seeMore}>
                    {expandedGenre === genre ? "Show Less" : "See More"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        ) : (
          <Text>No events found in nearby areas.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  contentSection: {
    backgroundColor: "parent",
    // flex: 1,
    // padding: 20,
    width: "100%",
    height: "100%",
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  genreHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    color: "#333",
  },
  eventCard: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
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
  seeMore: {
    color: "blue",
    marginTop: 5,
    marginBottom: 80,
    textAlign: "right",
  },
});
