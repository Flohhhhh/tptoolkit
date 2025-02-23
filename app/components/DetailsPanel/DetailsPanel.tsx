"use client";

import { Transition } from "@headlessui/react";
import { useMap } from "@/lib/context/mapContext";
import { directionToRoadDirection } from "@/lib/helpers/conversions";

// Define field display configuration
const FIELD_CONFIG: Record<string, { label: string; show: boolean }> = {
  name: { label: "Name", show: true },
  roadway: { label: "Roadway", show: true },
  milepost: { label: "Mile Post", show: true },
  direction: { label: "Direction", show: true },
  type: { label: "Type", show: true },
  exit_num: { label: "Exit Number", show: true },
  city_name: { label: "City", show: true },
  county_name: { label: "County", show: true },
  station_area: { label: "Station Area", show: true },
  distance: { label: "Distance", show: false },
  x_old: { label: "X", show: true },
  y_old: { label: "Y", show: true },
  cityAbv: { label: "City Abbreviation", show: false },
  commonName: { label: "Common Name", show: false },
  created_at: { label: "Created At", show: false },
  ft_pt: { label: "FT/PT", show: false },
  id: { label: "ID", show: false },
  location: { label: "Location", show: false },
  mun_code: { label: "Municipality Code", show: false },
  name_1: { label: "Name 1", show: false },
  name_2: { label: "Name 2", show: false },
  name_3: { label: "Name 3", show: false },
  name_4: { label: "Name 4", show: false },
  road: { label: "Road", show: false },
  station_old: { label: "Old Station", show: false },
  troop_old: { label: "Old Troop", show: false },
  unit_old: { label: "Zone", show: true },
  zip_code: { label: "ZIP Code", show: true },
};

const formatValue = (value: any, key: keyof TPLocation): string => {
  if (key === "common_name" || key === "name") {
    return value.toString().toUpperCase();
  }
  if (key === "direction") {
    return directionToRoadDirection(value);
  }
  if (value === null || value === undefined) return "";
  if (typeof value === "number") return value.toString();
  if (typeof value === "string") {
    // Capitalize first letter of each word and replace underscores with spaces
    return value
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  return value.toString();
};

const DetailsPanel = () => {
  const { selected } = useMap();

  const renderField = (key: keyof TPLocation, value: any) => {
    const config = FIELD_CONFIG[key];
    if (!config?.show || !value) return null;

    return (
      <div
        key={key}
        className="grid grid-cols-2 text-sm px-2 py-1 text-muted-foreground odd:bg-muted/50 border-b border-accent"
      >
        <span className="opacity-75">{config.label}: </span>
        <span className="ml-2 col-start-2">{formatValue(value, key)}</span>
      </div>
    );
  };

  return (
    <Transition
      as="div"
      className="z-10 absolute top-12 right-2 w-96 p-4 rounded-xl bg-background border border-accent shadow-lg"
      show={!!selected}
      enter="ease-out duration-100"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-100"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div>
        <h1 className="text-muted-foreground font-semibold">
          Location Details
        </h1>
        <div className="flex flex-col my-2 py-1 rounded ">
          {selected &&
            Object.entries(selected).map(([key, value]) =>
              renderField(key as keyof TPLocation, value)
            )}
        </div>
      </div>
    </Transition>
  );
};

export default DetailsPanel;
