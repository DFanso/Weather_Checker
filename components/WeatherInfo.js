import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WeatherInfo({ data, isFahrenheit }) {
  if (!data) return null;

  const { main, weather, wind } = data;

  const temperatureK = data.main.temp;
  const temperature = isFahrenheit
  ? parseInt(Math.round((temperatureK - 273.15) * (9 / 5) + 32))
  : parseInt(Math.round(temperatureK - 273.15));

  const description = weather[0].description;
  const humidity = main.humidity;
  const windSpeed = wind.speed;

  return (
    <View style={styles.container}>
      <Text style={styles.tempText}>
      {temperature.toString()}° {isFahrenheit ? 'F' : 'C'}
      </Text>
      <Text style={styles.descriptionText}>
        {description.charAt(0).toUpperCase() + description.slice(1)}
      </Text>
      <Text style={styles.smallText}>Humidity: {humidity}%</Text>
      <Text style={styles.smallText}>Wind Speed: {windSpeed} m/s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  tempText: {
    fontSize: 48,
    fontWeight: 'bold'
  },
  descriptionText: {
    fontSize: 24,
    fontStyle: 'italic',
  },
  smallText: {
    fontSize: 18,
  },
});
