import React, { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';
import { LocationProvider } from './LocationContext';


const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false, 
      },
    },
    Result: ResultScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current; 

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => setIsReady(true));
  };

  useEffect(() => {
    setTimeout(() => {
      fadeOut();
    }, 2000);
  }, []);

  if (!isReady) {
    return <SplashScreen fadeAnim={fadeAnim} />;
  }

  return (
    <LocationProvider>
      <AppContainer />
    </LocationProvider>
  );
};

export default App;
