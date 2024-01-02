"use client";

import { createContext, useContext, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";

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
  const [marker, setMarker] = useState(null);

  const flyTo = (lat, lng) => {
    if (!map) return;
    map.flyTo({ center: [lng, lat], zoom: 15, duration: 3000 });
  };

  const createMarker = (lat, lng) => {
    if (!map) return;
    if (marker) marker.remove();
    setMarker(new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map));
  };

  const clearMarker = () => {
    if (!marker) return;
    marker.remove();
  };

  return (
    <MapContext.Provider value={{ map, setMap, flyTo, createMarker }}>
      {children}
    </MapContext.Provider>
  );
};
