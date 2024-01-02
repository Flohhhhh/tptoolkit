"use client";

import { createContext, useContext, useState, useEffect } from "react";

// @ts-ignore
export const MapContext = createContext();

export const useMap = () => {
  const mapContext = useContext(MapContext);
  if (!mapContext) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return mapContext;
};

export const MapProvider = ({ children }) => {
  const [map, setMap] = useState(null);

  const flyTo = (lat, lng) => {
    if (!map) return;
    map.flyTo({ center: [lng, lat], zoom: 16, duration: 3000 });
  };

  const setMarker = (lat, lng) => {
    if (!map) return;
    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  };

  return (
    <MapContext.Provider value={{ map, setMap, flyTo, setMarker }}>
      {children}
    </MapContext.Provider>
  );
};
