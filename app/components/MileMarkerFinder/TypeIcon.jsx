import { ArrowUpRightSquare, ArrowUpLeftSquare, Fuel, HelpCircle, GitCommitVertical, Merge, Receipt, UndoDot } from 'lucide-react';

const TypeIcon = (props) => {
    const { type } = props;
    switch (type) {
        case "EXIT":
            return <ArrowUpRightSquare size={20} />
        case "RAMP":
            return <Merge size={20} />
        case "ENTRANCE":
            return <ArrowUpLeftSquare size={20} />
        case "MILEPOST":
            return <GitCommitVertical size={20} />
        case "SERVICE PLAZA":
            return <Fuel size={20} />
        case "TOLL PLAZA":
            return <Receipt size={20} />
        case "CUT":
        case "U-TURN":
            return <UndoDot size={20} />
        default:
            return <HelpCircle size={20} />
    }
}

export default TypeIcon;