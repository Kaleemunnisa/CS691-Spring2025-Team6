import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostAddScreen from './postAddScreen';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [images, setImages] = useState([]);



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
      <PostAddScreen/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});
