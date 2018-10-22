import { ActionTypes as types } from '../constants/newConstants'
import { beginAjaxCall, ajaxCallError, endAjaxCall } from './ajaxStatusActions'
import * as RestClient from '../infrastructure/restClient'
import { toastr } from 'react-redux-toastr'

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
            const staffs = await RestClient.get(`people`)

            dispatch(getStaffsSuccess(staffs))
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}

export function insertStaff(staff) {
    return async function(dispatch) {
        dispatch(beginAjaxCall())

        try {
            const res = await RestClient.post(`http://localhost:5000/new`, staff, false)

            if (res && res.ok === true) {
                console.log('Staff has been saved')

                toastr.success('', 'Staff has been saved', res)
            } else {
                console.log('Could not save staff', res)

                toastr.error('', 'Could not save staff')
            }

            dispatch(endAjaxCall())
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}
