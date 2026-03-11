import { Button } from "@/components/ui/button";
import { pushModal } from "@/components/dialogs";
import { Fuel } from "lucide-react";
import { trackOpenServiceAreaReference } from "@/lib/analytics/events";

export default function ServiceAreaButton() {
  return (
    <Button
      variant="outline"
      className="justify-start"
      icon={<Fuel className="size-4 text-muted-foreground" />}
      onClick={() => {
        trackOpenServiceAreaReference();
        pushModal("ServiceAreasReference");
      }}
    >
      Service Area Reference
    </Button>
  );
}
