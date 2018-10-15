import * as restClient from '../infrastructure/restClient'

export async function getAirports() {
  const airports = await restClient.get('airports')

  return airports
}

export async function getFlights() {
  const flights = await restClient.get('flights')

  return flights
}
