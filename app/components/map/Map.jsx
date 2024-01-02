"use client";

import React, { useEffect, useState, useRef } from "react";
import { useMap } from "@/app/context/mapContext";
import { MapRenderer } from "./MapRenderer";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = (props) => {
  const { viewTarget } = props;
  const mapNode = useRef(null);
  const { map, setMap } = useMap();

  return <MapRenderer ref={mapNode} map={map} setMap={setMap} />;
};

export default Map;
