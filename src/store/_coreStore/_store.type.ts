import { StoreApi } from 'zustand'
import { DataListItem } from '@/type/dataList.type'

export interface UseStoreStateType {
    __list: DataListItem[]
    __isLoading?: boolean
    __handleGet?: () => void
}

export interface DefaultConfigStoreType {
    isRunByDefault?: boolean
    isFormatList?: boolean
    formatBy?: string[]
    configUseStore?: any
}

export interface DefaultConfigCreatStoreType {
    isRunByDefault?: boolean
    isFormatList?: boolean
    formatBy?: string[]
    configUseStore?: StoreApi<StoreStateType>
}

export interface ResDataType {
    result?: any
    pagination?: any
    status?: {
        code: number
    }
}

export interface StoreStateType {
    __list: any[]
    __listOption: any[]
    __isLoading: boolean
    __isReload: boolean
    __pagination: any
    __search: any

    __handleGet: () => void
    __handleReload: (search?: any) => void
    __handleUpdate: (newData: any, index: number) => void
    __handlePush?: (newData: any, toTop?: boolean) => void
}
