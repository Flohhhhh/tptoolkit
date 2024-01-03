import Map from "./components/Map/Map.jsx";
import MpFinder from "./components/MileMarkerFinder/MpFinder";
import SaReference from "./components/ServiceAreaReference/SaReference";

export default function Home() {
  return (
    <div className=''>
      <MpFinder />
      <SaReference />
      <div className='fixed top-12 left-0 right-0 bottom-0'>
        <Map />
      </div>
    </div>
  );
}
