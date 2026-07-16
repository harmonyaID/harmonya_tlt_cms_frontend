import Page404Layout from '@/component/layout/Page404.layout'
import SuspenseLayout from '@/component/layout/Suspense.layout'
import MainLayoutWrap from '@/component/wrapping/MainLayout.wrap'
import dashboardPath from '@/path/dashboard.path'
// Routes
import PrivateSingleRoute from '@/route/PrivateSingle.route.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import AuthRoute from '@/route/Auth.route.tsx'
import UserRoute from '@/route/User.route.tsx'
import ContentAllPageRoute from '@/route/ContentAllPages.route.tsx'
import ContentBlogRoute from '@/route/ContentBlog.route.tsx'
import ContentHomePageRoute from '@/route/ContentHomePage.route.tsx'
import ContentSettingRoute from '@/route/ContentSetting.route.tsx'
import SystemManagementRoute from '@/route/SystemManagement.route.tsx'
import BoatManagementRoute from '@/route/BoatManagement.route.tsx'
import ContentExperienceRoute from '@/route/ContentExperience.route.tsx'
import PropertyBookingSystemRoute from '@/route/PropertyBookingSystem.route.tsx'
import PropertyRoute from '@/route/Property.route.tsx'
import PropertySettingRoute from '@/route/PropertySetting.route.tsx'
import ContentMenuRoute from '@/route/ContentMenu.route.tsx'
import ErrorBoundary from '@/component/wrapping/ErrorBoundary.tsx'

const App = () => {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayoutWrap />}>
                        {PrivateSingleRoute()}
                        {UserRoute()}
                        {ContentAllPageRoute()}
                        {ContentBlogRoute()}
                        {ContentExperienceRoute()}
                        {ContentHomePageRoute()}
                        {ContentMenuRoute()}
                        {ContentSettingRoute()}
                        {BoatManagementRoute()}
                        {PropertyRoute()}
                        {PropertyBookingSystemRoute()}
                        {PropertySettingRoute()}
                        {SystemManagementRoute()}

                        <Route
                            path="/"
                            element={
                                <Navigate to={dashboardPath.main} replace />
                            }
                        />
                        <Route
                            path="*"
                            element={
                                <SuspenseLayout
                                    titlePage="Page Not Fount - 404"
                                    isCheckPermission={false}>
                                    <Page404Layout to={dashboardPath.main} />
                                </SuspenseLayout>
                            }
                        />
                    </Route>

                    {AuthRoute()}

                    <Route path="/*" element={<Page404Layout />} />
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    )
}

export default App
