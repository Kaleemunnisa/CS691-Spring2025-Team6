import React, { useState } from "react";
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
  const { name, formatted, website, opening_hours, categories } =
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
});
