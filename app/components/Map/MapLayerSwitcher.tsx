"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Layers } from "lucide-react";

interface MapLayerSwitcherProps {
  mapStyle: string;
  setMapStyle: (style: string) => void;
}

const MapLayerSwitcher: React.FC<MapLayerSwitcherProps> = ({
  mapStyle,
  setMapStyle,
}) => {
  const { theme } = useTheme();

  return (
    <div>
      <Label
        htmlFor="map-layer-select"
        className="sr-only text-xs font-medium mb-1"
      >
        Map Layer
      </Label>
      <Select value={mapStyle} onValueChange={setMapStyle}>
        <SelectTrigger id="map-layer-select" className="shadow-xl">
          <Layers />
          {/* <SelectValue /> */}
        </SelectTrigger>
        <SelectContent className="shadow">
          <SelectItem value="streets">Street</SelectItem>
          <SelectItem value="satellite">Satellite</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MapLayerSwitcher;
