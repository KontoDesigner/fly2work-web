import { ActionTypes as types } from '../constants/overviewConstants'
import { beginAjaxCall, ajaxCallError, endAjaxCall } from './ajaxStatusActions'
import * as RestClient from '../infrastructure/restClient'
import { toastr } from 'react-redux-toastr'
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
            const staffs = await RestClient.get('staff')

            dispatch(getStaffsSuccess(staffs))
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}

export function deleteStaffs(staffIds) {
    return async function(dispatch) {
        dispatch(beginAjaxCall())

        for (var id of staffIds) {
            const req = {
                id
            }

            try {
                const res = await RestClient.post('staff/delete', req)

                if (res && res.ok === true) {
                    console.log('Request has been deleted', res)
                } else {
                    console.log('Could not delete request', res)

                    if (res && res.errors) {
                        toastr.error('', `Could not delete request - ${res.errors.join(', ')}`)
                    } else {
                        toastr.error('', 'Could not delete request')
                    }
                }
            } catch (error) {
                dispatch(ajaxCallError(error))

                throw error
            }
        }

        dispatch(getStaffCount())
        dispatch(getStaffs())
        dispatch(endAjaxCall())

        toastr.success('', 'Requests has been deleted')
    }
}
