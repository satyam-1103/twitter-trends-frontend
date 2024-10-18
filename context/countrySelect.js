// CountryContext.js
import React, { createContext, useContext, useState } from "react";

const CountryContext = createContext();

export const useCountry = () => {
  return useContext(CountryContext);
};

export const CountryProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState({
    value: "",
    placeId: "",
  });

  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </CountryContext.Provider>
  );
};
