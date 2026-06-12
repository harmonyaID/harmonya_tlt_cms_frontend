import { FC } from 'react'
import { CardCountProps } from './type/card.type'

const CardCount: FC<CardCountProps> = ({
    className = '',
    icon = '',
    title = '',
    count = 0,
}) => {
    return (
        <div
            className={
                'card card-body border-0 mb-3 mb-md-4 w-100' +
                (className ? ` ${className}` : '')
            }>
            <div className="d-flex align-items-md-start">
                <div className="me-3">
                    <div className="avatar-36 d-flex align-items-center justify-content-center circular bg-neutral-500 text-neutral-100">
                        {icon}
                    </div>
                </div>

                <div className="overflow-hidden d-flex flex-column flex-grow-1">
                    <h4 className="fw-600 mb-0">{count}</h4>
                    {title ? (
                        <p className="text-neutral-300 mb-0 fs-12">{title}</p>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default CardCount
