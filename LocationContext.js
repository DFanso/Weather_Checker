import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [location, setLocationName] = useState('Default Location');

  return (
    <LocationContext.Provider value={{ location, setLocationName }}>
      {children}
    </LocationContext.Provider>
  );
};
