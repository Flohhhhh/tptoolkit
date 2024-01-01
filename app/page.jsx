import MpFinder from "./components/MileMarkerFinder/MpFinder.jsx";
import SaReference from "./components/ServiceAreaReference/SaReference.jsx";


export default function Home() {

  return (
    <div className='min-h-screen max-w-3xl mx-auto gap-4 px-8 mb-12'>
      <div className="flex flex-col gap-4">
        <MpFinder />
        <SaReference />
      </div>
    </div>
  );
}
