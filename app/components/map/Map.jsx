"use client";

import React, { useEffect, useState, useRef } from "react";
import { useMap } from "@/app/context/mapContext";
import ReactMapboxGl from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = (props) => {
  const { viewTarget } = props;
  const mapNode = useRef(null);
  const { map, setMap } = useMap();

  const Map = ReactMapboxGl({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN,
  });

  return (
    <Map
      className='absolute top-0 bottom-0 h-full w-full rounded-xl'
      projection='globe'
      center={[-74.2986829372431, 40.53355347618958]}
      zoom={[15]}
      doubleClickZoom={false}
      hash={false}
      antialias={false}
    />
  );
};

export default Map;
