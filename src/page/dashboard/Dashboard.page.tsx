import { useGlobalPrivateContext } from '@/context/GlobalPrivate.context.tsx'
import { useLayoutEffect } from 'react'

const DashboardPage = () => {
    const { __profile, __isLoadingProfile, __handleReloadProfile } =
        useGlobalPrivateContext()

    useLayoutEffect(() => {
        __handleReloadProfile()
    }, [])

    return (
        <>
            {__isLoadingProfile ? (
                <h5 className="fw-400 text-neutral-200 text-center py-2 mb-0">
                    Loading...
                </h5>
            ) : (
                <>
                    <h5 className="fs-24 fw-normal text-neutral-100 mb-3">
                        Welcome again,{' '}
                        <span className="fw-semibold">
                            {__profile.fullName}
                        </span>
                    </h5>
                    <p className="fs-16 fw-normal text-neutral-300 mb-0">
                        Hi {__profile.fullName}, don’t forget to control every
                        activity that exist
                    </p>
                </>
            )}
        </>
    )
}

export default DashboardPage
