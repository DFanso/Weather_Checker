import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useLocation } from '../LocationContext';
import WeatherInfo from '../components/WeatherInfo';

export default function ResultScreen({navigation}) {
  const { location } = useLocation();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFahrenheit, setIsFahrenheit] = useState(true);


  const toggleTemperatureUnit = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  useEffect(() => {
    const fetchWeather = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.EXPO_PUBLIC_API_KEY}`
          );
          if (response.status === 404) {
            alert('Location weather data not found.');
            navigation.goBack();  // Navigate back to the home screen
            return;
          }
          setWeather(response.data);
          setLoading(false);
        } catch (error) {
          console.error('An error occurred:', error);
          if (error.response && error.response.status === 404) {
            alert('Location weather data not found.');
            navigation.goBack(); // Navigate back to the home screen
          }
          setLoading(false);
        }
      };

    fetchWeather();
  }, [location]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather in {location}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <View style={styles.weatherContainer}>
          <WeatherInfo data={weather} isFahrenheit={isFahrenheit} />
          <TouchableOpacity style={styles.toggleButton} onPress={toggleTemperatureUnit}>
            <Text style={styles.toggleButtonText}>
              {isFahrenheit ? 'Switch to °C' : 'Switch to °F'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e6e6e6',
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: '#333',
    },
    weatherContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    toggleButton: {
      marginTop: 20,
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
    },
    toggleButtonText: {
      color: 'white',
      fontSize: 18,
    },
});
