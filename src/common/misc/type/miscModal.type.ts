import { ChangeEvent, ReactNode } from 'react'
import { BaseModalActionConfig } from '@/common/misc/type/misc.type.ts'

export interface ModalActionCRUDConfig extends BaseModalActionConfig {
    urlAPIAdd?: () => Promise<{
        result?: Record<string, any>
        pagination?: Record<string, any>
    }>
    urlAPIUpdate?: () => Promise<{
        result?: Record<string, any>
        pagination?: Record<string, any>
    }>
    initialForm?: () => void
}

export interface ModalWithActionFormCRUDLogicProps {
    id: string
    title?: string
    label?: string
    name?: string
    placeholder?: string
    defaultInputType?: string
    detail: object | any
    formRequest: object | any
    classNameModalDialog?: string
    isAdd?: boolean
    isEdit?: boolean
    isHideClose?: boolean
    isNeedAction?: boolean
    isUseDefaultInput?: boolean
    defaultInputNumberOnly?: boolean
    isCentered?: boolean
    isScrollable?: boolean
    isUseDefaultTitle?: boolean
    defaultInputOtherConfig?: object
    externalForm?: ReactNode
    actions: {
        change: (
            name: string,
            value: any,
            event?: ChangeEvent<HTMLInputElement>,
        ) => void
        toggleModal: (selected?: object | any) => void
        other?: object
    }
    configHandle: ModalActionCRUDConfig
    width?: string | number
}
