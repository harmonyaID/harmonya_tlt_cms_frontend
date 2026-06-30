import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import userPath from '@/path/user.path.ts'

const UserPage = lazy(() => import('@/page/user/User.page.tsx'))

const UserRoute = () => (
    <Route path={userPath.main}>
        <Route
            index
            path={userPath.main}
            element={
                <SuspenseLayout titleNavbar="User" isCheckPermission={false}>
                    <UserPage />
                </SuspenseLayout>
            }
        />

        <Route path="*" element={<Page404Layout to={userPath.main} />} />
    </Route>
)

export default UserRoute
