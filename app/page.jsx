import Map from "./components/map/Map.jsx";
import MpFinder from "./components/MileMarkerFinder/MpFinder";
import SaReference from "./components/ServiceAreaReference/SaReference";

export default function Home() {
  return (
    <div className='absolute top-10 bottom-0 w-full'>
      <MpFinder />
      <SaReference />
      <Map />
    </div>
  );
}
