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
