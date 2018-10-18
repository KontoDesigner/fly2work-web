import { ActionTypes as types } from '../constants/menuConstants'
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'
import * as RestClient from '../infrastructure/restClient'

export function handleIsOpen(isOpen) {
    return {
        type: types.HANDLE_ISOPEN,
        data: { isOpen }
    }
}

export function getStaffCountSuccess(staffCount) {
    return {
        type: types.GET_STAFFCOUNT_SUCCESS,
        data: { staffCount }
    }
}

export function getStaffCount() {
    return async function(dispatch) {
        dispatch(beginAjaxCall())

        try {
            const staffCount = await RestClient.get(`staffCount`)

            dispatch(getStaffCountSuccess(staffCount))
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}
