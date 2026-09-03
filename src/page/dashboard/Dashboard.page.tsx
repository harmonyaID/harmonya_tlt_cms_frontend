import { useGlobalPrivateContext } from '@/context/GlobalPrivate.context.tsx'
import { useLayoutEffect } from 'react'
import useDashboardMetrics from '@/page/dashboard/hook/useDashboardMetrics.hook.ts'
import CardCount from '@/component/card/CardCount.tsx'

const DashboardPage = () => {
    const { __profile, __isLoadingProfile, __handleReloadProfile } =
        useGlobalPrivateContext()

    useLayoutEffect(() => {
        __handleReloadProfile()
    }, [])

    const { __detail, __isLoading } = useDashboardMetrics()

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

                    <div className="row pt-4 gx-4">
                        <div className="col-md-4">
                            <CardCount
                                title="Total Blog Post"
                                count={__detail.totalBlogPost}
                            />
                        </div>
                        <div className="col-md-4">
                            <CardCount
                                title="Total Property Bookeasy"
                                count={__detail.totalPropertyBookeasy}
                            />
                        </div>
                        <div className="col-md-4">
                            <CardCount
                                title="Total Property Guesty"
                                count={__detail.totalPropertyGuesty}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default DashboardPage
