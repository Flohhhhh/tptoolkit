import { Button } from "@/components/ui/button";
import { pushModal } from "@/components/dialogs";
import { Fuel, MapPin } from "lucide-react";

export default function ServiceAreaButton() {
  return (
    <Button
      variant="outline"
      className="justify-start"
      icon={<Fuel className="size-4 text-muted-foreground" />}
      onClick={() => {
        pushModal("ServiceAreasReference");
      }}
    >
      Service Area Reference
    </Button>
  );
}
