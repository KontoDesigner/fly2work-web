import * as restClient from '../infrastructure/restClient'

export async function getAirports() {
    const airports = await restClient.get('airports')

    return airports
}

export async function getFlights() {
    const flights = await restClient.get('flights')

    return flights
}

export async function getSourceMarkets() {
    const sourceMarkets = await restClient.get('sourceMarkets')

    return sourceMarkets
}

export async function getSeasons() {
    const seasons = await restClient.get('seasons')

    return seasons
}

export async function getFlightStatuses() {
    const flightStatuses = await restClient.get('flightStatuses')

    return flightStatuses
}

export async function getRoles() {
    const roles = await restClient.get('roles')

    return roles
}

export async function getDestinations() {
    const roles = await restClient.get('roles')

    return roles
}
