import { CSSProperties, ReactNode } from 'react'
import { SwiperProps } from 'swiper/react'

// Card
export interface CardProps {
    children: ReactNode
    title?: string | ReactNode
    className?: string
    classNameBlog?: string
}

// Card Count
export interface CardCountProps {
    className?: string
    icon?: Element | any
    title: Element | any
    count?: Element | number | any
}

// Card List Data
export interface CardListDataProps {
    children: ReactNode
    title?: string
    className?: string
    classNameElementAction?: string
    componentAction?: ReactNode
    isStickySearch?: boolean
    classNameColumnTitle?: string
    classNameColumnAction?: string
}

// Card Nav Tab
interface Tab {
    id?: string
    name: string
    count?: number
}

interface TabContent {
    title?: string
    content: ReactNode
    classNameTitle?: string
}

interface Actions {
    handleClickTab: (id: string) => void
}

interface ConfigCardNavTab {
    style?: CSSProperties
}

export interface CardNavTabProps {
    tabs: Tab[]
    tabContents: TabContent[]
    className?: string
    classNameTab?: string
    classNameTabContent?: string
    classNameTabPane?: string
    id?: string
    actions?: Actions
    config?: ConfigCardNavTab
}

// Card Preview
export interface CardPreviewProps {
    isHover?: boolean
    className?: string
    actions?: {
        click?: () => void
    }
    children?: React.ReactNode
}

// Card Slider
export type DefaultSwiperConfig = Pick<
    SwiperProps,
    'spaceBetween' | 'autoHeight' | 'speed'
>

export type OtherSwiperConfig = Pick<SwiperProps, 'breakpoints' | 'modules'>

export interface CardSliderDefaultProps {
    className?: string
    children: ReactNode
}

export interface CardSliderWrapperProps {
    className?: string
    classNameSlide?: string
    classNameCardDefault?: string
    isUseDefaultCard?: boolean
    customRenderNavigation?: ReactNode
    children?: ReactNode
    defaultConfig?: DefaultSwiperConfig
    config?: Omit<
        SwiperProps,
        'spaceBetween' | 'autoHeight' | 'speed' | 'breakpoints'
    >
    otherConfig?: OtherSwiperConfig
}

// Card Title
export interface ConfigCardTitle {
    isUseDefaultFontSize?: boolean
    isUseDefaultMargin?: boolean
}

export interface CardTitleProps {
    title: string
    className?: string
    config?: ConfigCardTitle
}

export interface CardTitleSectionProps {
    title?: string
}

// Card Notes
export interface CardNotesProps {
    value?: string
    children?: ReactNode
    className?: string
    classNameRow?: string
}
