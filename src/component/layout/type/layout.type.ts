import { ReactNode } from 'react'

// Main Menu
export interface LabelSectionProps {
    name: string
}

export interface MainMenuProps {
    idDataBsParent?: string
}

export interface LinkMenuProps {
    name: string
    to?: string
    icon: ReactNode
    isPathActive?: boolean
}

export interface LinkSubMenuProps {
    name: string
    to?: string
}

export interface MenuDropdownProps extends LinkMenuProps {
    children?: ReactNode
    idControl?: string
    subMenus?: LinkSubMenuProps[]
}

export interface ShortAddObject {
    name: string
    url: string
    icon: ReactNode
    shortCut?: string[]
}

// Create Portal
export interface CreatePortalLayoutProps {
    children: ReactNode
    isUseBody?: boolean
}
// Navbar
export interface NavbarProps {
    title?: string
}

// Page Coming Soon
export interface PageComingSoonProps {
    className?: string
    classNameText?: string
}

// Sidebar Second
export interface SidebarSecondLayoutProps {
    title?: string
    isButtonAdd?: boolean
    titleActionElement?: string
    actionsElement?: {
        handleClick?: () => void
    }
    isUseAdvanceSearch?: boolean
    search?: object | any
    formAdvanceSearch?: object
    countAdvance?: number
    isUseSearch?: boolean
    isUseDefaultDateRange?: boolean
    isBranchOffice?: boolean
    actionsAdvanceSearch?: {
        handlePagination?: () => void
        handleClear?: () => void
        handleChange?: (name?: string, value?: any) => void
        handleCountAdvance?: (count?: number) => void
        handleSetIsUseSearch?: (isUse?: boolean) => void
        handleClearCount?: () => void
        handleGetPrevSearch?: (search) => void
    }
    isUsePrevState?: boolean
    advanceSearchContent?: ReactNode
    children: ReactNode
    componentAction?: ReactNode
    placeholderSearch?: string
    isAdvance?: boolean
}

// Suspense Layout
export interface SuspenseLayoutProps {
    children: ReactNode
    titlePage?: string
    titleNavbar?: string
    permission?: string
    isOtherCheckBy?: string
    isCheckPermission?: boolean
}

// Wrap Permission
export interface WrapPermissionLayoutProps {
    children: ReactNode
    permission: string
    isOtherCheckBy: string
}
