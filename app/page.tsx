import Map from "./components/Map/Map";
import MpFinder from "./components/MileMarkerFinder/MpFinder";
import DetailsPanel from "./components/DetailsPanel/DetailsPanel";
import SaReference from "./components/ServiceAreaReference/SaReference";
import PaletteHandler from "@/app/components/Modals/Palette/PaletteHandler";
import Modal from "@/app/components/Modals/Modal";
import { MapRenderer } from "./components/Map/MapRenderer";

export default function Home() {
  // https://dribbble.com/shots/3264304-Industrial-Analytics-Dashboard-Map-View-Interface-Animation

  return (
    <div className="h-screen bg-background">
      {/* <Modal /> */}
      <MpFinder />
      <PaletteHandler />
      <DetailsPanel />
      <div className="fixed top-10 left-[320px] right-0 bottom-1 rounded-l-3xl overflow-hidden ">
        <SaReference />
        <Map />
      </div>
    </div>
  );
}
