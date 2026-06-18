import { FC } from 'react'
import { isString } from 'lodash'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { RowFormProps } from './type/componentForm.type'

const RowForm: FC<RowFormProps> = ({
    label = '',
    children,
    className = '',
    classNameLabel = '',
    classNameColumnLabel = 'col-md-3 col-lg-2',
    classNameColumnChild = 'col-md-6 col-lg-5',
    secondLabel = '',
    isRequired = false,
}) => {
    return (
        <div className={joinClassNameHelper('row mb-1 mb-md-3', className)}>
            <div
                className={joinClassNameHelper(
                    'mb-2 mb-md-0',
                    classNameColumnLabel,
                )}>
                <label
                    className={joinClassNameHelper(
                        'rfh-label',
                        classNameLabel,
                    )}>
                    {label}

                    {isRequired ? (
                        <span className="text-danger-200 fs-16">
                            {isRequired ? '*' : ''}
                        </span>
                    ) : null}
                </label>

                {secondLabel ? (
                    <>
                        {isString(secondLabel) ? (
                            <p className="fw-400 fs-13 text-neutral-300">
                                {secondLabel}
                            </p>
                        ) : (
                            secondLabel
                        )}
                    </>
                ) : null}
            </div>

            <div className={classNameColumnChild}>{children}</div>
        </div>
    )
}

export default RowForm
