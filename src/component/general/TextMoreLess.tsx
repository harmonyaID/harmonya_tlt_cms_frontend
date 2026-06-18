import { MouseEvent, useState } from 'react'
import { TextMoreLessProps } from '@/component/general/type/general.type'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'

const TextMoreLess = ({
    children,
    maxLength = 100,
    className = '',
    isUseDefaultMarginBottom = false,
}: TextMoreLessProps) => {
    const [expanded, setExpanded] = useState(false)

    const _handleToggle = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setExpanded((prev) => !prev)
    }

    const isLong = children.toString().length > maxLength

    const displayedText = expanded
        ? children
        : children.toString().slice(0, maxLength) + (isLong ? '...' : '')

    return (
        <div
            className={joinClassNameHelper(
                'fs-13 text-neutral-300',
                className,
                {
                    'mb-2': isUseDefaultMarginBottom,
                },
            )}>
            {displayedText}

            {isLong ? (
                <span
                    onClick={_handleToggle}
                    className="text-primary cursor-pointer ms-1">
                    {expanded ? 'Show less' : 'Show more'}
                </span>
            ) : null}
        </div>
    )
}

export default TextMoreLess
