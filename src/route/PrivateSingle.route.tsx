import { lazy } from 'react'
import { Route } from 'react-router'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import actionRemoveBaseURLHelper from '@/helper/base/actionRemoveBaseURL.helper.ts'
import dashboardPath from '@/path/dashboard.path.ts'
import analyticsPath from '@/path/analytics.path.ts'
// import Page404Layout from "@/component/layout/Page404.layout.tsx";

const DashboardPage = lazy(() => import('@/page/dashboard/Dashboard.page'))
const AnalyticsPage = lazy(() => import('@/page/analytics/Analytics.page'))

const PrivateSingleRoute = () => (
    <>
        <Route
            path={dashboardPath.main}
            element={
                <SuspenseLayout
                    titleNavbar="Dashboard"
                    isCheckPermission={false}>
                    <DashboardPage />
                </SuspenseLayout>
            }
        />

        <Route
            path={analyticsPath}
            element={
                <SuspenseLayout
                    titleNavbar="Analytics"
                    isCheckPermission={false}>
                    <AnalyticsPage />
                </SuspenseLayout>
            }
        />
    </>
)

export default PrivateSingleRoute
