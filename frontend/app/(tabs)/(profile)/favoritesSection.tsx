import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { getUserFavorites } from "@/services/firebase/favourites"; // Import your getUserFavorites function
import EventCard from "@/components/EventCard"; // Import EventCard component
import { faV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesome } from "@expo/vector-icons";
import LottieAnimation from "@/utils/animations-helper/DotLottieAnimations";
import { useRouter } from "expo-router";

interface FavoritesSectionProps {
  uid: string;
}
const FavoritesSection: React.FC<FavoritesSectionProps> = ({ uid }) => {
  const [favorites, setFavorites] = useState<any[] | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);

  //dynamic event fetching when any event is removed or added
  const [shouldFetchFavorites, setShouldFetchFavorites] =
    useState<boolean>(false);

  //fetch fav events
  const fetchFavorites = async () => {
    const favoriteData = await getUserFavorites(uid);
    if (favoriteData) {
      setFavorites(favoriteData.events); // Assuming `events` is an array of favorite events
      setShouldFetchFavorites(false);
    }
  };

  useEffect(() => {
    if (uid) {
      console.log("uid", uid);
      fetchFavorites();
    }
    console.log("favourties", favorites);
    // console.log("fav events",events);
    console.log("shouldFetchFavorites", shouldFetchFavorites);
  }, [uid]);

  useEffect(() => {
    if (shouldFetchFavorites) {
      fetchFavorites();
    }
  }, [shouldFetchFavorites]);

  useEffect(() => {
    if (favorites?.length !== 0) {
      setShowFavorites(true);
    } else {
      setShowFavorites(false);
    }
  }, []);

  const router = useRouter();

  const handleExplore = () => {
    router.push("/(tabs)/(home)"); // Adjust this path to your actual route
  };

  useFocusEffect(
    useCallback(() => {
      console.log("enterd the fav tab");
      if (favorites) {
        console.log("favoriteData is present already");
        return;
      }
      fetchFavorites();
    }, [])
  );

  if (!favorites) {
    return (
      <View style={styles.loaderContainer}>
        <LottieAnimation
          source={require("@/assets/animations/nop-Data-Found.json")}
          width={270}
          height={270}
        />
        <Text style={styles.noDataText}>No favorites yet!</Text>
        <Text style={styles.suggestionText}>
          Start exploring and add some events to your favorites 🎉
        </Text>
        <TouchableOpacity style={styles.actionButton} onPress={handleExplore}>
          <Text style={styles.buttonText}>Explore Events</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //handle Scroll

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition = event.nativeEvent.contentOffset.y;
    setScrollY(currentScrollPosition);
    // console.log("Scrolled to:", currentScrollPosition);
    // Add any additional logic here based on scroll position
    if (currentScrollPosition < 0 && currentScrollPosition <= -90) {
      fetchFavorites();
      setShouldFetchFavorites(true);
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>
        Fa
        <FontAwesome name="heart" size={24} color="red" />
        orites
      </Text>
      {shouldFetchFavorites && <ActivityIndicator size="large" />}

      {!showFavorites ? (
        <Text>Add Fav</Text>
      ) : (
        <>
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
                setShouldFetchFavorites={setShouldFetchFavorites}
              />
            )}
            onScroll={handleScroll}
            scrollEventThrottle={30}
          />
        </>

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
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    position: "relative",
    paddingTop: "20%",
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    display: "flex",
    // alignContent: "center",
    // backgroundColor:'red',
    zIndex: -1000,
  },

  // loaderContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   padding: 20,
  // },
  noDataText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    color: "#333",
  },
  suggestionText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 12,
  },
  actionButton: {
    backgroundColor: "#3478f6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FavoritesSection;
