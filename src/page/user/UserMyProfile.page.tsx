import { useLayoutEffect } from 'react'
import { useGlobalPrivateContext } from '@/context/GlobalPrivate.context.tsx'
import UserDetail from '@/page/user/container/UserDetail.tsx'

const UserMyProfilePage = () => {
    const { __profile, __isLoadingProfile, __handleReloadProfile } =
        useGlobalPrivateContext()

    useLayoutEffect(() => {
        __handleReloadProfile()
    }, [])

    return <UserDetail title="Profile Information" id={__profile.id} />
}

export default UserMyProfilePage
