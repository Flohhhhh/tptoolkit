"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { CopyToClipboard } from "@/lib/CopyToClipboard";
import { useMap } from "@/lib/context/mapContext";
import { searchCoords } from "@/lib/helpers/search";
export function MapRenderer(props) {
  const { theme } = useTheme();
  const { onMapLoad, onMapRemoved, mapStyle } = props;
  const { map, setMap, handleCoordinateUpdate } = useMap();
  const [mapLoaded, setMapLoaded] = useState(false);

  // React ref to store a reference to the DOM node that will be used
  // as a required parameter `container` when initializing the mapbox-gl
  // will contain `null` by default
  const mapNode = useRef(null);

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

    setMap(mapboxMap);
    mapboxMap.getCanvas().style.cursor = "default";

    if (onMapLoad) mapboxMap.once("load", onMapLoad);

    return () => {
      mapboxMap.remove();
      if (onMapRemoved) onMapRemoved();
    };
  }, []);

  // Register double-click handler only when map is available
  useEffect(() => {
    if (!map) return;
    const handler = (e) => {
      console.log("Double click detected", e.lngLat);
      const lat = e.lngLat.lat;
      const lng = e.lngLat.lng;
      // console.log("Updating coordinates:", lat, lng);
      searchCoords(lat, lng);
      handleCoordinateUpdate(lat, lng);
    };
    map.on("dblclick", handler);
    return () => {
      map.off("dblclick", handler);
    };
  }, [map, handleCoordinateUpdate]);

  return <div ref={mapNode} className="w-full h-full relative" />;
}
