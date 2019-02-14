import { ActionTypes as types } from '../constants/pendingDESConstants'
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
            const staffs = await RestClient.get(`staff/getbystatus/${statuses.PendingDES}`)

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
            staff.attachments = null

            const res = await RestClient.post('staff', staff)

            if (res && res.ok === true) {
                console.log('Request has been updated', res)

                toastr.success('', 'Request has been updated', res)

                dispatch(getStaffCount())
            } else {
                console.log('Could not update request', res)

                if (res && res.error) {
                    toastr.error('', res.error)
                } else {
                    toastr.error('', 'Could not update request')
                }
            }

            dispatch(endAjaxCall())

            return res
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}

export function deleteStaff(req) {
    return async function(dispatch) {
        dispatch(beginAjaxCall())

        try {
            const res = await RestClient.post('staff/delete', req)

            if (res && res.ok === true) {
                console.log('Request has been deleted', res)

                toastr.success('', 'Request has been deleted', res)

                dispatch(getStaffCount())

                dispatch(endAjaxCall())

                return true
            } else {
                console.log('Could not delete request', res)

                if (res && res.errors) {
                    toastr.error('', `Could not delete request - ${res.errors.join(', ')}`)
                } else {
                    toastr.error('', 'Could not delete request')
                }
            }

            dispatch(endAjaxCall())
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }

        return false
    }
}
