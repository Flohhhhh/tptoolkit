"use client";

import { pushModal } from "@/components/dialogs";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
const SaReference = () => {
  return (
    <Button
      variant="outline"
      className="absolute top-3 left-3 z-10 rounded-xl text-xs"
      onClick={() => {
        pushModal("ServiceAreasReference");
      }}
      iconPosition="right"
      icon={<MapPin className="w-4 h-4" />}
    >
      Service Area Reference
    </Button>
  );
};

export default SaReference;
