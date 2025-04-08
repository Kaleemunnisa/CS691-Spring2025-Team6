import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import pickImage from "@/utils/image-pickers/PickImage";
import { Event, Post, Location } from "@/types/postTypes";
import TextInputWithIcon from "../(profile)/components/TextInputWithIcon";
import { FontAwesome } from "@expo/vector-icons";

const GOOGLE_PLACES_API_KEY = "YOUR_GOOGLE_PLACES_API_KEY";

const PostAddScreen = () => {
  const [post, setPost] = useState<Post>({
    imageUrls: [],
    taggedUsers: [],
    description: "",
    location: null,
    events: [],
  });

  const [loading, setLoading] = useState(false);
  const [currentSelectedPostImage, setCurrentSelectedPostImage] =
    useState<any>(null);

  const handleAddPostImage = async () => {
    console.log("Add Post Image clicked");

    await pickImage(setCurrentSelectedPostImage, setLoading);
  };

  useEffect(() => {
    console.log("Post image selected:", currentSelectedPostImage);
    console.log("Post image selected loading state:", loading);
    // console.log("Post image selected loading state:", loading);
    console.log(
      "post image urls inside currentSelectedPostImage useEffect",
      post.imageUrls
    );
    if (currentSelectedPostImage && !loading) {
      console.log("loading state", loading);
      console.log("Post image selected:", currentSelectedPostImage);

      // Prevent adding duplicate images
      setPost((prev) => {
        const updatedImageUrls = [...prev.imageUrls];
        if (!updatedImageUrls.includes(currentSelectedPostImage)) {
          updatedImageUrls.push(currentSelectedPostImage);
        }
        return { ...prev, imageUrls: updatedImageUrls };
      });
    }
    console.log(
      "post image urls inside currentSelectedPostImage useEffect after",
      post.imageUrls
    );
  }, [currentSelectedPostImage]);

  const handleRemoveImage = (index: number) => {
    const updatedImageUrls = post.imageUrls.filter((_, i) => i !== index);
    setPost((prev) => ({ ...prev, imageUrls: updatedImageUrls }));
  };

  useEffect(() => {
    console.log("Post object updated:", post);
    console.log("Post image URLs:", post.imageUrls);
  }, [post]);

  const handleAddEvent = () => {
    const newEvent: Event = {
      name: "",
      dateTime: "",
      venue: "",
      city: "",
      state: "",
      image: "",
      category: "",
    };
    setPost((prev) => ({ ...prev, events: [...prev.events, newEvent] }));
  };

  const updateEvent = (index: number, key: keyof Event, value: any) => {
    const updatedEvents = [...post.events];
    updatedEvents[index][key] = value;
    setPost((prev) => ({ ...prev, events: updatedEvents }));
  };

  const handleAddEventImage = async (eventIndex: number) => {
    await pickImage((url) => updateEvent(eventIndex, "image", url), setLoading);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Share Your Experience</Text>
      <Text style={styles.sectionTitle}>Create a Post: </Text>
      <Button title="Add Images" onPress={handleAddPostImage} />
      {loading && <ActivityIndicator size="small" color="#007bff" />}
      {post.imageUrls && post.imageUrls.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 10 }}
        >
          {post.imageUrls.map((uri, idx) => (
            <View key={idx} style={styles.imageContainer}>
              {/* <Text style={styles.imageText}>{uri}</Text> */}
              <Image source={{ uri }} style={styles.image} />
              <TouchableOpacity
                onPress={() => handleRemoveImage(idx)}
                style={styles.removeIcon}
              >
                <FontAwesome name="remove" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {/* <Text style={styles.sectionTitle}>Description</Text> */}
      <TextInputWithIcon
        label="Description"
        placeholder="Write something..."
        multiline
        value={post.description}
        onChangeText={(text) =>
          setPost((prev) => ({ ...prev, description: text }))
        }
        // style={styles.textInput}
      />

      {/* <Text style={styles.sectionTitle}>Location</Text> */}

      <TextInputWithIcon
        label="Location"
        // style={styles.textInput}
        icon="map-pin"
        placeholder="Search for location"
        value={post.location?.name || ""}
        onChangeText={(text) =>
          setPost((prev) => ({
            ...prev,
            location: { ...prev.location, name: text },
          }))
        }
      />
      {post.location && (
        <Text style={styles.locationText}>
          📍 Selected: {post.location.name}
        </Text>
      )}

      <Text style={styles.sectionTitle}>Events</Text>
      {post.events.map((event, index) => (
        <View key={index} style={styles.eventContainer}>
          <TextInput
            placeholder="Event Name"
            value={event.name}
            onChangeText={(text) => updateEvent(index, "name", text)}
            style={styles.eventInput}
          />
          <TextInput
            placeholder="Date & Time"
            value={event.dateTime}
            onChangeText={(text) => updateEvent(index, "dateTime", text)}
            style={styles.eventInput}
          />
          <TextInput
            placeholder="Venue"
            value={event.venue}
            onChangeText={(text) => updateEvent(index, "venue", text)}
            style={styles.eventInput}
          />
          <TextInput
            placeholder="City"
            value={event.city}
            onChangeText={(text) => updateEvent(index, "city", text)}
            style={styles.eventInput}
          />
          <TextInput
            placeholder="State"
            value={event.state}
            onChangeText={(text) => updateEvent(index, "state", text)}
            style={styles.eventInput}
          />
          <TextInput
            placeholder="Category"
            value={event.category}
            onChangeText={(text) => updateEvent(index, "category", text)}
            style={styles.eventInput}
          />

          <Button
            title="Pick Event Image"
            onPress={() => handleAddEventImage(index)}
          />
          {event.image && (
            <Image source={{ uri: event.image }} style={styles.eventImage} />
          )}
        </View>
      ))}

      <TouchableOpacity onPress={handleAddEvent} style={styles.addEventButton}>
        <Text style={styles.addEventButtonText}>+ Add Event</Text>
      </TouchableOpacity>

      <Button
        title="Submit Post"
        onPress={() => {
          console.log("Final Post Object:", post);
          // Save to Firebase or backend
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    padding: 5,
    alignSelf: "center",
  },
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 16,
  },
  image: {
    width: 200, // Takes up the full width of the screen
    height: 200, // Adjust the height to your preference (e.g., 200px)
    marginVertical: 8,
    // minWidth: 300, // Ensures the image does not shrink below a minimum width
    resizeMode: "contain", // Ensures the image is cropped and covers the area without distorting its aspect ratio
  },
  imageContainer: {
    marginRight: 1, // To add spacing between images
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  locationText: {
    marginTop: 8,
  },
  eventContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
  },
  eventInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
    borderRadius: 6,
  },
  eventImage: {
    width: 100,
    height: 100,
    marginTop: 8,
  },
  addEventButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  addEventButtonText: {
    color: "white",
    textAlign: "center",
  },
  removeIcon: {
    position: "absolute",
    top: 15,
    right: 5,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 5,
    zIndex: 1,
  },
});

export default PostAddScreen;
