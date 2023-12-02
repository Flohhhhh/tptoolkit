import React from "react";
import MpFinder from "./components/MileMarkerFinder/MpFinder.jsx";

export default function Home() {
  return (
    <div className='min-h-screen max-w-3xl mx-auto gap-4 px-8 mb-12'>

      <MpFinder />

      <h1 className='text-5xl font-bold text-shark-800 dark:text-shark-100 mt-8'>
        Mile Marker Finder
      </h1>
      <p className=' text-shark-800 dark:text-shark-100'>
        This tool is a reverse geocoder for the mile markers, exits, and other
        geography along the Garden State Parkway and New Jersey Turnpike.
        <br /> <br />
        To use the tool enter coordinates in the search box and click find. The
        nearest mile markers will be displayed, and the closest one will be
        automatically copied to your clipboard!
      </p>
      <h2 className='text-2xl font-bold mt-10 text-shark-800 dark:text-shark-100'>
        Try these examples!
      </h2>
      <p className='text-shark-500 dark:text-shark-300 mt-4'>
        40.486006, -74.302666
        <span className='float-right opacity-80 pointer-events-none ml-8'>
          (GSP Near Raritan Tolls)
        </span>
      </p>
      <p className='text-shark-500 dark:text-shark-300 mt-4'>
        39.0910069, -74.8115132
        <span className='float-right opacity-80 pointer-events-none ml-8'>
          (MP 10.3)
        </span>
      </p>
      <p className='text-shark-500 dark:text-shark-300 mt-4 mb-12'>
      40.729232, -74.127451
        <span className='float-right opacity-80 pointer-events-none ml-8'>
          (Turnpike Near Interchange 15E)
        </span>
      </p>

      
    </div>
  );
}
