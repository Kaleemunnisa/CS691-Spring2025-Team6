import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import EventCard from "@/components/EventCard";

interface EventSectionProps {
  uid: string;
  sectionTitle: string;
  events: any[];
  isCitySpecific?: boolean;
}

const EventSection: React.FC<EventSectionProps> = ({
  uid,
  sectionTitle,
  events,
  isCitySpecific = false,
}) => {
  const [expandedGenre, setExpandedGenre] = useState<string | null>(null);
  console.log("Events Section", uid);
  const handleSeeMore = (genre: string) => {
    setExpandedGenre(expandedGenre === genre ? null : genre);
  };

  return (
    <View
      style={[
        styles.section,
        sectionTitle === "You Might Like" && styles.youMightLikeSection,
      ]}
    >
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      {events.length > 0 ? (
        events.map((event, index) => (
          // <EventCard key={index} event={event} />
          <EventCard key={index} event={event} uid={uid} showFavorite={true} />
        ))
      ) : (
        <Text>No events available</Text>
      )}
      {isCitySpecific && events.length > 2 && (
        <TouchableOpacity onPress={() => handleSeeMore("city")}>
          <Text style={styles.seeMore}>
            {expandedGenre === "city" ? "Show Less" : "See More"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingBottom: 100,
  },
  youMightLikeSection: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  seeMore: {
    color: "blue",
    marginTop: 5,
    // marginBottom: 80,
    textAlign: "right",
  },
});

export default EventSection;
