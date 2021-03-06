import { ActionTypes as types } from '../constants/overviewConstants'

var defaultState = {
    staffs: []
}

export default function overviewReducer(state = defaultState, action) {
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
