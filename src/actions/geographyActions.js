import { ActionTypes as types } from '../constants/geographyConstants'
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'
import * as RestClient from '../infrastructure/restClient'

export function getFlightsSuccess(flights) {
    return {
        type: types.GET_FLIGHTS_SUCCESS,
        data: { flights }
    }
}

export function getFlights() {
    return async function(dispatch) {
        dispatch(beginAjaxCall())

        try {
            const flights = await RestClient.get(`flights`)

            dispatch(getFlightsSuccess(flights))
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}

export function getSourceMarketsSuccess(sourceMarkets) {
    return {
        type: types.GET_SOURCEMARKETS_SUCCESS,
        data: { sourceMarkets }
    }
}

export function getSourceMarkets() {
    return async function(dispatch) {
        dispatch(beginAjaxCall())

        try {
            const sourceMarkets = await RestClient.get(`sourceMarkets`)

            dispatch(getSourceMarketsSuccess(sourceMarkets))
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}

export function getSeasonsSuccess(seasons) {
    return {
        type: types.GET_SEASONS_SUCCESS,
        data: { seasons }
    }
}

export function getSeasons() {
    return async function(dispatch) {
        dispatch(beginAjaxCall())

        try {
            const seasons = await RestClient.get(`seasons`)

            dispatch(getSeasonsSuccess(seasons))
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}

export function getFlightStatusesSuccess(flightStatuses) {
    return {
        type: types.GET_FLIGHTSTATUSES_SUCCESS,
        data: { flightStatuses }
    }
}

export function getFlightStatuses() {
    return async function(dispatch) {
        dispatch(beginAjaxCall())

        try {
            const flightStatuses = await RestClient.get(`flightStatuses`)

            dispatch(getFlightStatusesSuccess(flightStatuses))
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}

export function getRolesSuccess(roles) {
    return {
        type: types.GET_ROLES_SUCCESS,
        data: { roles }
    }
}

export function getRoles() {
    return async function(dispatch) {
        dispatch(beginAjaxCall())

        try {
            const roles = await RestClient.get(`roles`)

            dispatch(getRolesSuccess(roles))
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}

export function getDestinationsSuccess(destinations) {
    return {
        type: types.GET_DESTINATIONS_SUCCESS,
        data: { destinations }
    }
}

export function getDestinations() {
    return async function(dispatch) {
        dispatch(beginAjaxCall())

        try {
            const destinations = await RestClient.get(`destinations`)

            dispatch(getDestinationsSuccess(destinations))
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}
