import { ActionTypes as types, UserTypes as userTypes } from '../constants/userConstants'
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'

export function getUserSuccess(user) {
    return {
        type: types.GET_USER_SUCCESS,
        data: { user }
    }
}

export function getUser() {
    return async function(dispatch) {
        dispatch(beginAjaxCall())

        try {
            const user = {
                id: 1,
                userType: userTypes.BTT
            }

            dispatch(getUserSuccess(user))
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}
