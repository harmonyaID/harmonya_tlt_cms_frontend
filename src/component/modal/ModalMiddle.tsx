import { FC, useEffect, useState } from 'react'
import { X } from 'react-feather'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'
import { ModalMiddleProps } from './type/modal.type'

const ModalMiddle: FC<ModalMiddleProps> = (props) => {
    const {
        id = '',
        className = '',
        isHideTitle = false,
        isCloseAnywhere = false,
        zIndex = 1055,
        classNameContent = '',
        title = '',
        titleSecond = '',
        classNameModalDialog = '',
        isCentered = true,
        isScrollable = true,
        isSlideUp = false,
        isRemoveConfirm = false,
        width = 650,
        isHideClose = false,
    } = props

    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        const _handleCheckMobile = () => {
            if (typeof window !== 'undefined') {
                const windowMedia =
                    window.matchMedia('(max-width: 425px)').matches
                setMobile(windowMedia)
            }
        }

        _handleCheckMobile()

        window.addEventListener('resize', _handleCheckMobile)

        return () => {
            window.removeEventListener('resize', _handleCheckMobile)
        }
    }, [mobile])

    const UITitle = () => (
        <>
            {title && <h3 className="title">{title}</h3>}
            {titleSecond && <p className="mb-0 fs-14">{titleSecond}</p>}
        </>
    )

    const ModalHeader = () => {}

    return (
        <div
            className={joinClassNameHelper('modal fade px-0', className, {
                'slide-up': isSlideUp,
            })}
            id={id}
            tabIndex={1}
            data-bs-keyboard={isCloseAnywhere ? 'true' : 'false'}
            data-bs-backdrop={isCloseAnywhere ? 'true' : 'static'}
            style={{ zIndex }}
            role="dialog"
            aria-hidden="true">
            <div
                className={joinClassNameHelper(
                    'modal-dialog',
                    classNameModalDialog,
                    {
                        'modal-dialog-centered': isCentered,
                        'modal-dialog-scrollable': isScrollable,
                    },
                )}
                style={
                    mobile
                        ? { width: isRemoveConfirm ? '100%' : '' }
                        : { width: width || 650, maxWidth: width || 650 }
                }>
                {isCentered ? (
                    <div
                        className={joinClassNameHelper(
                            'modal-content',
                            classNameContent,
                        )}>
                        {!isHideTitle ? (
                            <div className="modal-header border-0 clearfix text-left">
                                <UITitle />

                                {!isHideClose &&
                                    (typeof props.closeAction === 'function' ? (
                                        <button
                                            type="button"
                                            className="btn-close z-index-1"
                                            onClick={() =>
                                                props.closeAction?.()
                                            }>
                                            <X />
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn-close z-index-1"
                                            data-bs-dismiss="modal"
                                            aria-hidden="true"
                                        />
                                    ))}
                            </div>
                        ) : null}
                        <div className="modal-body">{props.children}</div>
                    </div>
                ) : (
                    <div className="modal-content-wrapper">
                        <div
                            className={joinClassNameHelper(
                                'modal-content',
                                classNameContent,
                            )}>
                            {!isHideTitle ? (
                                <div className="modal-header border-0 clearfix text-left">
                                    <UITitle />

                                    {!isHideClose &&
                                        (typeof props.closeAction ===
                                        'function' ? (
                                            <button
                                                type="button"
                                                className="btn-close z-index-1"
                                                onClick={() =>
                                                    props.closeAction?.()
                                                }
                                            />
                                        ) : (
                                            <button
                                                type="button"
                                                className="btn-close z-index-1"
                                                data-bs-dismiss="modal"
                                                aria-hidden="true"
                                            />
                                        ))}
                                </div>
                            ) : null}
                            <div className="modal-body">{props.children}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ModalMiddle
