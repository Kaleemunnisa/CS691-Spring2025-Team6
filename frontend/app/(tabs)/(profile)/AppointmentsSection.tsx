import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { getUserAppointments } from "@/services/firebase/appointments"; // Import the function
import { auth } from "@/config/firebaseConfig"; // Assuming you're passing auth from the config
import { UserAppointments } from "@/types/types";

const AppointmentsScreen = () => {
  const [appointments, setAppointments] = useState<UserAppointments>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userAppointments = await getUserAppointments(); // Pass the auth instance
        setAppointments(userAppointments);
      } catch (err) {
        setError("Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading appointments...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Your Appointments</Text> */}
      {Object.keys(appointments).length === 0 ? (
        <Text style={styles.noAppointmentsText}>No appointments found</Text>
      ) : (
        <FlatList
          data={Object.values(appointments)}
          keyExtractor={(item) => item.bookingId}
          renderItem={({ item }) => (
            <View style={styles.appointmentItem}>
              <View style={styles.header}>
                {item.business.businessProfile && (
                  <Image
                    source={{ uri: item.business.businessProfile }}
                    style={styles.profileImage}
                  />
                )}
                <View style={styles.businessInfo}>
                  <Text style={styles.businessName}>
                    {item.business.businessName}
                  </Text>
                  <Text style={styles.businessEmail}>
                    {item.business.businessEmail}
                  </Text>
                </View>
              </View>
              <View style={styles.details}>
                <Text style={styles.bookingName}>{item.bookingName}</Text>
                <Text style={styles.dateTime}>
                  {new Date(item.dateTime).toLocaleString()}
                </Text>
                <Text style={styles.peopleCount}>People: {item.count}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  noAppointmentsText: {
    fontSize: 16,
    textAlign: "center",
    color: "#777",
  },
  errorText: {
    fontSize: 16,
    color: "#e74c3c",
    textAlign: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#4CAF50",
    marginTop: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appointmentItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 16,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  businessInfo: {
    flex: 1,
  },
  businessName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  businessEmail: {
    fontSize: 14,
    color: "#666",
  },
  details: {
    marginTop: 10,
  },
  bookingName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  dateTime: {
    fontSize: 14,
    color: "#777",
    marginVertical: 5,
  },
  peopleCount: {
    fontSize: 14,
    color: "#777",
  },
});

export default AppointmentsScreen;
