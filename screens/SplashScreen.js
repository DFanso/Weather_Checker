import React from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ fadeAnim }) => {
  return (
    <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logo} 
      />
      <Text style={styles.text}>WeatherApp</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  logo: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
