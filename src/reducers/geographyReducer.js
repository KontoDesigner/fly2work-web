import { ActionTypes as types } from '../constants/geographyConstants'

var defaultState = {
    flights: null,
    airports: null,
    sourceMarkets: null,
    seasons: null,
    flightStatuses: null,
    roles: null,
    destinations: null
}

export default function geographyReducer(state = defaultState, action) {
    switch (action.type) {
        case types.GET_FLIGHTS_SUCCESS:
            return {
                ...state,
                flights: action.data.flights
            }
        case types.GET_AIRPORTS_SUCCESS:
            return {
                ...state,
                airports: action.data.airports
            }
        case types.GET_SOURCEMARKETS_SUCCESS:
            return {
                ...state,
                sourceMarkets: action.data.sourceMarkets
            }
        case types.GET_SEASONS_SUCCESS:
            return {
                ...state,
                seasons: action.data.seasons
            }
        case types.GET_FLIGHTSTATUSES_SUCCESS:
            return {
                ...state,
                flightStatuses: action.data.flightStatuses
            }
        case types.GET_ROLES_SUCCESS:
            return {
                ...state,
                roles: action.data.roles
            }
        case types.GET_DESTINATIONS_SUCCESS:
            return {
                ...state,
                destinations: action.data.destinations
            }
        default:
            return state
    }
}
