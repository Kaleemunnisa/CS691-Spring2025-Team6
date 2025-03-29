import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const PlaceCard = ({ place }: { place: any }) => {
  const {
    name,
    formatted,
    phone,
    website,
    opening_hours,
    categories,
    geometry,
  } = place;

  return (
    <TouchableOpacity onPress={() => Linking.openURL(website)}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.name}>{name} "Satya"</Text>
        </View>
        <View style={styles.details}>
          <View style={styles.infoRow}>
            <FontAwesome name="map-marker" size={20} color="#FF5733" />
            <Text style={styles.text}>{formatted}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="phone" size={20} color="#007bff" />
            <Text style={styles.text}>{phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="access-time" size={20} color="#FF5733" />
            <Text style={styles.text}>{opening_hours}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome name="tags" size={20} color="#28a745" />
            <Text style={styles.text}>{categories.join(", ")}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="gps-fixed" size={20} color="#888" />
            <Text style={styles.text}>
              Coordinates: {geometry.coordinates[0]}, {geometry.coordinates[1]}
            </Text>
          </View>
        </View>
        <Text style={styles.website} onPress={() => Linking.openURL(website)}>
          Visit Website ➡️
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#FF5733",
    marginBottom: 15,
    paddingBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  details: {
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginLeft: 10,
    flexWrap: "wrap",
  },
  website: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  },
});

export default PlaceCard;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Linking,
//   StyleSheet,
// } from "react-native";
// import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
// import {
//   getUserFavorites,
//   saveUserFavoritePlace,
//   removeUserFavoritePlace,
// } from "@/services/firebase/favourites";
// import { auth } from "@/config/firebaseConfig"; // Assuming you're using Firebase Authentication

// const PlaceCard = ({ place }: { place: any }) => {
//   const {
//     id,
//     name,
//     formatted,
//     phone,
//     website,
//     opening_hours,
//     categories,
//     geometry,
//   } = place;

//   const [isFavorite, setIsFavorite] = useState(false);
//   const user = auth.currentUser; // Get the current user

//   useEffect(() => {
//     // Fetch user's favorites and check if this place is already a favorite
//     const checkFavoriteStatus = async () => {
//       if (!user) return;
//       const userFavorites = await getUserFavorites(user.uid);
//       if (userFavorites?.places?.some((fav: any) => fav.id === id)) {
//         setIsFavorite(true);
//       }
//     };
//     checkFavoriteStatus();
//   }, []);

//   const toggleFavorite = async () => {
//     if (!user) return;

//     if (isFavorite) {
//       await removeUserFavoritePlace(user.uid, id);
//       setIsFavorite(false);
//     } else {
//       await saveUserFavoritePlace(user.uid, place);
//       setIsFavorite(true);
//     }
//   };

//   return (
//     <View style={styles.card}>
//       {/* <TouchableOpacity onPress={toggleFavorite}>
//         <FontAwesome
//           name={isFavorite ? "heart" : "heart-o"}
//           size={60}
//           color="red"
//         />
//       </TouchableOpacity> */}
//       <View style={styles.header}>
//         <Text style={styles.name}>{name}</Text>
//       </View>

//       <View style={styles.details}>
//         <View style={styles.infoRow}>
//           <FontAwesome name="map-marker" size={20} color="#FF5733" />
//           <Text style={styles.text}>{formatted}</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <MaterialIcons name="phone" size={20} color="#007bff" />
//           <Text style={styles.text}>{phone}</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <MaterialIcons name="access-time" size={20} color="#FF5733" />
//           <Text style={styles.text}>{opening_hours}</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <FontAwesome name="tags" size={20} color="#28a745" />
//           <Text style={styles.text}>{categories.join(", ")}</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <MaterialIcons name="gps-fixed" size={20} color="#888" />
//           <Text style={styles.text}>
//             Coordinates: {geometry.coordinates[0]}, {geometry.coordinates[1]}
//           </Text>
//         </View>
//       </View>
//       {website && (
//         <Text style={styles.website} onPress={() => Linking.openURL(website)}>
//           Visit Website ➡️
//         </Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     borderRadius: 15,
//     padding: 20,
//     marginBottom: 15,
//     backgroundColor: "#ffffff",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderBottomWidth: 2,
//     borderBottomColor: "#FF5733",
//     marginBottom: 15,
//     paddingBottom: 10,
//   },
//   name: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   details: {
//     marginBottom: 10,
//   },
//   infoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   text: {
//     fontSize: 14,
//     color: "#555",
//     marginLeft: 10,
//     flexWrap: "wrap",
//   },
//   website: {
//     fontSize: 16,
//     color: "#007bff",
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: 15,
//   },
// });

// export default PlaceCard;
