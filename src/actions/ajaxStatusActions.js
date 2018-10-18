import { ActionTypes as types } from '../constants/ajaxStatusConstants'

export function beginAjaxCall() {
    return { type: types.BEGIN_AJAX_CALL }
}

export function endAjaxCall() {
    return { type: types.END_AJAX_CALL }
}

export function ajaxCallError() {
    return { type: types.AJAX_CALL_ERROR }
}
