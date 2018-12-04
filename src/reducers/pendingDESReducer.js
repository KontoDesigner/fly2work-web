import { ActionTypes as types } from '../constants/pendingDESConstants'

var defaultState = {
    staffs: []
}

export default function pendingDESReducer(state = defaultState, action) {
    switch (action.type) {
        case types.GET_STAFFS_SUCCESS:
            return {
                ...state,
                staffs: action.data.staffs
            }
        default:
            return state
    }
}
