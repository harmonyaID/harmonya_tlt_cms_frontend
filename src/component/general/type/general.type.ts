import { ButtonHTMLAttributes, MouseEvent, ReactNode, RefObject } from 'react'

// Advance Search
interface StatusListAdvanceFilter {
    label: string
    value: string | any
}

interface ActionsAdvanceFilter {
    clear?: () => void
    pagination?: (page: number) => void
    change?: (name: string, value: any) => void
    countAdvance?: (count?: number) => void
    setIsUseSearch?: (isUse?: boolean) => void
    clearCount?: () => void
    getDataPrevSearch?: (search: object | any) => void
}

export interface AdvanceSearchProps {
    id?: string
    title?: string
    width?: string | number
    classNameModalDialog?: string
    colMDInputSearch?: string
    colMDDateRange?: string

    formRequest: object | any
    formAdvanceSearch?: object | any
    countAdvance?: number
    isUseSearch?: boolean
    isUsePrevState?: boolean
    actions?: ActionsAdvanceFilter
    isAdvance?: boolean

    companyOfficeName?: string

    statusList?: StatusListAdvanceFilter[]
    statusName?: string
    statusLabel?: string
    placeholderStatus?: string
    isLoading?: boolean

    isBranchOffice?: boolean
    isUseDefaultInputText?: boolean
    isUseDefaultDateRange?: boolean
    isStatus?: boolean

    isMaxMonthRange?: boolean
    maxMonthRange?: number

    isMDUseDefaultBtnMargin?: boolean
    placeholderSearch?: string

    columnDefaultInputText?: string
    columnDefaultDateRange?: string
    columnBtnSearch?: string

    isSecondSidebar?: boolean

    baseContent?: ReactNode
    advanceContent?: ReactNode
}

// Avatar
export interface UseCheckErrorLinkReturn {
    ref: RefObject<HTMLImageElement>
    _handleCheck: () => void
}

export interface ConfigAvatarGeneralProps {
    isCenter?: boolean
    src?: string
    srcDefault?: string
    alt?: string
    className?: string
    classNameImg?: string
    badge?: string
    classNameBadge?: string
    content?: ReactNode
    title?: string
    classNameTitle?: string
    subTitle?: string
}

export interface AvatarCardBoxNoImageProps {
    isCenter?: boolean
    className?: string
    badge?: string
    classNameBadge?: string
    content?: ReactNode
    title?: string
    classNameTitle?: string
    subTitle?: string
}

export interface AvatarInTableProps extends ConfigAvatarGeneralProps {
    isSmall?: boolean
    isUseDefaultTitle?: boolean
    [key: string]: any
}

// Badge
export interface BadgeYesOrNoProps {
    value: string | null
}

export interface BadgeStatusGeneralProps {
    value: string
    className?: string
    inTable?: boolean
    isRounded?: boolean
}

// Button
export interface PropsBtnBase extends ButtonHTMLAttributes<HTMLButtonElement> {
    type?: 'button' | 'submit' | 'reset'
    className?: string
    isDisabled?: boolean
    isLoading?: boolean
    handle?: (event: MouseEvent<HTMLButtonElement>) => void
    children?: ReactNode
    isOutline?: boolean
    action?: {
        remove: (event: MouseEvent<HTMLButtonElement>) => void
    }
    [key: string]: any
}

export interface BtnBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type?: 'button' | 'submit' | 'reset'
    className?: string
    isDisabled?: boolean
    isLoading?: boolean
    handle?: (event: MouseEvent<HTMLButtonElement>) => void
    children?: ReactNode
    isOutline?: boolean
    action?: {
        onClick?: (event: MouseEvent<HTMLButtonElement>) => void
        remove: (event: MouseEvent<HTMLButtonElement>) => void
    }
    [key: string]: any
}

// Dropdown
export interface DropdownBtnPrimaryProps {
    isOutline?: boolean
    classNameBtn?: string
    className?: string
    classNameDropdownMenu?: string
    isIcon?: boolean
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    handle?: () => void
    icon?: ReactNode
    title?: string
    children: ReactNode
}

