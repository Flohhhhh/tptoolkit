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
      return <ArrowUpRightSquare className="size-5" />;
    case "ramp":
      return <Merge className="size-5" />;
    case "entrance":
      return <ArrowUpLeftSquare className="size-5" />;
    case "milepost":
      return <GitCommitVertical className="size-5" />;
    case "service_plaza":
      return <Fuel className="size-5" />;
    case "toll_plaza":
      return <Receipt className="size-5" />;
    case "cut":
    case "u_turn":
      return <UndoDot className="size-5" />;
    case "parking":
      return <ParkingSquare className="size-5" />;
    default:
      return <HelpCircle className="size-5" />;
  }
};

export default LocationTypeIcon;
