import { ReactNode, SetStateAction } from 'react'

// Form Request & Set Form Request
export interface FormRequest {
    [key: string]: any
}

export type SetFormRequest = (value: SetStateAction<FormRequest>) => void

// Form Select Option
export interface SelectOptionProps {
    id?: string
    name?: string
    className?: string
    label?: string | ReactNode
    required?: boolean
    value?: string | any
    disabled?: boolean
    onChange?: void | any
    placeholder?: string
    options?: string[] | any[]
    isClearable?: boolean
    isMulti?: boolean
    otherConfigStyles?: object
    others?: object
    isCreatable?: boolean
}

// Form Select Tree Option
export interface SelectTreeOptionProps {
    id?: string
    label?: string
    dataValue?: string
    placeholder?: string
    className?: string
    dataValues?: string[]
    options?: any[]
    treeCheckable?: boolean
    required?: boolean
    disabled?: boolean
    handleChoose?: (newValue: any) => void
    isRender?: boolean
}

// Form Search
export interface SearchComponentProps {
    id?: string
    name: string
    label?: string
    className?: string
    classNameInput?: string
    placeholder?: string
    disabled?: boolean
    required?: boolean
}
