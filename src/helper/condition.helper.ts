import { isEmpty } from 'lodash'
import { themeMode } from './base/actionThemeMode.helper'

interface ResData {
    status?: {
        code: number
    }
    result?: any
}

export const isSuccess = (resData: ResData): boolean =>
    resData && resData?.status && resData?.status?.code === 200 ? true : false

export const isResDataEmpty = (resData: ResData): boolean =>
    isEmpty(resData) && isEmpty(resData.result)

export const isFirstOfList = (index: number): boolean => index === 0

interface ClickEvent {
    target: {
        tagName: string
    }
}

export const isClickToDetail = (e: ClickEvent): boolean => {
    const tagName = e.target.tagName.toLowerCase()

    return tagName !== 'a' && tagName !== 'button'
}

export const isShowPagination = (
    isLoading: boolean = false,
    list: any[] = [],
    pagination: object | any = {},
) => !isLoading && (!isEmpty(list) || +pagination?.count === 0)

export const checkThemeMode = (): 'light' | 'dark' =>
    themeMode() === 'dark' ? 'light' : 'dark'

export const isDarkMode = (): boolean => themeMode() === 'dark'

export const isLoadingAndDetail = (isLoading?: boolean | any, detail = {}) => {
    return isLoading || isEmpty(detail)
}

export const viewData = (data) => {
    return !isEmpty(data) ? data : '-'
}
