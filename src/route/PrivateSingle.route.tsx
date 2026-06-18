import { lazy } from 'react'
import { Route } from 'react-router'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import actionRemoveBaseURLHelper from '@/helper/base/actionRemoveBaseURL.helper.ts'
import dashboardPath from '@/path/dashboard.path.ts'
// import Page404Layout from "@/component/layout/Page404.layout.tsx";

const DashboardPage = lazy(() => import('@/page/dashboard/Dashboard.page'))

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
    </>
)

export default PrivateSingleRoute
