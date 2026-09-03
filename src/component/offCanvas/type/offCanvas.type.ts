import { ReactNode } from 'react'

// OffCanvas General
export interface OffCanvasGeneralProps {
    id: string
    className?: string
    classNameHeader?: string
    classNameBody?: string
    zIndex?: number | string
    width?: number | string
    isCloseAnywhere?: boolean
    isScrollable?: boolean
    isHideClose?: boolean
    isHideTitle?: boolean
    closeAction?: () => void
    title?: ReactNode
    children?: ReactNode
    isUseFooter?: boolean
    footerContent?: ReactNode
}
