import { Text, FlatList, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { getUserFavorites } from "@/services/firebase/favourites";
import EventCard from "@/components/EventCard";
// import { ScrollView } from "react-native-gesture-handler";
import { ScrollViewBase } from "react-native";
import { fetchRecommendations } from "@/services/api/fetchRecommendations";
import fetchUserSearchRecords from "@/services/firebase/fetchPreviousSearches";
import fetchEventsWithCoordinatesAndCity from "@/services/api/fetchEventsMultipleCities";
interface RecommendationsSectionProps {
  uid: string;
  cityEvents: any[];
}
const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  uid,
  cityEvents,
}) => {
  const [recommendations, setRecommendations] = useState<any>();
  const [favorites, setFavorites] = useState<any[] | null>(null);

  const [searchRecord, setSearchRecord] = useState<any[] | null>([]);
  const [searchRecordEvents, setSearchRecordEvents] = useState<any[]>([]);
  const [recommendationLoading, setRecommendationLoading] = useState(true);

  useEffect(() => {
    if (searchRecord && searchRecord?.length > 0) {
      // const placeIdList = searchRecord.map((record) => record.placeId);

      // console.log(placeIdList);
      console.log("SearchRecord:->>> ", searchRecord);
      fetchEventsWithCoordinatesAndCity(searchRecord).then((data) => {
        // console.log("Events fetched with placeIDs", data);
        if (data) {
          setSearchRecordEvents(data);
          console.log("Search Record Events", searchRecordEvents);
        }
      });
    }
  }, [searchRecord]);
  useEffect(() => {
    // // console.log("Recommendations", uid);
    // fetchUserPreviousSearches();
    // fetFavorites();
    // console.log("favoriteData", favorites);
    performFirebaseOperations();
  }, [uid]);

  const fetFavorites = async () => {
    // console.log("Fetching favorites");
    const favoriteData = await getUserFavorites(uid).then((data) => {
      if (data) {
        setFavorites(data.events); // Assuming `events` is an array of favorite events
        //   setShouldFetchFavorites(false);
        console.log("Favorites then", favorites);
      }
    });
    // console.log("Favorite Data", favoriteData);
  };
  const fetchUserPreviousSearches = async () => {
    console.info("Fetching previous searches");
    const records = await fetchUserSearchRecords().then((data) => {
      if (data) {
        console.log("Search Records then", data);
        setSearchRecord(data);
      }
    });
    // console.log("Search Records", searchRecord);
  };

  const fetchRecommendationshandler = async () => {
    console.log("Fetching recommendations....");
    if (!cityEvents || !favorites || !searchRecord) return;
    const recommendations = await fetchRecommendations(
      searchRecordEvents,
      favorites
    ).then((data) => {
      console.log("recommendation at fetch", data);
      if (data) {
        setRecommendations(data);
        setRecommendationLoading(false);
      }
    });
    console.log("Recommendations main", recommendations);

    // setRecommendations(recommendations);
  };

  const performFirebaseOperations = async () => {
    fetchUserPreviousSearches();
    fetFavorites();
  };

  useEffect(() => {
    console.log("got changes in searches records or favorite");
    fetchRecommendationshandler();
  }, [searchRecordEvents, favorites]);
  if (recommendationLoading) {
    return <Text>Recommendations Loading...</Text>;
  }

  return (
    <FlatList
      data={recommendations}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <EventCard event={item} showFavorite={true} uid={uid} />
      )}
      horizontal
      contentContainerStyle={{ padding: 2 }}
    />

    // <View style={styles.container}>
    //   <Text style={styles.title}>You Might Like</Text>
  );
};
export default RecommendationsSection;
