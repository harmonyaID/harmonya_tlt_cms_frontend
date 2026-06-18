import { FC } from 'react'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { PageComingSoonProps } from './type/layout.type'

const PageComingSoonLayout: FC<PageComingSoonProps> = ({
    className = '',
    classNameText = '',
}) => {
    return (
        <div className={joinClassNameHelper('card border-0 p-4', className)}>
            <div className="row d-flex justify-content-center align-items-center w-100">
                <div className="col-md-12">
                    <div
                        className={joinClassNameHelper(
                            'text-center',
                            classNameText,
                        )}>
                        <h5 className="fw-500 text-neutral-200 mb-0">
                            Coming Soon
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PageComingSoonLayout
