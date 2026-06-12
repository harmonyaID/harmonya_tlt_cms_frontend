import { FC } from 'react'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { CardNotesProps } from './type/card.type'

const CardNotes: FC<CardNotesProps> = ({
    children,
    value = '',
    className = '',
    classNameRow = '',
}) => {
    return (
        <div
            className={joinClassNameHelper(
                'row max-height-notes max-h-150',
                className,
            )}>
            <div className="col-md-12">
                <div
                    className={joinClassNameHelper(
                        'p-2 bg-neutral-500 b-rad-4',
                        classNameRow,
                    )}>
                    <pre className="fs-12 mb-0  white-space-break-spaces">
                        {children || value}
                    </pre>
                </div>
            </div>
        </div>
    )
}

export default CardNotes
