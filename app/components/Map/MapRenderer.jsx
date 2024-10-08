"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { CopyToClipboard } from "@/lib/CopyToClipboard";
import { useSearch } from "@/lib/context/searchContext";
import { useMap } from "@/lib/context/mapContext";

export function MapRenderer(props) {
  const { theme } = useTheme();
  const { onMapLoad, onMapRemoved } = props;
  const { searchCoords, setEnteredCoords } = useSearch();
  const { map, setMap } = useMap();
  const [mapLoaded, setMapLoaded] = useState(false);

  // React ref to store a reference to the DOM node that will be used
  // as a required parameter `container` when initializing the mapbox-gl
  // will contain `null` by default
  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;
    // if the window object is not found, that means
    // the component is rendered on the server
    // or the dom node is not initialized, then return early
    if (typeof window === "undefined" || node === null) return;

    // otherwise, create a map instance
    const mapboxMap = new mapboxgl.Map({
      container: node,
      projection: "globe",
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN,
      center: [-74.2986829372431, 40.53355347618958],
      zoom: 15,
      doubleClickZoom: false,
      hash: false, //syncs map location with url
    });

    mapboxMap.on("style.load", () => {
      console.log("Map reading theme", theme);
      if (theme === "dark") {
        mapboxMap.setConfigProperty("basemap", "lightPreset", "night");
      } else {
        mapboxMap.setConfigProperty("basemap", "lightPreset", "day");
      }
    });

    // add navigation control (the +/- zoom buttons)
    mapboxMap.addControl(new mapboxgl.NavigationControl(), "bottom-left");
    // add scale control
    mapboxMap.addControl(new mapboxgl.ScaleControl(), "bottom-right");

    // // add attribution control
    // mapboxMap.addControl(
    //   new mapboxgl.AttributionControl({
    //     compact: true
    //   }),
    //   'bottom-right'
    // )

    // add click event listener
    // https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/
    mapboxMap.on("contextmenu", (e) => {
      // console.log(e);
      // log lat long
      // console.log("Lat:", e.lngLat.lat, "Long:", e.lngLat.lng);
      CopyToClipboard(`${e.lngLat.lat.toFixed(6)}, ${e.lngLat.lng.toFixed(6)}`);
    });

    mapboxMap.on("dblclick", (e) => {
      // console.log(e)
      e.preventDefault();
      // console.log(`Searching at ${e.lngLat.lat.toFixed(6)}, ${e.lngLat.lng.toFixed}`)
      setEnteredCoords(
        `${e.lngLat.lat.toFixed(6)}, ${e.lngLat.lng.toFixed(6)}`
      );
    });

    // save the map object to useState
    setMap(mapboxMap);

    // set cursor to default
    mapboxMap.getCanvas().style.cursor = "default";

    if (onMapLoad) mapboxMap.once("load", onMapLoad);

    return () => {
      mapboxMap.remove();
      if (onMapRemoved) onMapRemoved();
    };
  }, []);

  useEffect(() => {
    // console.log(map);
    if (!map) return;
    // console.log();
    console.log("Map reading theme", theme);
    if (theme === "dark") {
      map.setConfigProperty("basemap", "lightPreset", "night");
    } else {
      map.setConfigProperty("basemap", "lightPreset", "day");
    }
  }, [theme]);

  return <div ref={mapNode} className="w-full h-full" />;
}
