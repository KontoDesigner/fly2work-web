import { ActionTypes as types } from '../constants/userConstants'

var defaultState = {
    userName: null,
    userEmail: null,
    userRoles: []
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case types.GET_USER_SUCCESS:
            return {
                ...state,
                userName: action.data.user.userName,
                userEmail: action.data.user.userEmail,
                userRoles: action.data.user.userRoles
            }
        default:
            return state
    }
}
