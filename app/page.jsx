"use client";
import React, { useState } from "react";
import MpFinder from "./components/MileMarkerFinder/MpFinder";
import MileMarker from "./components/MileMarkerFinder/MileMarker.jsx";

export default function Home() {
  return (
    <main className='flex min-h-screen max-w-3xl mx-auto flex-col items-center justify-center gap-4 px-8'>
      <h1 className='text-5xl font-bold '>Mile Marker Finder</h1>
      <p>
        This tool is a reverse geocoder for the mile markers on the Garden State
        Parkway and New Jersey Turnpike.
        <br /> <br />
        To use the tool enter coordinates in the search box and click find. The
        nearest mile markers will be displayed, and the closest one will be
        automatically copied to your clipboard!
      </p>
      <p className='italic text-red-400'>* Data is currently incomplete!</p>
      <h2 className='text-2xl font-bold mt-10'>Try these examples!</h2>
      <p className='text-gray-300'>
        38.9623188, -74.9021912
        <span className='float-right opacity-80 pointer-events-none ml-8'>
          (MP 0.1)
        </span>
      </p>
      <p className='text-gray-300'>
        39.0910069, -74.8115132
        <span className='float-right opacity-80 pointer-events-none ml-8'>
          (MP 10.3)
        </span>
      </p>
      <p className='text-gray-300 mb-12'>
        39.3245285, -74.6163611
        <span className='float-right opacity-80 pointer-events-none ml-8'>
          (MP 34.5)
        </span>
      </p>

      <MpFinder />
    </main>
  );
}
