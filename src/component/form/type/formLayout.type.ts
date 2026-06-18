import { ReactNode } from 'react'

export interface FormLayoutRowProps {
    children: ReactNode
    label: string | ReactNode
    labelSecond?: string | ReactNode
    className?: string
    classNameLabel?: string
    classNameColumnLabel?: string
    classNameColumnChild?: string
    isRequired?: boolean
}
