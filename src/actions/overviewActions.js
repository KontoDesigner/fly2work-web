import { ActionTypes as types } from '../constants/overviewConstants'
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'
import * as RestClient from '../infrastructure/restClient'

export function getStaffsSuccess(staffs) {
    return {
        type: types.GET_STAFFS_SUCCESS,
        data: { staffs }
    }
}

export function getStaffs() {
    return async function(dispatch) {
        dispatch(beginAjaxCall())

        try {
            const staffs = await RestClient.get('staff')

            dispatch(getStaffsSuccess(staffs))
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}
