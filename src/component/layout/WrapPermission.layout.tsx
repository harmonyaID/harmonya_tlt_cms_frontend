import { FC } from 'react'
import { useGlobalPrivateContext } from '@/context/GlobalPrivate.context'
import Page403Layout from './Page403.layout'
import { WrapPermissionLayoutProps } from './type/layout.type'

const WrapPermissionLayout: FC<WrapPermissionLayoutProps> = ({
    children,
    permission = '',
    isOtherCheckBy = '',
}) => {
    const { __permissions, __isLoadingAccess } = useGlobalPrivateContext()

    return (
        <>
            {(permission && __permissions[permission]) || isOtherCheckBy ? (
                children
            ) : __isLoadingAccess ? null : (
                <Page403Layout />
            )}
        </>
    )
}

export default WrapPermissionLayout
