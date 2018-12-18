import { ActionTypes as types } from '../constants/maintenanceConstants'

var defaultState = false

export default function maintenanceReducer(state = defaultState, action) {
    switch (action.type) {
        case types.GET_MAINTENANCE_SUCCESS:
            return action.data.maintenance
        default:
            return state
    }
}
