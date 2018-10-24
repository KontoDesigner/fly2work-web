import keyMirror from 'keymirror'

export var ActionTypes = keyMirror({
    GET_FLIGHTS_SUCCESS: null,
    GET_AIRPORTS_SUCCESS: null,
    GET_SOURCEMARKETS_SUCCESS: null,
    GET_SEASONS_SUCCESS: null,
    GET_FLIGHTSTATUSES_SUCCESS: null,
    GET_ROLES_SUCCESS: null,
    GET_DESTINATIONS_SUCCESS: null
})

export var Statuses = keyMirror({
    New: null,
    Submitted: null,
    Pending: null,
    Confirmed: null,
    Overview: null
})

export var GetStatuses = () => {
    return [Statuses.Submitted, Statuses.Pending, Statuses.Confirmed, Statuses.Overview]
}
