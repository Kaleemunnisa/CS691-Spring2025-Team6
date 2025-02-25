import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { getUserFavorites } from "@/services/firebase/favourites"; // Import your getUserFavorites function
import EventCard from "@/components/EventCard"; // Import EventCard component
import { faV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesome } from "@expo/vector-icons";

interface FavoritesSectionProps {
  uid: string;
}
const FavoritesSection: React.FC<FavoritesSectionProps> = ({ uid }) => {
  const [favorites, setFavorites] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoriteData = await getUserFavorites(uid);
      if (favoriteData) {
        setFavorites(favoriteData.events); // Assuming `events` is an array of favorite events
      }
    };

    if (uid) {
      fetchFavorites();
      //   const intervalId = setInterval(fetchFavorites, 10000); // Set interval to fetch every 2 seconds

      //   // Clear the interval when the component unmounts or the uid changes
      //   return () => clearInterval(intervalId);
    }
    console.log("favourties", favorites);
    // console.log("fav events",events);
  }, [uid]);

  if (!favorites) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Loading favorites...</Text>
      </View>
    );
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>
        Fa
        <FontAwesome name="heart" size={24} color="red" />
        orites
      </Text>
      {favorites.length === 0 ? (
        <Text>Add Fav</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favorites}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <EventCard
              key={index}
              event={item}
              uid={uid}
              showFavorite={true} // Pass showFavorite prop
            />
          )}
        />

        // <ActivityIndicator size={24} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 15,
    // backgroundColor: "",
    flex: 1,
    // height: "100%",
    paddingBottom: 50,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    paddingLeft: 10,
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
});

export default FavoritesSection;
