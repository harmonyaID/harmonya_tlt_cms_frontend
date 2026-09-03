import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'

const PropertyBoxInfo = ({
    title,
    value,
    col = '',
    className,
}: {
    title?: string
    className?: string
    value?: string | number
    col?: number | string
}) => {
    return (
        <div
            className={joinClassNameHelper('p-2 border rounded-2', className, {
                'g-col': col ? true : false,
            })}>
            <h5 className="mb-1 fw-500 text-tint-100">{value}</h5>

            <p className="fs-12 mb-0">{title}</p>
        </div>
    )
}

export default PropertyBoxInfo
