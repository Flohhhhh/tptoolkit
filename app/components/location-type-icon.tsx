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
      return <ArrowUpRightSquare size={20} />;
    case "ramp":
      return <Merge size={20} />;
    case "entrance":
      return <ArrowUpLeftSquare size={20} />;
    case "milepost":
      return <GitCommitVertical size={20} />;
    case "service_plaza":
      return <Fuel size={20} />;
    case "toll_plaza":
      return <Receipt size={20} />;
    case "cut":
    case "u_turn":
      return <UndoDot size={20} />;
    case "parking":
      return <ParkingSquare size={20} />;
    default:
      return <HelpCircle size={20} />;
  }
};

export default LocationTypeIcon;
