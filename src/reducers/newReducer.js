import { ActionTypes as types } from '../constants/newConstants'

var defaultState = {
    staffs: []
}

export default function newReducer(state = defaultState, action) {
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
