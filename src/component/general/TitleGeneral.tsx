import { ReactNode } from 'react'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'
import {
    ContentTitleProps,
    TabTitleProps,
    TitleDataSectionProps,
} from './type/general.type'


export const TabTitle = ({ title = '', className = '' }: TabTitleProps) => (
    <h5 className={'fw-500 fs-16 text-neutral-100 mb-3 ' + className}>
        {title}
    </h5>
)

export const ContentTitle = ({
    className = '',
    id,
    children,
}: ContentTitleProps) => (
    <h2 className={'h3 fw-600 ' + className} id={id}>
        {children}
    </h2>
)

export const TitleDataSection = ({
    title = '',
    children,
    className = '',
}: TitleDataSectionProps) => {
    return (
        <h6
            className={joinClassNameHelper(
                'fw-500 fs-16 text-neutral-100',
                className,
            )}>
            {title || children}
        </h6>
    )
}

export const PageTitle = ({
    title,
    className = '',
}: {
    title: ReactNode
    className?: string
}) => {
    return (
        <h5
            className={joinClassNameHelper(
                'fw-500 text-neutral-100 mb-0',
                className,
            )}>
            {title}
        </h5>
    )
}
