import { ChangeEvent } from 'react'
import { FormRequest, SetFormRequest } from '@/type/form.type'

// Base Data Config
interface BaseDataConfig {
    urlAPI: (search?: Record<string, any>) => Promise<{
        result?: Record<string, any>
        pagination?: Record<string, any>
    }>
    isHideSidebar: boolean
}

// Component Input Config
export interface ContextInput {
    __value?: Record<string, any>
    __handleChange?: (name: string, value: any, event: any) => void
}

export interface ChangeEventCallbackInput {
    (name: string, value: any, event?: ChangeEvent<HTMLInputElement>): void
}

// Data Config Detail
export interface DataConfigDetail extends BaseDataConfig {
    isCallAPI?: boolean
    triggerBy?: string | number
    isAutoGet?: boolean
}

export type ConfigDetail = Partial<DataConfigDetail>

// Data Config List
export interface DataConfigInFace extends BaseDataConfig {
    advancedSearch?: Record<string, any>
    parameterByList?: string
    isClearAutoSearch?: boolean
    isAutoSearch?: boolean
    [key: string]: any
}

export interface PaginationInFace {
    [key: string]: any
}

export interface SearchInFace {
    search: string
    page: number
    [key: string]: any
}

export type ConfigList = Partial<DataConfigInFace>
export type NewSearchList = Partial<SearchInFace>

// Data Config Detail Search Param
export interface DataConfigDetailSearchParam {
    urlAPI?: (id?: string | any) => Promise<any>
    list: Record<string, any>[]
    keyParam?: string
    keyFindBy?: string
    isUsePreviousSelected?: boolean
}

// Data Config Detail Form
export interface DataConfigDetailForm extends BaseDataConfig {
    formRequest: FormRequest
    setFormRequest: SetFormRequest
    isManualSetFormRequest?: boolean
    handleSetFormRequest?: (resData?: object | any) => void
    isAutoGet?: boolean
}

export type ConfigDetailForm = Partial<DataConfigDetailForm>

// Location State Hook
export interface LocationState {
    [key: string]: any
    dataSearch?: Record<string, any>
    dataCount?: Record<string, any>
}

// Upload File Hook
export interface UploadFileFormRequest {
    formRequest: FormRequest
    setFormRequest: SetFormRequest
    keyFormRequest?: string
    withMimeType?: boolean
    isLoadData?: boolean
    withDeleted?: boolean
    isMulti?: boolean
}

// Search Form Request
export type SearchFormRequestHook<T> = {
    search: FormRequest
    setSearch: SetFormRequest
    actionGetData?: (search?: object) => void
    keyName?: string
    isAutoSearch?: boolean
    isSearchAfterClear?: boolean
    initialData?: T[]
    advancedSearch?: object
    mapSelectedItem?: (item: T) => void
}

// Profile
export interface ProfileProps {
    id?: number | string
    fullName?: string
    email?: string
    [key: string]: any
}
