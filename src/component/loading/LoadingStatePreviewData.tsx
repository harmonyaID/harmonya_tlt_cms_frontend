import { ReactNode } from 'react'
import { isEmpty } from 'lodash'
import { Loading, NotAvailable } from '@/component/general/TextDefault.tsx'

const LoadingStatePreviewData = ({
    isLoading,
    data = [],
    children,
}: {
    isLoading: boolean
    data: any
    children?: ReactNode
}) => (
    <>{isLoading ? <Loading /> : isEmpty(data) ? <NotAvailable /> : children}</>
)

export default LoadingStatePreviewData
