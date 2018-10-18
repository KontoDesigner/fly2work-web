import { ActionTypes as types } from '../constants/menuConstants'

var defaultState = {
    isOpen: true,
    staffCount: null
}

export default function menuReducer(state = defaultState, action) {
    switch (action.type) {
        case types.GET_STAFFCOUNT_SUCCESS:
            return {
                ...state,
                staffCount: action.data.staffCount
            }
        case types.HANDLE_ISOPEN:
            return {
                ...state,
                isOpen: action.data.isOpen
            }
        default:
            return state
    }
}
