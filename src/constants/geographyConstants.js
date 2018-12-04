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

export var GetStatuses = () => {
    return [Statuses.PendingBTT, Statuses.PendingDES, Statuses.Confirmed]
}
