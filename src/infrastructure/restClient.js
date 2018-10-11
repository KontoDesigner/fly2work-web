import axios from 'axios'
// import download from 'downloadjs'
// import { toastr } from 'react-redux-toastr'
// import * as Logger from './logger'
// import Config from './config'

export async function get(url) {
  try {
    // const baseUrl = useBaseUrl === true ? Config.api : ''

    // Logger.trace(`[GET] ${baseUrl + url}`, 'RestClient')

    const response = await axios.get(url)

    // Logger.trace(`[RESPONSE] ${JSON.stringify(response.data as T)}`, 'RestClient')

    return response.data
  } catch (err) {
    //     toastr.error('', `An unexpected error has occured: ${err}.`)

    //     Logger.error('Error GET', 'RestClient', err)

    throw new Error(err)
  }
}

// export async function post(url, data) {
//     try {
//         const baseUrl = useBaseUrl === true ? Config.api : ''

//         Logger.trace(`[POST] ${baseUrl + url} ${JSON.stringify(data)}`, 'RestClient')

//         const response = await axios.post(baseUrl + url, data)

//         Logger.trace(`[RESPONSE] ${JSON.stringify(response.data as T)}`, 'RestClient')

//         return response.data
//     } catch (err) {
//         toastr.error('', `An unexpected error has occured: ${err}.`)

//         Logger.error('Error POST', 'RestClient', err)

//         throw new Error(err)
//     }
// }

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

// export async function down(url, data, fileName) {
//     try {
//         const baseUrl = useBaseUrl === true ? Config.api : ''

//         Logger.trace(`[DOWNLOAD] ${baseUrl + url} ${JSON.stringify(data)}`, 'RestClient')

//         const response = await axios({
//             url: baseUrl + url,
//             method: 'GET',
//             responseType: 'blob'
//         })

//         Logger.trace(`[RESPONSE] ${JSON.stringify(response)}`, 'RestClient')

//         return download(response.data, fileName)
//     } catch (err) {
//         toastr.error('', `An unexpected error has occured: ${err}.`)

//         Logger.error('Error DOWNLOAD', 'RestClient', err)

//         throw new Error(err)
//     }
// }
