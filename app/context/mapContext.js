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
  const [coordsMarker, setCoordsMarker] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hoverMarker, setHoverMarker] = useState(null);
  const [selected, setSelected] = useState(null);
  const [history, setHistory] = useState([]);

  const flyTo = (lat, lng) => {
    if (!map) return;
    map.flyTo({ center: [lng, lat], zoom: 15, duration: 3000 });
  };

  const updateCoordsMarker = (lat, lng) => {
    if (!map) return;
    if (coordsMarker) coordsMarker.remove();
    setCoordsMarker(new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map));
  };

  const updateSelectedMarker = (lat, lng) => {
    if (!map) return;
    if (selectedMarker) selectedMarker.remove();
    setSelectedMarker(new mapboxgl.Marker({color: 'red'}).setLngLat([lng, lat]).addTo(map))
  }

  const updateHoverMarker = (lat, lng) => {
    if (!lat || !lng) {
      if (hoverMarker) hoverMarker.remove();
      return
    }
    if (!map) return;
    if (hoverMarker) hoverMarker.remove();
    setHoverMarker(new mapboxgl.Marker({color: 'grey'}).setLngLat([lng,lat]).addTo(map));
  }

  const updateSelected = (newItem) => {
    if (!newItem || newItem == selected){ 
      setSelected(null);
      if (!selectedMarker) return;
      selectedMarker.remove();
      return;
    }
    setSelected(newItem)
    updateSelectedMarker(newItem.y, newItem.x)
    setHistory([...history, newItem.name])
  }

  return (
    <MapContext.Provider value={{ map, setMap, flyTo, selected, updateSelected, updateCoordsMarker, updateHoverMarker, history, setHistory }}>
      {children}
    </MapContext.Provider>
  );
};
