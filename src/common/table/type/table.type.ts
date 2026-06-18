import { HTMLAttributes, ReactNode } from 'react'

export interface TrTextLoadProps {
    colSpan: number
    isLoading?: boolean
    text?: string
    className?: string
}

interface TableHead {
    content?: ReactNode
    className?: string
    attribute?: HTMLAttributes<HTMLTableCellElement>
}

interface TableData {
    content?: ReactNode
    className?: string
    attribute?: HTMLAttributes<HTMLTableCellElement>
}

export interface TableThemeLogicProps {
    ths: (TableHead | string)[]
    tds?: (TableData[] | string[])[]
    isLoading?: boolean
    className?: string
    classNameBgHead?: string
    isHover?: boolean
    children?: ReactNode
    isNoWrap?: boolean
    isWrapHeader?: boolean
    isSelected?: boolean
    selectedId?: string | number
    id?: string
    classNameNotAvailable?: string
    titleRow?: string
}
