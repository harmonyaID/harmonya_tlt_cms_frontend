import { ChangeEvent, ReactNode } from 'react'

export interface BaseModalActionConfig {
    urlAPI?: (formData?: object | any) => Promise<{
        result?: Record<string, any>
        pagination?: Record<string, any>
    }>
    callBack?: (passNewData?: object | any) => void
    emptySelect?: () => void
}

// Badge Status
export type BadgeStatusType = {
    statusStyle: object | string | any
    backgroundColor: string
    color: string
}

export interface BadgeStatusProps {
    data?: {
        id: string | number
        name: string
        [key: string]: any
    }
    keyName?: string
    listStyle?: Record<number, BadgeStatusType>
    isTable?: boolean
    isRounded?: boolean
    className?: string
    children?: ReactNode
}

// Button Navbar Search Service Loc.
export interface ButtonNavbarSearchServiceLocProps {
    id?: string
    title?: string
    actions?: {
        handleClick?: () => void
    }
}

// Button With Action Copy
export interface ButtonWithActionCopyLogicProps {
    data: object | any
    copyType?: string
    parseName?: string
    className?: string
    isSmall?: boolean
    isHoverBg?: boolean
    isBgDarken?: boolean
    isCopyMap?: boolean
    isIcon?: boolean
    isUseAPI?: boolean
    configHandle?: {
        urlAPI?: () => Promise<any>
        callback?: (result: any) => void
        emptySelect?: () => void
    }
}

// Card Setting List Data
export interface CardSettingDataListProps {
    item: object | any
    titleAssign?: string
    isRemove?: boolean
    isEdit?: boolean
    extraButtonAssign?: ReactNode
    actions: {
        remove?: (data: any) => void
        toggleAddOrEdit?: (data: any) => void
        toggleAssignCategory?: (data: any) => void
    }
}

// Confirm Remove List
export interface ConfirmRemoveListLogicProps {
    id?: string
    message?: string
    messageClassName?: string
    configHandle?: BaseModalActionConfig
}

// Modal Confirm Logout
export interface ModalConfirmLogoutProps {
    configHandle?: {
        urlAPI: () => Promise<any>
    }
}

// Form Upload File
export interface FormUploadFileWithActionPreviewLogicProps {
    id?: string
    label?: string
    formName?: string
    subTitle?: string
    accept?: string
    dataBy?: string
    dataTypeBy?: string
    required?: boolean
    isUseDefaultLabel?: boolean
    dataFiles: string[] | any[]
    formRequest: object | any
    actions?: {
        handleAddFiles?: (dataFiles: any) => void
        handleSetDataFiles?: (dataFiles: any) => void
        handleRemoveDataFile?: (index: any) => void
        handleArrChange?: (
            index: any,
            name: string,
            value: any,
            parent: string,
        ) => void
    }
    isUseInputDesc?: boolean
    isEdit?: boolean
    isMulti?: boolean

    classNameRowImg?: string
    columnSizeImg?: string
}

// Modal With Action Form CRUD
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
    isEdit?: boolean
    isHideClose?: boolean
    isNeedAction?: boolean
    isUseDefaultInput?: boolean
    defaultInputNumberOnly?: boolean
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
}

// Preview File Modal
export interface PreviewFileModalLogicProps {
    dataUrl: string
    dataBy?: string
    dataFile?: object | any
    isShowBtnRemove?: boolean
    classNameWidth?: string
    actions?: {
        remove: () => void
    }
}

export interface PreviewFileModalMultiLogicProps {
    dataFiles: any[]
    dataBy?: string
    className?: string
    classNameColumnPreview?: string
    classNameImagePreview?: string
    classNameWrapImg?: string
    children?: ReactNode
    isDescription?: boolean
}

export interface IframeLayoutProps {
    detail: object | any
}

export interface PreviewFileModalWithActionButtonLogicProps {
    dataBy: string
    dataTypeBy: string
    isShowFile: boolean
    dataFiles: any[]
    actions: {
        toggleModal: (selected?: object | any) => void
    }
}
