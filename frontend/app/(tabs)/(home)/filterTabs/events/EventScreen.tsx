import React from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import EventSection from "./EventSection";
import RecommendationsSection from "./RecommendationsSection";

interface EventScreenProps {
  uid: string;
  city: string;
  cityEvents: any[];
  otherEvents: any[];
}

const EventScreen: React.FC<EventScreenProps> = ({
  uid,
  city,
  cityEvents,
  otherEvents,
}) => {
  console.log("EventsScreen", uid);
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.sectionTitle}>You might Like</Text>
        <RecommendationsSection uid={uid} cityEvents={cityEvents} />
      </View>

      <EventSection
        uid={uid}
        sectionTitle={`Events in ${city}`}
        events={cityEvents}
        isCitySpecific={true}
      />
      {/* <EventSection
        uid={uid}
        sectionTitle="You Might Like"
        events={otherEvents}
      /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    // paddingBottom:20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default EventScreen;
