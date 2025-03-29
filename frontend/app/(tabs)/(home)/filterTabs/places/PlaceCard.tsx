import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Animated,
  PanResponder,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { auth } from "@/config/firebaseConfig";
import {
  saveUserFavoritePlace,
  removeUserFavoritePlace,
  getUserFavorites,
} from "@/services/firebase/favourites";
import { doc, getDoc } from "firebase/firestore";
import userAuth from "@/services/firebase/userAuth";

interface PlaceCardProps {
  place: any;
  onClose: () => void;
  onMarkerPress: (place: any) => void;
}

const categoryIcons: { [key: string]: JSX.Element } = {
  "commercial.food_and_drink": (
    <MaterialIcons name="restaurant" size={24} color="black" />
  ),
};

const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  onClose,
  onMarkerPress,
}) => {
  const { place_id, name, formatted, website, opening_hours, categories } =
    place.properties;

  // Default to food/drink icon if category is unknown
  const categoryIcon =
    categories.find((cat: string) => categoryIcons[cat]) ||
    "commercial.food_and_drink";

  // Minimize/maximize state
  const [expanded, setExpanded] = useState(true);

  // Dragging functionality
  const position = new Animated.ValueXY();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: position.x, dy: position.y }],
      {
        useNativeDriver: false,
      }
    ),
    onPanResponderRelease: () => {},
  });

  const [isFavorite, setIsFavorite] = useState(false);
  const user = auth.currentUser; // Get the current user
  const checkFavoriteStatus = async () => {
    console.log("Checking favorite status");
    if (!user) return;
    console.log("user available at status", user.uid);
    const userFavorites = await getUserFavorites(user.uid);
    if (
      userFavorites?.places?.some((fav: any) => {
        console.log(
          "placeId in status function",
          name,
          fav.properties.address_line1,
          fav.properties.place_id,
          fav.properties.place_id === place_id
        );
        return fav.properties.place_id === place_id;
      })
    ) {
      console.log();
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    checkFavoriteStatus();
  }, [place_id]);
  // Add dependencies to re-run effect when user or id changes

  const toggleFavorite = async () => {
    if (!user) return;
    console.log("user available", user);
    console.log("place", place);

    if (isFavorite) {
      await removeUserFavoritePlace(user.uid, place_id);
      setIsFavorite(false);
    } else {
      await saveUserFavoritePlace(user.uid, place);
      setIsFavorite(true);
    }
  };

  return (
    <Animated.View
      style={[styles.card, { transform: position.getTranslateTransform() }]}
      {...panResponder.panHandlers}
    >
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <MaterialIcons name="close" size={20} color="white" />
      </TouchableOpacity>

      {/* Minimize/Maximize Button */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setExpanded(!expanded)}
      >
        <MaterialIcons
          name={expanded ? "expand-more" : "expand-less"}
          size={20}
          color="white"
        />
      </TouchableOpacity>

      {/* Minimized View */}
      {!expanded ? (
        <TouchableOpacity onPress={() => onMarkerPress(place)}>
          <View style={styles.minimizedView}>
            {categoryIcons[categoryIcon]}
            <Text style={styles.name}>{name}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        // Expanded View
        <TouchableOpacity onPress={() => onMarkerPress(place)}>
          <View style={styles.details}>
            <View style={styles.iconContainer}>
              {categoryIcons[categoryIcon]}
            </View>

            <Text style={styles.name}>{name}</Text>

            {opening_hours && (
              <View style={styles.infoRow}>
                <MaterialIcons name="access-time" size={16} color="#FF5733" />
                <Text style={styles.text}>{opening_hours}</Text>
              </View>
            )}

            <View style={styles.infoRow}>
              <FontAwesome name="map-marker" size={16} color="#007bff" />
              <Text style={styles.text}>{formatted}</Text>
            </View>

            {website && (
              <TouchableOpacity onPress={() => Linking.openURL(website)}>
                <View style={styles.infoRow}>
                  <FontAwesome name="external-link" size={16} color="#28a745" />
                  <Text style={styles.website}>Visit Website</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={styles.iconHeartContainer}
            onPress={async () => {
              await toggleFavorite();
            }}
          >
            <FontAwesome
              name={isFavorite ? "heart" : "heart-o"}
              size={24}
              color="#FF5733"
            />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default PlaceCard;

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "red",
    borderRadius: 15,
    padding: 5,
    zIndex: 1,
  },
  toggleButton: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "blue",
    borderRadius: 15,
    padding: 5,
    zIndex: 1,
  },
  iconContainer: {
    marginBottom: 10,
  },
  details: {
    flexDirection: "column",
  },
  minimizedView: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  text: {
    marginLeft: 5,
    fontSize: 14,
    color: "#666",
  },
  website: {
    marginLeft: 5,
    fontSize: 14,
    color: "#007BFF",
  },
  iconHeartContainer: {
    position: "absolute",
    zIndex: 10,
    bottom: -20,
    right: -20,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
  },
});

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
//   saveUserFavoritePlace,
//   removeUserFavoritePlace,
//   getUserFavorites,
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
//       <View style={styles.header}>
//         <Text style={styles.name}>{name}</Text>
//         <TouchableOpacity onPress={toggleFavorite}>
//           <AntDesign
//             name={isFavorite ? "heart" : "hearto"}
//             size={24}
//             color="#FF5733"
//           />
//         </TouchableOpacity>
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
//           <Text style={styles.text}>{categories?.join(", ")}</Text>
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
