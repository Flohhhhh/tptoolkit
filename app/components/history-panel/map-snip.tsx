"use client";

import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import Image from "next/image";
interface MapSnipProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  className?: string;
}

export function MapSnip({
  latitude,
  longitude,
  zoom = 16,
  className,
}: MapSnipProps) {
  // Validate coordinates
  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    isNaN(latitude) ||
    isNaN(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return null;
  }

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;
  if (!mapboxToken) {
    console.error("Mapbox token is not defined");
    return null;
  }

  const imageUrl = `https://api.mapbox.com/styles/v1/flohh/cmazsepqz002e01qv4kamdpmt/static/${longitude},${latitude},${zoom}/600x400?access_token=${mapboxToken}`;

  return (
    <div className={cn("relative w-full h-full", className)}>
      <Image
        unoptimized
        width={600}
        height={400}
        src={imageUrl}
        alt="Map preview of coordinates"
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <MapPin className="w-6 h-6 text-white drop-shadow-lg" />
      </div>
    </div>
  );
}
