import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'
import { textToId } from '@/helper/convertText.helper.ts'
import { CardProps } from './type/card.type'

const CardDropdown = ({
    children,
    title = '',
    className = '',
    classNameBlog = '',
    id,
    isShow = false,
}: CardProps & { id?: string; isShow?: boolean }) => {
    const cardId = id || textToId(title.toString())

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
                            className={joinClassNameHelper(
                                'accordion-button fw-600 fs-18 text-neutral-100 mb-0',
                                {
                                    collapsed: !isShow,
                                },
                            )}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={'#' + cardId}
                            aria-expanded="true"
                            aria-controls={cardId}>
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
                id={cardId}>
                {children}
            </div>
        </div>
    )
}

export default CardDropdown
