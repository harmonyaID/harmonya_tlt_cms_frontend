import { useId } from 'react'
import { isFunction } from 'lodash'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { OffCanvasGeneralProps } from './type/offCanvas.type'



const OffCanvasGeneral = (props: OffCanvasGeneralProps) => {
    const {
        id = '',
        title = '',
        className = 'offcanvas-end',
        classNameHeader = '',
        classNameBody = '',

        zIndex = 1055,
        width = 400,

        isHideTitle = false,
        isHideClose = false,
        isCloseAnywhere = false,
        isScrollable = false,

        children = null,
    } = props

    const uniqueId = useId()
    const offCanvasLabel = 'label-' + id || 'offCanvasLabel-' + uniqueId

    return (
        <div
            className={joinClassNameHelper('offcanvas', className)}
            id={id}
            tabIndex={-1}
            data-bs-scroll={isScrollable ? 'true' : 'false'}
            data-bs-backdrop={isCloseAnywhere ? 'true' : 'static'}
            style={{ zIndex, width }}
            aria-labelledby={offCanvasLabel}>
            {!isHideTitle ? (
                <div
                    className={joinClassNameHelper(
                        'offcanvas-header',
                        classNameHeader,
                    )}>
                    <h5 className="title" id={offCanvasLabel}>
                        {title}
                    </h5>

                    {!isHideClose &&
                        (isFunction(props.closeAction) ? (
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={props.closeAction}
                            />
                        ) : (
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            />
                        ))}
                </div>
            ) : null}

            <div
                className={joinClassNameHelper(
                    'offcanvas-body',
                    classNameBody,
                )}>
                {children}
            </div>
        </div>
    )
}

export default OffCanvasGeneral
