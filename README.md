# Weather_Checker
REACT NATIVE TEST |  Data Capture Experts

---

# Weather App Project Documentation

## Table of Contents
- [Weather\_Checker](#weather_checker)
- [Weather App Project Documentation](#weather-app-project-documentation)
  - [Table of Contents](#table-of-contents)
    - [Introduction](#introduction)
    - [Requirements](#requirements)
    - [Installation Guide](#installation-guide)
    - [Code Overview](#code-overview)
    - [API Endpoints](#api-endpoints)
    - [Error Handling](#error-handling)
    - [Credits](#credits)

---

### Introduction

This Weather App is built using React Native and Expo. It allows users to check the weather of their current location or any other city they input.

---

### Requirements

- Node.js
- Expo CLI
- React Native
- Android/iOS emulator or physical device

---

### Installation Guide

- Clone the repository
- Run `npm install` or `yarn install`
- Run `expo start`

---

### Code Overview

- **HomeScreen**
  - Uses Expo's Location API to get the user's current location.
  - Uses OpenStreetMap's Nominatim API to get the city name based on coordinates.
  - Animated UI elements.
  
- **ResultScreen**
  - Uses OpenWeatherMap API to fetch weather data.
  - Allows switching between Fahrenheit and Celsius.

- **LocationContext**
  - Provides location state to different components.

---

### API Endpoints

- **OpenWeatherMap**: `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
- **Nominatim OpenStreetMap**: `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`

---

### Error Handling

- Checks for location permissions.
- Handles 404 errors by alerting the user if the weather data for a location is not found.
- Shows an alert if the user tries to proceed without entering a location.

---


### Credits

- OpenWeatherMap API
- Nominatim OpenStreetMap API
- Expo Location
- React Native and React Navigation

---
