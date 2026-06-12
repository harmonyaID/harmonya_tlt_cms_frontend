import { CardProps } from './type/card.type'

const Card = ({
    children,
    title = '',
    className = '',
    classNameBlog = '',
}: CardProps) => {
    return (
        <div className={'card border-0 ' + className}>
            {title ? (
                <div className="card-header border-0 bg-white">
                    <div className="card-title my-2">
                        <div className="fw-600 fs-18 text-neutral-100 mb-0">
                            {title}
                        </div>
                    </div>
                </div>
            ) : null}
            <div className={'card-body ' + classNameBlog}>{children}</div>
        </div>
    )
}

export default Card
