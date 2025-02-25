import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import EventSection from "./EventSection";

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
  console.log("EventsScreen",uid);
  return (
    <ScrollView style={styles.container}>
      <EventSection
        uid={uid}
        sectionTitle={`Events in ${city}`}
        events={cityEvents}
        isCitySpecific={true}
      />
      <EventSection
        uid={uid}
        sectionTitle="You Might Like"
        events={otherEvents}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    // paddingBottom:20,
  },
});

export default EventScreen;
