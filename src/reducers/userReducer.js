import { ActionTypes as types } from '../constants/userConstants'

var defaultState = {
    userRoles: []
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case types.GET_USERROLES_SUCCESS:
            return {
                ...state,
                userRoles: action.data.userRoles
            }
        default:
            return state
    }
}
