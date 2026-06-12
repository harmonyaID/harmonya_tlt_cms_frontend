import axios, { AxiosRequestConfig, AxiosError } from 'axios'

interface KeyCancel {
    [key: string]: () => void
}

const keyCancel: KeyCancel = {}
const CancelToken = axios.CancelToken

export const renderCancelToken = (parentName: string) => {
    if (keyCancel[parentName]) {
        keyCancel[parentName]()
    }

    return {
        cancelToken: new CancelToken(function executor(c) {
            keyCancel[parentName] = c
        }),
    }
}

export function argCancelToken(err: AxiosError) {
    if (axios.isCancel(err)) {
        return {
            status: 'cancel',
        }
    }
}

export function argCatchMsg(err: any = {}) {
    if (err !== null && err.message && err.message !== undefined) {
        return true
    }
    return false
}

export function queryFilter(search: { [key: string]: any }) {
    let filter = ''
    Object.keys(search).forEach((key, index) => {
        filter += index === 0 ? '?' : '&'
        filter += `${key}=${search[key]}`
    })
    return filter
}

export const configMethod = (
    method: string,
    url: string,
    headers: AxiosRequestConfig['headers'] = {},
    others: AxiosRequestConfig = {},
) => {
    return axios({
        method,
        url,
        headers: { ...headers },
        withCredentials: false,
        ...others,
    })
}

export const get = (
    url: string,
    others: AxiosRequestConfig = {},
    headers: AxiosRequestConfig['headers'] = {},
) => configMethod('GET', url, headers, others)

export const post = (
    url: string,
    payload: any,
    others: AxiosRequestConfig = {},
    headers: AxiosRequestConfig['headers'] = {},
) => {
    return configMethod('POST', url, headers, { data: payload, ...others })
}

export const put = (
    url: string,
    payload: any,
    others: AxiosRequestConfig = {},
    headers: AxiosRequestConfig['headers'] = {},
) => configMethod('PUT', url, headers, { data: payload, ...others })

export const patch = (
    url: string,
    payload: any,
    others: AxiosRequestConfig = {},
    headers: AxiosRequestConfig['headers'] = {},
) => configMethod('PATCH', url, headers, { data: payload, ...others })

export const del = (
    url: string,
    others: AxiosRequestConfig = {},
    headers: AxiosRequestConfig['headers'] = {},
) => configMethod('DELETE', url, headers, others)
