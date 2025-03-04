import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
// import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";
import { generateAIContent } from "@/services/google/geminiAPI";
import Markdown from "react-native-markdown-display";
import { SafeAreaView } from "react-native";

// Wikipedia API to get city details
const fetchCityInfo = async (city: string) => {
  try {
    const response = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${city}`
    );
    return {
      city: city,
      description: response.data.extract || "No details available.",
      image: response.data.thumbnail?.source || null,
      wikipedia: response.data.content_urls.desktop.page,
    };
  } catch (error) {
    return { error: "Sorry, I couldn't fetch details for this city." };
  }
};

const ChatBotScreen = () => {
  const [mess, setMess] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setMess(await generateAIContent("About Austin"));
    };
    fetchData();
  }, []);
  // setMess(await generateAIContent("About Austin"));
  // const [messages, setMessages] = useState([
  //   {
  //     _id: 1,
  //     text: "Hello! Ask me about any city, and I'll fetch details for you.",
  //     createdAt: new Date(),
  //     user: { _id: 2, name: "Bot" },
  //   },
  // ]);

  // // const onSend = useCallback(async (newMessages: any[] = []) => {
  // //   setMessages((previousMessages) =>
  // //     // GiftedChat.append(previousMessages, newMessages)
  // //   );

  //   const userMessage = newMessages[0].text;

  //   // Fetch city details from Wikipedia
  //   const cityDetails = await fetchCityInfo(userMessage);

  //   const botResponse = {
  //     _id: new Date().getTime(),
  //     text:
  //       cityDetails.error || `${cityDetails.city}: ${cityDetails.description}`,
  //     createdAt: new Date(),
  //     user: { _id: 2, name: "Bot" },
  //   };

  //   // Add Wikipedia link
  //   if (cityDetails.wikipedia) {
  //     botResponse.text += `\n\nFor more details, visit: ${cityDetails.wikipedia}`;
  //   }

  //   // Add image if available
  //   if (cityDetails.image) {
  //     botResponse.text += `\n\n![City Image](${cityDetails.image})`;
  //   }

  //   setMessages((prevMessages) =>
  //     // GiftedChat.append(prevMessages, [botResponse])
  //   );
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ padding: 10 }}>
        {/* Render Markdown content */}
        <Markdown>{mess}</Markdown>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black",
  },
});

export default ChatBotScreen;