// Footer Submit
export interface FooterSubmitProps {
    nameSubmit?: string
    nameCancel?: string
    isLoading?: boolean
    handleCancel?: () => void
    isHideSubmit?: boolean
    position?: 'left' | 'right' | 'center'
    contentColumnLeft?: ReactNode
    columnRightClassName?: string
    isDropdown?: boolean
    isAutoCloseDropdown?: boolean
    iconDropdown?: ReactNode
    nameSubmitDropdown?: string
    dropdownContent?: { name: string; click: () => void }[]
}

// Horizontal Data Preview
export interface HorizontalDataPreviewProps {
    title?: string
    content?: ReactNode
    isLayoutContentDefault?: boolean
    isLayoutTitleDefault?: boolean
    subTitle?: string
    classNameTitleColumn?: string
    classNameContentColumn?: string
    isLast?: boolean
}

// Icon Button
interface ActionsIconButton {
    [key: string]: any
}

export interface IconButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    iconSize?: number
    isUseDefaultClassName?: boolean
    actions: ActionsIconButton
}

// Load More
export interface LoadMoreProps {
    pagination: object | any
    title?: string
    isLoading: boolean
    action: {
        onMove: (page?: number) => void
    }
}

// Breadcrumb
interface BreadBeforeActions {
    url?: string
    state?: Record<string, any>
}

export interface BreadBeforeProps {
    name: string
    url?: string
    actions?: BreadBeforeActions
}

export interface BreadActiveProps {
    name: string
}

export interface NavBreadcrumbProps {
    extraClass?: string
    navs: Array<{ name: string; url?: string; actions?: BreadBeforeActions }>
}

// Page Title
export interface PageTitleProps {
    title?: string
    second?: string
}

// Pagination
export interface PaginationProps {
    pagination: object | any
    className?: string
    onMove: (page: number) => void
}

// Text Default
export interface NotAvailableProps {
    text?: string
    className?: string
    classNameContent?: string
    isCard?: boolean
    isUseDefaultMargin?: boolean
}

export interface TitleOfTabProps {
    title?: string
    className?: string
}

export interface TextIconLoadingProps {
    name: string
    isAction: boolean
}

export interface ContentTitleProps {
    className?: string
    id?: string
    children: ReactNode
}

export interface BadgeRequiredProps {
    className?: string
}

export interface NotAvailableWithLinkProps {
    action?: {
        handleAdd: () => void
    }
    classNameBtn?: string
    isAdd?: boolean
}

export interface TextInTableProps {
    colSpan: number
    classNameTd?: string
    classNameText?: string
    text?: string
}

export interface NotAvailableInTableProps {
    colSpan: number
}

export interface TextRequiredProps {
    title?: string
    className?: string
    isRequired?: boolean
}

// Table Partial
export interface TblLineDefaultProps {
    children?: ReactNode
    value?: string
    className?: string
    isUseDefaultMargin?: boolean
}

export interface TblLineFirstPrimaryProps {
    children?: ReactNode
    value: string | ReactNode
    className?: string
    isUseDefaultMargin?: boolean
}

export interface TextOnTableProps {
    colSpan: number
    text: string
    className: string
}

export interface TblPointDataProps {
    title: string | ReactNode
    children?: ReactNode
    value?: ReactNode | string
    className?: string
    classNameValue?: string
    isTextSmall?: boolean
    isUseDefaultValueTextColor?: boolean
    isUseDefaultMargin?: boolean
    isRequiredText?: boolean
}

// Text More Less
export interface LayoutButtonProps {
    className?: string
    isLess?: boolean
}

export interface TextMoreLessProps {
    children: ReactNode
    line?: number
    className?: string
    isButton?: boolean
    maxLength?: number
    isUseDefaultMarginBottom?: boolean
}

// Title General
export interface TabTitleProps {
    title?: string | ReactNode
    className?: string
}

export interface TitleDataSectionProps {
    title?: string | ReactNode
    className?: string
    children?: ReactNode
}

// Vertical Data Preview
export interface VerticalDataPreviewProps {
    title?: string
    content?: ReactNode
    className?: string
    isLayoutContentDefault?: boolean
    subTitle?: string
    isTitle?: boolean
    classNameTitleColumn?: string
    classNameContentColumn?: string
}

export type TextTrueOrFalseProps = {
    value: boolean
    isWithIcon?: boolean
    isWithText?: boolean
    iconSize?: number
    className?: string
    classNameIcon?: string
    textTrue?: string
    textFalse?: string
}
