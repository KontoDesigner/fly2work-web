export function populateInitialValues(initialValues, staff) {
    Object.keys(initialValues).forEach(function(key) {
        if (key === 'flights') {
            for (var i = 0; i < staff[key].length; i++) {
                populateInitialFlightValues(initialValues, staff, key, i)
            }
        } else if (!staff.hasOwnProperty(key) || staff[key] === undefined || staff[key] === null) {
            staff[key] = initialValues[key]
        }
    })
}

function populateInitialFlightValues(initialValues, staff, key, i) {
    Object.keys(initialValues.flights[0]).forEach(function(flightKey) {
        if (!staff[key][i].hasOwnProperty(flightKey) || staff[key][i][flightKey] === undefined || staff[key][i][flightKey] === null) {
            staff[key][i][flightKey] = initialValues.flights[0][flightKey]
        }
    })
}

export function parseCost(val) {
    var parsed = parseFloat(val)

    if (isNaN(parsed)) {
        return 0
    }

    return parsed
}

export function getTotalCost(flights) {
    let totalCost = 0

    if (flights && flights.length > 0) {
        for (const flight of flights) {
            totalCost =
                totalCost +
                (parseCost(flight.flightCost ? flight.flightCost.replace(',', '.') : 0) +
                    parseCost(flight.xbagCost ? flight.xbagCost.replace(',', '.') : 0) +
                    parseCost(flight.hotelCost ? flight.hotelCost.replace(',', '.') : 0))
        }
    }

    return totalCost.toFixed(2)
}
