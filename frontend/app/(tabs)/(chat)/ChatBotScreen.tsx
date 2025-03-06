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
  return (
    <SafeAreaView style={styles.container}>
      <Text>ChatBotScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "while",
    padding: 20,
    justifyContent: "center",
    alignItems:'center'
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  chatMessage: {
    padding: 10,
    margin: 10,
    borderRadius: 10,         // 1  // 2
    backgroundColor: "lightgrey",
  },
  chatMessageUser: {
    padding: 10,
    margin: 10,
    borderRadius: 10,         // 1  // 2
    backgroundColor: "lightblue",
  },
  chatMessageBot: {
    padding: 10,
    margin: 10,
    borderRadius: 10,         // 1  // 2
    backgroundColor: "lightgreen",
  },
  chatMessageText: {
    fontSize: 16,
  },
  chatMessageUserText: {
    fontSize: 16,
  },
  chatMessageBotText: {
    fontSize: 16,
  },
  chatMessageTime: {
    fontSize: 12,
    color: "grey",
  },
  chatMessageUserTime: {
    fontSize: 12,
    color: "grey",
  },
  chatMessageBotTime: {
    fontSize: 12,
    color: "grey",
  },
  chatMessageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  chatMessageUserImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  chatMessageBotImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  chatMessageLink: {
    color: "blue",
  },
  chatMessageUserLink: {
    color: "blue",
  },
  chatMessageBotLink: {
    color: "blue",
  },
  chatMessageCode: {
    backgroundColor: "lightgrey",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  chatMessageUserCode: {
    backgroundColor: "lightblue",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  chatMessageBotCode: {
    backgroundColor: "lightgreen",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
    
});

export default ChatBotScreen;
