import { ReactNode } from 'react'
import { Link } from 'react-router'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'

export type HyperLinkProps = {
    url: string
    className?: string
    children?: ReactNode
    isOpenNewTab?: boolean
}

const HyperLink = ({
    url = '',
    className = '',
    children,
    isOpenNewTab = false,
}: HyperLinkProps) => (
    <Link
        to={url}
        className={joinClassNameHelper(
            'text-blue-300 text-underline',
            className,
        )}
        target={isOpenNewTab ? '_blank' : '_self'}
        onClick={(e) => e.stopPropagation()}>
        {children}
    </Link>
)

export default HyperLink
