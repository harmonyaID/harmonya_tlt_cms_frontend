import { isEmpty } from 'lodash'
import { themeMode } from './actionThemeMode.helper'

interface ResData {
    status?: {
        code: number
    }
    result?: any
}

export const isSuccess = (resData: ResData): boolean =>
    resData && resData?.status && resData?.status?.code === 200 ? true : false

export const isResdataEmpty = (resData: ResData): boolean =>
    isEmpty(resData) && isEmpty(resData.result)

export const isFirstOfList = (index: number): boolean => index === 0

interface ClickEvent {
    target: {
        tagName: string
    }
}

export const isClickToDetail = (e: ClickEvent | any): boolean => {
    // const tagName = e.target.tagName.toLowerCase()
    //
    // return tagName !== 'a' && tagName !== 'button'

    const tagName = e.target.tagName.toLowerCase()

    return tagName != 'a' &&
        tagName != 'button' &&
        tagName != 'svg' &&
        tagName != 'path'
        ? true
        : false
}

export const checkThemeMode = (): 'light' | 'dark' =>
    themeMode() === 'dark' ? 'light' : 'dark'

export const isDarkMode = (): boolean => themeMode() === 'dark'

export const isShowPagination = (
    isLoading: boolean = false,
    list: any[] = [],
    pagination: object | any = {},
) => {
    return !isLoading && !isEmpty(list) && pagination?.totalPage

    // return !isLoading && (!isEmpty(list) || pagination?.totalPage === 0)
}
