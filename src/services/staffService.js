import * as restClient from '../infrastructure/restClient'

export async function getStaff(id) {
  const staff = await restClient.get(`people/${id}`)

  return staff
}

export async function getNew() {
  const staffs = await restClient.get('people')

  return staffs.filter(s => s.status === 'new')
}

export async function getSubmitted() {
  const staffs = await restClient.get('people')

  return staffs
}

export async function getPending() {
  const staffs = await restClient.get('people')

  return staffs
}

export async function getConfirmed() {
  const staffs = await restClient.get('people')

  return staffs
}

export async function getOverview() {
  const staffs = await restClient.get('peopsle')

  return staffs
}

export async function getCount() {
  return {
    new: 1,
    submitted: 2,
    pending: 3,
    confirmed: 4,
    overview: 5
  }
}
