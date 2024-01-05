"use client";

import React, { useEffect, useState, useRef } from "react";
import { useMap } from "@/app/context/mapContext";
import { MapRenderer } from "./MapRenderer";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = (props) => {
  const mapNode = useRef(null);

  return <MapRenderer ref={mapNode}/>;
};

export default Map;
