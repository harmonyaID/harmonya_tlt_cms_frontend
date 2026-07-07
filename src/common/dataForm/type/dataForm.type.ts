import { ReactNode } from 'react'
import {
    SearchComponentProps,
    SelectOptionProps,
    SelectTreeOptionProps,
} from '@/type/form.type'

// Base Search Component With Hook
export interface BaseSearchComponentWithHookProps extends SearchComponentProps {
    nameOfChange?: string
    tokenCancel?: string
    keyName?: string
    icon?: ReactNode
    isUseHook?: boolean
    isEdit?: boolean
    isOnlyChoose?: boolean
    actions?: {
        onChange?: (name: string, value: unknown, detail: object) => void
        [key: string]: any
    }
}

export type DefaultSearchComponent = {
    page: number
    search: string
}

// Base Select Option With Hook
export interface BaseSelectOptionWithHookProps extends SelectOptionProps {
    nameOfChange?: string
    isUseHook?: boolean
    actions?: {
        onChange?: (name: string, value: any, data?: any) => void
        [key: string]: any
    }
}

// Select Option -> Branch Office
export interface SelectOptionBranchOfficeProps extends BaseSelectOptionWithHookProps {
    valueKey?: string
    isOnlyChoose?: boolean
    branchIds?: any[]
}

export interface SelectTreeOptionBranchOfficeProps extends SelectTreeOptionProps {
    name: string
    value?: any
    nameOfChange?: string
    isUseHook?: boolean
    actions?: {
        onChange: (name: string, value: any) => void
    }
}
