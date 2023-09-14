import React, { useEffect, useState, useRef,useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, StyleSheet, Image, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { useLocation } from '../LocationContext';

const HomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const { setLocationName } = useLocation();

  

  const fetchCityName = async (lat, long) => {
    const requestUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`;

    const response = await fetch(requestUrl);
    const data = await response.json();

    if (data && data.address) {
      let locationName = data.address.city || data.address.hamlet || data.address.village || 'Unknown';
      setLocation(locationName);
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      
      // Use the API to fetch city name
      fetchCityName(location.coords.latitude, location.coords.longitude);
      
    })();
  }, []);

  useLayoutEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const goToResult = () => {
    setLocationName(location);
    navigation.navigate('Result');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="yellow" />
        <Text>Getting Your Location</Text>
      </View>
    );
  }

  return (
    <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logo} 
      />
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={location}
        onChangeText={text => setLocation(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
        goToResult();
        }}
      >
        <Text style={styles.buttonText}>Check Weather</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HomeScreen;
