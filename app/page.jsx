import React from "react";
import MpFinder from "./components/MileMarkerFinder/MpFinder.jsx";
import SaReference from "./components/ServiceAreaReference/SaReference.jsx";

export default function Home() {
  return (
    <div className='min-h-screen max-w-7xl mx-auto gap-4 px-8 mb-12'>
      <div className="grid lg:grid-cols-2 gap-2">
        <MpFinder />
        <SaReference />
      </div>
    </div>
  );
}
