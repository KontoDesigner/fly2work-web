import {
    ActionTypes as types,
    GetStatuses as getStatuses,
    GetConfirmedStatuses as getConfirmedStatuses,
    GetBSStatuses as getBSStatuses
} from '../constants/geographyConstants'

const typeOfFlights = [
    { value: 'End of season', label: 'End of season' },
    { value: 'Start of season', label: 'Start of season' },
    { value: 'Resignation', label: 'Resignation' }
]

const typeOfFlightsNew = [
    { value: 'Training', label: 'Training' },
    { value: 'Sick Leave', label: 'Sick Leave' },
    { value: 'Visa', label: 'Visa' },
    { value: 'SOS', label: 'SOS' },
    { value: 'Holiday', label: 'Holiday' }
]

const typeOfFlightsOther = [
    { value: 'Training', label: 'Training', disabled: 'yes' },
    { value: 'Sick Leave', label: 'Sick Leave', disabled: 'yes' },
    { value: 'Visa', label: 'Visa', disabled: 'yes' },
    { value: 'SOS', label: 'SOS', disabled: 'yes' },
    { value: 'Holiday', label: 'Holiday', disabled: 'yes' }
]

var defaultState = {
    flights: null,
    airports: null,
    sourceMarkets: null,
    seasons: null,
    flightStatuses: null,
    destinations: null,
    statuses: getStatuses(),
    bsStatuses: getBSStatuses(),
    typeOfFlights: [...typeOfFlights, ...typeOfFlightsOther],
    typeOfFlightsNew: typeOfFlightsNew,
    roles: [{ value: 'Mainline', label: 'Mainline' }, { value: 'Concept', label: 'Concept' }],
    iataCodes: null,
    travelTypes: [{ value: 'Charter', label: 'Charter' }, { value: 'Scheduled', label: 'Scheduled' }],
    currencies: [{ value: 'EUR', label: 'EUR' }, { value: 'GBP', label: 'GBP' }],
    paymentMethods: [{ value: 'CC', label: 'CC' }, { value: 'Charter', label: 'Charter' }, { value: 'Clarity', label: 'Clarity' }],
    confirmedStatuses: getConfirmedStatuses()
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
        case types.GET_IATACODES_SUCCESS:
            return {
                ...state,
                iataCodes: action.data.iataCodes
            }
        default:
            return state
    }
}
