import { ActionTypes as types } from '../constants/maintenanceConstants'
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'
import * as RestClient from '../infrastructure/restClient'

export function getMaintenanceSuccess(maintenance) {
    return {
        type: types.GET_MAINTENANCE_SUCCESS,
        data: { maintenance }
    }
}

export function getMaintenance() {
    return async function(dispatch) {
        dispatch(beginAjaxCall())

        try {
            const maintenance = await RestClient.get('maintenance')

            dispatch(getMaintenanceSuccess(maintenance))

            return maintenance
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}
