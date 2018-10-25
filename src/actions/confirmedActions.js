import { ActionTypes as types } from '../constants/confirmedConstants'
import { beginAjaxCall, ajaxCallError, endAjaxCall } from './ajaxStatusActions'
import * as RestClient from '../infrastructure/restClient'
import { toastr } from 'react-redux-toastr'
import { Statuses as statuses } from '../constants/geographyConstants'
import { getStaffCount } from '../actions/menuActions'

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
            const staffs = await RestClient.get(`staff/getbystatus/${statuses.Confirmed}`)

            dispatch(getStaffsSuccess(staffs))
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}

export function updateStaff(staff) {
    return async function(dispatch) {
        dispatch(beginAjaxCall())

        try {
            const res = await RestClient.post('staff', staff)

            if (res && res.ok === true) {
                console.log('Staff has been updated')

                toastr.success('', 'Staff has been updated', res)

                dispatch(getStaffCount())
            } else {
                console.log('Could not update staff', res)

                toastr.error('', 'Could not update staff')
            }

            dispatch(endAjaxCall())
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}
