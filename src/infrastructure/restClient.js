import axios from 'axios'
import config from './config'
import { toastr } from 'react-redux-toastr'
import downloadjs from 'downloadjs'

export async function get(url, useBaseUrl = true) {
    try {
        const baseUrl = useBaseUrl === true ? config.api : ''

        console.log(`[GET] ${baseUrl + url}`)

        const response = await axios.get(baseUrl + url)

        console.log(`[RESPONSE] ${JSON.stringify(response.data)}`)

        return response.data
    } catch (err) {
        console.log('Error GET', err)

        toastr.error('', `An unexpected error has occured: ${err}.`)

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
        console.log('Error POST', err)

        toastr.error('', `An unexpected error has occured: ${err}.`)

        throw new Error(err)
    }
}

export async function download(url, data, fileName, useBaseUrl = true) {
    try {
        const baseUrl = useBaseUrl === true ? config.api : ''

        console.log(`[DOWNLOAD] ${baseUrl + url}`, data)

        const settings = {
            responseType: 'blob'
        }

        const response = await axios.post(baseUrl + url, data, settings)

        return downloadjs(response.data, fileName)
    } catch (err) {
        toastr.error('Error', `An unexpected error has occured: ${err}.`)

        console.warn(err)
    }
}
