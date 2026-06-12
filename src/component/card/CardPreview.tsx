import { FC } from 'react'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'
import { CardPreviewProps } from './type/card.type'

const CardPreview: FC<CardPreviewProps> = ({
    isHover = false,
    className = '',
    actions = { click: () => {} },
    children,
}) => {
    return (
        <div
            className={joinClassNameHelper(
                'card card-body b-rad-5 w-100 p-3',
                className,
                {
                    'hover-action-border-primary': isHover,
                },
            )}
            onClick={actions.click}>
            {children}
        </div>
    )
}

export default CardPreview
