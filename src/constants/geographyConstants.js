import keyMirror from 'keymirror'

export var ActionTypes = keyMirror({
    GET_FLIGHTS_SUCCESS: null,
    GET_AIRPORTS_SUCCESS: null,
    GET_SOURCEMARKETS_SUCCESS: null,
    GET_SEASONS_SUCCESS: null,
    GET_FLIGHTSTATUSES_SUCCESS: null,
    GET_ROLES_SUCCESS: null,
    GET_DESTINATIONS_SUCCESS: null,
    GET_IATACODES_SUCCESS: null
})

export var Statuses = keyMirror({
    New: null,
    PendingBTT: null,
    PendingDES: null,
    Confirmed: null
})

export var ConfirmedStatuses = keyMirror({
    Cancelled: null,
    Modified: null
})

export var GetBSStatuses = () => {
    return [Statuses.PendingBTT, Statuses.PendingDES]
}

export var GetStatuses = () => {
    return [Statuses.PendingBTT, Statuses.PendingDES, Statuses.Confirmed]
}

export var GetConfirmedStatuses = () => {
    return [ConfirmedStatuses.Cancelled, ConfirmedStatuses.Modified]
}
