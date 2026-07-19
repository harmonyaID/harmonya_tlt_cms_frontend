import { CardProps } from './type/card.type'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'

const CardDropdown = ({
    children,
    title = '',
    className = '',
    classNameBlog = '',
    id,
    isShow = false,
}: CardProps & { id: string; isShow?: boolean }) => {
    return (
        <div className={'card overflow-hidden border-0 ' + className}>
            {title ? (
                <div
                    className="card-header border-0 bg-white"
                    data-toggle="collapse">
                    <div className="card-title my-2">
                        {/*<div className="fw-600 fs-18 text-neutral-100 mb-0">*/}
                        {/*    {title}*/}
                        {/*</div>*/}

                        <button
                            className={joinClassNameHelper('accordion-button', {
                                collapsed: !isShow,
                            })}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={'#' + id}
                            aria-expanded="true"
                            aria-controls={id}>
                            {title}
                        </button>
                    </div>
                </div>
            ) : null}
            <div
                className={joinClassNameHelper(
                    'card-body collapse',
                    classNameBlog,
                    { show: isShow },
                )}
                id={id}>
                {children}
            </div>
        </div>
    )
}

export default CardDropdown
