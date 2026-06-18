import { isString } from 'lodash'
import { FormLayoutRowProps } from '@/component/form/type/formLayout.type.ts'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'

const FormLayoutRow = ({
    label = '',
    labelSecond = '',
    children,
    className,
    classNameLabel = '',
    classNameColumnLabel = 'col-md-3 col-lg-3',
    classNameColumnChild = 'col-md-9',
    isRequired = false,
}: FormLayoutRowProps) => {
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

                {labelSecond ? (
                    <>
                        {isString(labelSecond) ? (
                            <p className="fw-400 fs-13 text-neutral-300">
                                {labelSecond}
                            </p>
                        ) : (
                            labelSecond
                        )}
                    </>
                ) : null}
            </div>

            <div className={classNameColumnChild}>{children}</div>
        </div>
    )
}

export default FormLayoutRow
