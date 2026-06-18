import { ChangeEvent, CSSProperties, ReactNode } from 'react'

// Modal Advance Filter
interface StatusListAdvanceSearch {
    label: string
    value: string | any
}

export interface ModalAdvanceFilterProps {
    id?: string
    title?: string
    width?: string | number
    classNameModalDialog?: string
    colMDInputSearch?: string
    colMDDateRange?: string

    formRequest: object | any
    actions?: {
        clear?: () => void
        pagination?: (page: number) => void
        change?: (
            name: string,
            value: any,
            event?: ChangeEvent<HTMLInputElement>,
        ) => void
        checkMaxMonth?: (isActionAdvance: boolean) => void
        attemptAdvanceFilter?: (isClose: boolean) => void
        countAdvance?: (count?: number) => void
        setIsUseSearch?: (isUse?: boolean) => void
        clearCount?: () => void
    }

    companyOfficeName?: string

    statusList?: StatusListAdvanceSearch[]
    statusName?: string
    statusLabel?: string
    placeholderStatus?: string
    isLoading?: boolean
    isMDUseDefaultBtnMargin?: boolean
    placeholderSearch?: string

    isBranchOffice?: boolean
    isUseDefaultInputText?: boolean
    isUseDefaultDateRange?: boolean
    isStatus?: boolean

    isMaxMonthRange?: boolean

    advanceContent?: ReactNode
}

// Modal Confirm
export interface ModalConfirmProps {
    id?: string
    title?: string
    titleButton?: string
    isLoading?: boolean
    isOutlineCancel?: boolean
    isOutlineSubmit?: boolean
    isMDRemove?: boolean
    actions?: {
        handleSubmit: () => void
        handleCancel: () => void
    }
    dataIcon?: ReactNode
    children?: ReactNode
}

// Modal Check Max Month
export interface ModalConfirmMaxThreeMonthProps {
    idModal?: string
    textMaxRange?: string
    isUseHandleClose?: boolean
    actions?: {
        handleClose?: () => void
    }
}

// Modal Confirm Remove
export interface ModalConfirmRemoveProps {
    id?: string
    titleButton?: string
    isLoading?: boolean
    handleDelete: () => void
    closeModal: () => void
    dataIcon?: ReactNode
    children?: ReactNode
}

// Modal Middle
export interface ModalMiddleProps {
    className?: string
    isSlideUp?: boolean
    id: string
    isCloseAnywhere?: boolean
    zIndex?: number | string
    isCentered?: boolean
    isScrollable?: boolean
    classNameModalDialog?: string
    styleDialog?: CSSProperties
    width?: number | string
    isRemoveConfirm?: boolean
    title?: ReactNode
    titleSecond?: ReactNode
    isHideClose?: boolean
    closeAction?: () => void
    children?: ReactNode
    classNameContent?: string

    isHideTitle?: boolean
}
