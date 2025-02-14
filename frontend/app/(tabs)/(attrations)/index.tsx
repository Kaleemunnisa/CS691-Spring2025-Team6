import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [images, setImages] = useState([]);



  return (
    <View style={styles.container}>
     

      <View style={styles.contentWrapper}>
        <Text style={styles.text}>Explore the Best Destinations</Text>
        <TextInput style={styles.textInput} placeholder="Enter your destination" />
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Let's Go</Text>
        </TouchableOpacity>
      </View>


     
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50, // Adjust this value based on your tab height
  },
  contentWrapper: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


