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
    backgroundColor:'#F6F4F0',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollView: {
    marginTop: 30,
    marginBottom: 20,
  },
  cityName: {
    position: 'absolute',
    top: '40%',
    paddingHorizontal: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  rectangle: {
    width: width * 0.9,
    height: height * 0.4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 20,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  button: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentWrapper: {
    width: '100%',
    height: height * 0.23,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  textInput: {
    width: 200,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
});
