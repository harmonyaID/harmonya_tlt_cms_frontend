import { LS_ACCOUNT, LS_TOKEN } from '@/config/localStrorage.config'

export const setLocalStorage = (key: string, value: any) => {
    return window.localStorage.setItem(key, value)
}

export const getLocalStorage = (key: string) => {
    return window.localStorage.getItem(key)
}

export const clearLocalStorage = (key: string) => {
    return window.localStorage.removeItem(key)
}

export const token = {
    Authorization: 'Bearer ' + getLocalStorage(LS_TOKEN),
}

export const dataProfileFromLS = JSON.parse(getLocalStorage(LS_ACCOUNT)) || {}
