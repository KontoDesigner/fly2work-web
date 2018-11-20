import axios from 'axios'
import config from './config'
import { toastr } from 'react-redux-toastr'
import downloadjs from 'downloadjs'
import { adalApiFetch } from './adalConfig'

export async function get(url, useBaseUrl = true) {
    try {
        const baseUrl = useBaseUrl === true ? config.api : ''

        console.log(`[GET] ${baseUrl + url}`)

        const axiosInstance = axios.create({
            baseURL: baseUrl
        })

        const response = await adalApiFetch(axiosInstance, baseUrl + url, {})

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

        const axiosInstance = axios.create({
            baseURL: baseUrl
        })

        const settings = {
            headers: {
                Accept: 'Application/json',
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: ''
            },
            data: JSON.stringify(data),
            method: 'POST'
        }

        const response = await adalApiFetch(axiosInstance, baseUrl + url, settings)

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

        const axiosInstance = axios.create({
            baseURL: baseUrl
        })

        const settings = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: ''
            },
            data: data ? JSON.stringify(data) : {},
            method: 'POST',
            responseType: 'blob'
        }

        const response = await adalApiFetch(axiosInstance, baseUrl + url, settings)

        return downloadjs(response.data, fileName)
    } catch (err) {
        toastr.error('', `An unexpected error has occured: ${err}.`)

        console.warn(err)
    }
}

export async function upload(url, file, data = [], useBaseUrl = true) {
    try {
        //File
        var formData = new FormData()
        formData.append('file', file)

        //Data
        for (var item of data) {
            formData.append(item.key, item.value)
        }

        const baseUrl = useBaseUrl === true ? config.api : ''

        console.log(`[UPLOAD] ${baseUrl + url}`, formData)

        const axiosInstance = axios.create({
            baseURL: baseUrl
        })

        const settings = {
            method: 'POST',
            data: formData,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        }

        const response = await adalApiFetch(axiosInstance, baseUrl + url, settings)

        return response.data
    } catch (err) {
        toastr.error('', `An unexpected error has occured: ${err}.`)

        console.warn(err)
    }
}
