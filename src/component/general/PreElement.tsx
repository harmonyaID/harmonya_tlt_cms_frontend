import joinClassNameHelper from '@/helper/base/joinClassName.helper.js'
import { ReactNode } from 'react'

const PreElement = ({
    children,
    className = '',
    classNameFs = 'fs-14',
}: {
    children?: ReactNode
    className?: string
    classNameFs?: string
}) => (
    <div
        className={
            'bg-neutral-500 py-2 px-3 rounded-2 text-break ' + className
        }>
        <pre className={joinClassNameHelper('pre-line mb-0', classNameFs)}>
            {children}
        </pre>
    </div>
)

export default PreElement
