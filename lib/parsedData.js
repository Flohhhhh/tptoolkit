import { data } from '../public/locationData'

export const parkwayData = {
    exits: {
        northbound: [],
        southbound: []
    },
    serviceAreas: [],
    tolls: [] 
}

export const turnpikeData = {
    interchanges: [
        {label: "INT1", mp: "", ramps: []},
        {label: "INT2", mp: "", ramps: []},
        {label: "INT3", mp: "", ramps: []},
        {label: "INT4", mp: "", ramps: []},
        {lavel: "INT5", mp: "", ramps: []},
        {label: "INT6", mp: "", ramps: []},
        {label: "INT7", mp: "", ramps: []},
        {label: "INT7A", mp: "", ramps: []},
        {label: "INT8", mp: "", ramps: []},
        {label: "INT8A", mp: "", ramps: []},
        {label: "INT9", mp: "", ramps: []},
        {label: "INT10", mp: "", ramps: []},
        {label: "INT11", mp: "", ramps: []},
        {label: "INT12", mp: "", ramps: []},
        {label: "INT13", mp: "", ramps: []},
        {label: "INT13A", mp: "", ramps: []},
        {label: "INT14", mp: "", ramps: []},
        {label: "INT14A", mp: "", ramps: []},
        {label: "INT14B", mp: "", ramps: []},
        {label: "INT14C", mp: "", ramps: []},
        {label: "INT15W", mp: "", ramps: []},
        {label: "INT15E", mp: "", ramps: []},
        {label: "INT15X", mp: "", ramps: []},
        {label: "INT16W", mp: "", ramps: []},
        {label: "INT16E-18E", mp: "", ramps: []},
        {label: "INT17", mp: "", ramps: []},
        {label: "INT18W", mp: "", ramps: []},
        {label: "INT19W", mp: "", Ramp: []},
        
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
}

data.forEach((item) => {
    if (item.road === "GSP") {
        switch (item.type) {
            case "EXIT":
            case "ENTRANCE":
            case "RAMP":
                if (item.dir === "NB") {
                    parkwayData.exits.northbound.push(item);
                } else if (item.dir === "SB") {
                    parkwayData.exits.southbound.push(item);
                }
            case "SERVICE PLAZA":
                parkwayData.serviceAreas.push(item);
            case "TOLL PLAZA": 
                parkwayData.tolls.push(item);
            default:
                return
        }
    } else if (item.road === "TP") {
        switch (item.type) {
            case "RAMP":
                const target = item.exitNum
                const interchange = turnpikeData.interchanges.find((o) => {return o.label===`INT${target}`});

                if (!interchange) {
                    // console.log("Did not find interchange")
                    return
                }
                interchange.ramps.push(item);
                return
        }
    }
})

// console.log(turnpikeData)
