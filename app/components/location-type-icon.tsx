import {
  ArrowUpRightSquare,
  ArrowUpLeftSquare,
  Fuel,
  HelpCircle,
  GitCommitVertical,
  Merge,
  Receipt,
  UndoDot,
  ParkingSquare,
  TrafficCone,
} from "lucide-react";

const LocationTypeIcon = (props: { type: TPLocation["type"] }) => {
  const { type } = props;
  switch (type) {
    case "exit":
      return <ArrowUpRightSquare className="size-4" />;
    case "ramp":
      return <Merge className="size-4" />;
    case "entrance":
      return <ArrowUpLeftSquare className="size-4" />;
    case "milepost":
      return <GitCommitVertical className="size-4" />;
    case "service_plaza":
      return <Fuel className="size-4" />;
    case "toll_plaza":
      return <Receipt className="size-4" />;
    case "cut":
    case "u_turn":
      return <UndoDot className="size-4" />;
    case "parking":
      return <ParkingSquare className="size-4" />;
    default:
      return <HelpCircle className="size-4" />;
  }
};

export default LocationTypeIcon;
