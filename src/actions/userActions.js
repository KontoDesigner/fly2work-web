import { ActionTypes as types } from '../constants/userConstants'
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'
import * as RestClient from '../infrastructure/restClient'

export function getUserRolesSuccess(userRoles) {
    return {
        type: types.GET_USERROLES_SUCCESS,
        data: { userRoles }
    }
}

export function getUserRoles() {
    return async function(dispatch) {
        dispatch(beginAjaxCall())

        try {
            const userRoles = await RestClient.get('user/getuserroles')

            dispatch(getUserRolesSuccess(userRoles))
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}
