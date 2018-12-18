import { ActionTypes as types } from '../constants/userConstants'
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'
import * as RestClient from '../infrastructure/restClient'

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
            const user = await RestClient.get('user/getuser')

            dispatch(getUserSuccess(user))
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}
