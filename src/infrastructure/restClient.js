import axios from 'axios'
import config from './config'
import { toast } from 'react-toastify'

export async function get(url, useBaseUrl = true) {
  try {
    const baseUrl = useBaseUrl === true ? config.api : ''

    console.log(`[GET] ${baseUrl + url}`)

    const response = await axios.get(baseUrl + url)

    console.log(`[RESPONSE] ${JSON.stringify(response.data)}`)

    return response.data
  } catch (err) {
    console.log('Error GET', err)

    toast.error(`An unexpected error has occured: ${err}.`)

    throw new Error(err)
  }
}

export async function post(url, data, useBaseUrl = true) {
  try {
    const baseUrl = useBaseUrl === true ? config.api : ''

    console.log(`[POST] ${baseUrl + url} ${JSON.stringify(data)}`)

    const response = await axios.post(baseUrl + url, data)

    console.log(`[RESPONSE] ${JSON.stringify(response.data)}`)

    return response.data
  } catch (err) {
    toast.error('', `An unexpected error has occured: ${err}.`)

    console.log('Error POST', err)

    throw new Error(err)
  }
}

// export async function put(url, data) {
//     try {
//         const baseUrl = useBaseUrl === true ? Config.api : ''

//         Logger.trace(`[PUT] ${baseUrl + url} ${JSON.stringify(data)}`, 'RestClient')

//         const response = await axios.put(baseUrl + url, data)

//         Logger.trace(`[RESPONSE] ${JSON.stringify(response.data as T)}`, 'RestClient')

//         return response.data
//     } catch (err) {
//         toastr.error('', `An unexpected error has occured: ${err}.`)

//         Logger.error('Error PUT', 'RestClient', err)

//         throw new Error(err)
//     }
// }

// export async function del(url, data) {
//     try {
//         const baseUrl = useBaseUrl === true ? Config.api : ''

//         Logger.trace(`[DELETE] ${baseUrl + url} ${JSON.stringify(data)}`, 'RestClient')

//         const response = await axios.delete(baseUrl + url, data)

//         Logger.trace(`[RESPONSE] ${JSON.stringify(response.data as T)}`, 'RestClient')

//         return response.data
//     } catch (err) {
//         toastr.error('', `An unexpected error has occured: ${err}.`)

//         Logger.error('Error DELETE', 'RestClient', err)

//         throw new Error(err)
//     }
// }
