import * as restClient from '../infrastructure/restClient'

export async function getNew() {
  const staffs = await restClient.get('http://localhost:3001/people')

  return staffs
}

export async function getSubmitted() {
  const staffs = await restClient.get('http://localhost:3001/people')

  return staffs
}

export async function getPending() {
  const staffs = await restClient.get('http://localhost:3001/people')

  return staffs
}

export async function getConfirmed() {
  const staffs = await restClient.get('http://localhost:3001/people')

  return staffs
}

export async function getOverview() {
  const staffs = await restClient.get('http://localhost:3001/people')

  return staffs
}

export async function getCount() {
  return {
    new: 1,
    submitted: 2,
    pending: 3,
    confirmed: 4,
    overview: 5,
  }
}
