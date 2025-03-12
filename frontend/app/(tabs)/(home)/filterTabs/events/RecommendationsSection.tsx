import { Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { getUserFavorites } from "@/services/firebase/favourites";
import EventCard from "@/components/EventCard";
// import { ScrollView } from "react-native-gesture-handler";
import { fetchRecommendations } from "@/services/api/fetchRecommendations";
interface RecommendationsSectionProps {
  uid: string;
  cityEvents: any[];
}
const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  uid,
  cityEvents,
}) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[] | null>(null);

  useEffect(() => {
    // console.log("Recommendations", uid);
    fetFavorites();
    console.log("Recommendations", favorites);
  }, [uid]);

  const fetFavorites = async () => {
    // console.log("Fetching favorites");
    const favoriteData = await getUserFavorites(uid);
    console.log("Favorite Data", favoriteData);
    if (favoriteData) {
      setFavorites(favoriteData.events); // Assuming `events` is an array of favorite events
      //   setShouldFetchFavorites(false);
    }
  };

  const fetchRecommendationshandler = async () => {
    // console.log("Fetching recommendations");
    if (!cityEvents || !favorites) return;
    console.log("Entered the recommendations fetchRecommendationshandler");
    console.log(typeof cityEvents, cityEvents.length);
    console.log(typeof favorites, favorites.length);
    const recommendations = await fetchRecommendations(
      cityEvents,
      favorites
    ).then((data) => {
      if (data) {
        setRecommendations(data.recommendations);
      }
    });
    console.log("Recommendations main", recommendations);

    // setRecommendations(recommendations);
  };

  useEffect(() => {
    fetchRecommendationshandler();
  }, [favorites]);
  if (!favorites) {
    return <Text>Recommendations Loading...</Text>;
  }

  return (
    <FlatList
      data={recommendations}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <EventCard event={item} />}
      horizontal
      contentContainerStyle={{ padding: 2 }}
    />

    // <View style={styles.container}>
    //   <Text style={styles.title}>You Might Like</Text>
  );
};
export default RecommendationsSection;
