import { ReactNode } from 'react'
import PropertyTitleInfo from '@/page/property/component/PropertyTitleInfo.tsx'

const PropertySpaceInfo = ({
    title,
    children,
}: {
    title?: string | number
    children?: ReactNode
}) => (
    <div className="pb-4 border-bottom">
        {title ? <PropertyTitleInfo title={title} /> : null}
        {children}
    </div>
)

export default PropertySpaceInfo
