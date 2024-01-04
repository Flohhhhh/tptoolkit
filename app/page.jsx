import Map from "./components/Map/Map.jsx";
import MpFinder from "./components/MileMarkerFinder/MpFinder";
import DetailsPanel from "./components/DetailsPanel/DetailsPanel"
import SaReference from "./components/ServiceAreaReference/SaReference";

export default function Home() {
  return (
    <div className='h-screen bg-white dark:bg-shark-800'>
      <MpFinder />
      
      <DetailsPanel />
      <div className='fixed top-10 left-[320px] right-0 bottom-1 rounded-l-3xl overflow-hidden'>
        <SaReference />
        <Map />
      </div>
    </div>
  );
}
