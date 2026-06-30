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

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayoutWrap />}>
                    {PrivateSingleRoute()}
                    {UserRoute()}
                    {ContentAllPageRoute()}
                    {ContentBlogRoute()}
                    {ContentHomePageRoute()}
                    {ContentSettingRoute()}

                    <Route
                        path="/"
                        element={<Navigate to={dashboardPath.main} replace />}
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
    )
}

export default App
