import { FC } from 'react'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'
import { CardListDataProps } from './type/card.type'

const CardListData: FC<CardListDataProps> = ({
    children,
    title = '',
    className = '',
    isStickySearch = true,
    componentAction = null,
    classNameElementAction = '',
    classNameColumnTitle = 'col',
    classNameColumnAction = 'col-auto',
}) => {
    return (
        <div
            className={joinClassNameHelper(
                'card card-body border-0',
                className,
                {
                    'wrap-sticky-search-with-list': isStickySearch,
                },
            )}>
            {title || componentAction ? (
                <div
                    className={
                        'row mb-4 mb-md-0' +
                        (classNameElementAction
                            ? ` ${classNameElementAction}`
                            : '')
                    }>
                    {title ? (
                        <div className={classNameColumnTitle}>
                            <h5 className="fs-18 fw-500">{title}</h5>
                        </div>
                    ) : null}

                    {componentAction ? (
                        <div className={classNameColumnAction}>
                            {componentAction}
                        </div>
                    ) : null}
                </div>
            ) : null}

            {children}
        </div>
    )
}

export default CardListData
