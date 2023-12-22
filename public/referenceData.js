

const referenceData = {
    turnpike: {
        interchanges: [
            {label: "INT1", mp: ""},
            {label: "INT2", mp: ""},
            {label: "INT3", mp: ""},
            {label: "INT4", mp: ""},
            {lavel: "INT5", mp: ""},
            {label: "INT6", mp: ""},
            {label: "INT7", mp: ""},
            {label: "INT7A", mp: ""},
            {label: "INT8", mp: ""},
            {label: "INT8A", mp: ""},
            {label: "INT9", mp: ""},
            {label: "INT10", mp: ""},
            {label: "INT11", mp: ""},
            
        ],
        servicePlazas: [
            {
                label: "1S",
                name: "Clara Barton",
                mp: "5.4",
                station: "D020",
                ramps: []
            },
            
        ]
    },
    parkway : {
        exits: {
            
        }
    }
}

// data.forEach((item) => {
//     if (item.road === "GSP") {
//         // switch (item.type) {
//         //     case "EXIT":
//         //     case "ENTRANCE":
//         //         if (item.dir === "N") {
//         //             parkwayData.exits.northbound.push(item);
//         //         } else if (item.dir === "S") {
//         //             parkwayData.exits.southbound.push(item);
//         //         }
//         //     case "SERVICE PLAZA":
//         //         parkwayData.serviceAreas.push(item);
//         //     case "TOLL PLAZA": 
//         //         parkwayData.tolls.push(item);
//         //     default:
//         //         return
//         // }
//     } else if (item.road === "TP") {
//         switch (item.type) {
//             case "RAMP":
//                 if (item.name.includes("INT")) {
//                     const interchange = Number(item.name.substr(6, 2))
//                     referenceData.turnpike.interchanges[interchange - 1].ramps.push(item)
//                 } else if (item.name.includes("SA")){
//                     const serviceArea = txt.match(/\d/g);
//                     referenceData.turnpike.serviceAreas[]
//                 }
               
//         }
//     }
// })
