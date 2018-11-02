import { ActionTypes as types } from '../constants/userConstants'

var defaultState = {
    user: null
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case types.GET_USER_SUCCESS:
            return action.data.user
        default:
            return state
    }
}
