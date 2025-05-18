"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { CopyToClipboard } from "@/lib/CopyToClipboard";
import { useMap } from "@/lib/context/mapContext";
import { useSearchStore } from "@/lib/store/searchStore";

export function MapRenderer(props) {
  const { theme } = useTheme();
  const { onMapLoad, onMapRemoved, mapStyle } = props;
  const { setEnteredCoords, currentCoords, searchCoords } = useSearchStore();
  const { map, setMap } = useMap();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [marker, setMarker] = useState(null);

  // React ref to store a reference to the DOM node that will be used
  // as a required parameter `container` when initializing the mapbox-gl
  // will contain `null` by default
  const mapNode = useRef(null);

  // Effect to handle marker updates and flying to location
  useEffect(() => {
    if (!map || !currentCoords.lat || !currentCoords.lng) return;

    // Remove existing marker if it exists
    if (marker) {
      marker.remove();
    }

    // Create new marker
    const newMarker = new mapboxgl.Marker()
      .setLngLat([currentCoords.lng, currentCoords.lat])
      .addTo(map);
    setMarker(newMarker);

    // Fly to location
    map.flyTo({
      center: [currentCoords.lng, currentCoords.lat],
      zoom: 15,
      essential: true,
    });
  }, [currentCoords, map]);

  // Effect to handle style changes
  useEffect(() => {
    if (!map) return;

    if (mapStyle === "satellite") {
      map.setStyle("mapbox://styles/mapbox/standard-satellite");
    } else {
      map.setStyle("mapbox://styles/mapbox/standard");
      map.once("style.load", () => {
        map.setConfigProperty(
          "basemap",
          "lightPreset",
          theme === "dark" ? "night" : "day"
        );
      });
    }
  }, [mapStyle, theme, map]);

  // Effect to handle theme changes
  useEffect(() => {
    if (!map || mapStyle === "satellite") return;

    const handleStyleLoad = () => {
      map.setConfigProperty(
        "basemap",
        "lightPreset",
        theme === "dark" ? "night" : "day"
      );
    };

    map.on("style.load", handleStyleLoad);

    // If the style is already loaded, apply immediately
    if (map.isStyleLoaded()) {
      handleStyleLoad();
    }

    // Cleanup
    return () => {
      map.off("style.load", handleStyleLoad);
    };
  }, [theme, map, mapStyle]);

  useEffect(() => {
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      projection: "globe",
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN,
      center: [-74.2986829372431, 40.53355347618958],
      zoom: 15,
      doubleClickZoom: false,
      hash: false,
      style: "mapbox://styles/mapbox/standard",
    });

    // Apply initial theme
    mapboxMap.once("style.load", () => {
      mapboxMap.setConfigProperty(
        "basemap",
        "lightPreset",
        theme === "dark" ? "night" : "day"
      );
    });

    // Add navigation control
    mapboxMap.addControl(new mapboxgl.NavigationControl(), "bottom-left");

    // Add scale control
    mapboxMap.addControl(new mapboxgl.ScaleControl(), "bottom-right");

    // Add click event listener
    mapboxMap.on("contextmenu", (e) => {
      CopyToClipboard(`${e.lngLat.lat.toFixed(6)}, ${e.lngLat.lng.toFixed(6)}`);
    });

    mapboxMap.on("dblclick", (e) => {
      e.preventDefault();
      const lat = e.lngLat.lat;
      const lng = e.lngLat.lng;
      setEnteredCoords(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      searchCoords(lng, lat);
    });

    setMap(mapboxMap);
    mapboxMap.getCanvas().style.cursor = "default";

    if (onMapLoad) mapboxMap.once("load", onMapLoad);

    return () => {
      mapboxMap.remove();
      if (onMapRemoved) onMapRemoved();
    };
  }, []);

  return <div ref={mapNode} className="w-full h-full relative" />;
}
