import { FC, Suspense } from 'react'
import { Loading } from '../general/TextDefault'
import { LoadingSuspenseProps } from './type/loading.type'

const LoadingSuspense: FC<LoadingSuspenseProps> = ({ children }) => {
    return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export default LoadingSuspense
