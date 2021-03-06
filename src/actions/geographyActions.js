import { ActionTypes as types } from '../constants/geographyConstants'
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'
import * as RestClient from '../infrastructure/restClient'

const BASE = 'geography'

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
            const flights = await RestClient.get(`${BASE}/flights`)

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
            const sourceMarkets = await RestClient.get(`${BASE}/sourceMarkets`)

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
            const seasons = await RestClient.get(`${BASE}/seasons`)

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
            const flightStatuses = await RestClient.get(`${BASE}/flightStatuses`)

            dispatch(getFlightStatusesSuccess(flightStatuses))
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
            const destinations = await RestClient.get(`${BASE}/destinations`)

            dispatch(getDestinationsSuccess(destinations))
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}

export function getIataCodesSuccess(iataCodes) {
    return {
        type: types.GET_IATACODES_SUCCESS,
        data: { iataCodes }
    }
}

export function getIataCodes() {
    return async function(dispatch) {
        dispatch(beginAjaxCall())

        try {
            const iataCodes = await RestClient.get(`${BASE}/iatacodes`)

            dispatch(getIataCodesSuccess(iataCodes))
        } catch (error) {
            dispatch(ajaxCallError(error))

            throw error
        }
    }
}
