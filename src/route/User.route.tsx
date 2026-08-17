import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import userPath from '@/path/user.path.ts'

const UserPage = lazy(() => import('@/page/user/User.page.tsx'))
const UserTrashPage = lazy(() => import('@/page/user/UserTrash.page.tsx'))
const UserAddPage = lazy(() => import('@/page/user/UserAdd.page.tsx'))
const UserEditPage = lazy(() => import('@/page/user/UserEdit.page.tsx'))
const MyProfilePage = lazy(() => import('@/page/user/UserMyProfile.page'))
const MyProfileEditPage = lazy(
    () => import('@/page/user/UserMyProfileEdit.page'),
)

const UserRoute = () => (
    <>
        <Route path={userPath.main}>
            <Route
                index
                path={userPath.main}
                element={
                    <SuspenseLayout
                        titleNavbar="User"
                        isCheckPermission={false}>
                        <UserPage />
                    </SuspenseLayout>
                }
            />
            <Route
                path={userPath.trash}
                element={
                    <SuspenseLayout
                        titleNavbar="User Trash"
                        isCheckPermission={false}>
                        <UserTrashPage />
                    </SuspenseLayout>
                }
            />
            <Route
                path={userPath.add}
                element={
                    <SuspenseLayout
                        titleNavbar="User"
                        isCheckPermission={false}>
                        <UserAddPage />
                    </SuspenseLayout>
                }
            />
            <Route
                path={userPath.edit()}
                element={
                    <SuspenseLayout
                        titleNavbar="User"
                        isCheckPermission={false}>
                        <UserEditPage />
                    </SuspenseLayout>
                }
            />

            <Route path="*" element={<Page404Layout to={userPath.main} />} />
        </Route>

        <Route
            index
            path={userPath.myProfile}
            element={
                <SuspenseLayout titleNavbar="Profile" isCheckPermission={false}>
                    <MyProfilePage />
                </SuspenseLayout>
            }
        />
        <Route
            index
            path={userPath.myProfileEdit}
            element={
                <SuspenseLayout titleNavbar="Profile" isCheckPermission={false}>
                    <MyProfileEditPage />
                </SuspenseLayout>
            }
        />
    </>
)

export default UserRoute
