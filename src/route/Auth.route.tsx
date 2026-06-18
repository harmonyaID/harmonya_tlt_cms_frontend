import { ReactNode } from 'react'
import { Routes, Route } from 'react-router'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import actionRemoveBaseURLHelper from '@/helper/base/actionRemoveBaseURL.helper.ts'
import ForgotPasswordPage from '@/page/auth/ForgotPassword.page.tsx'
import LoginPage from '@/page/auth/Login.page.tsx'
import ResetPasswordPage from '@/page/auth/ResetPassword.page.tsx'
import authPath from '@/path/auth.path.ts'

const objectRout = (path: string, element: ReactNode) => ({ path, element })

const AuthRoute = () => (
    <Route>
        {/*Public Page's*/}
        <Route
            path={authPath.login}
            element={
                <SuspenseLayout titlePage="Login" isCheckPermission={false}>
                    <LoginPage />
                </SuspenseLayout>
            }
        />
        <Route
            path={authPath.forgotPassword}
            element={
                <SuspenseLayout
                    titlePage="Forgot Password"
                    isCheckPermission={false}>
                    <ForgotPasswordPage />
                </SuspenseLayout>
            }
        />
        <Route
            path={authPath.resetPassword}
            element={
                <SuspenseLayout
                    titlePage="Reset Password"
                    isCheckPermission={false}>
                    <ResetPasswordPage />
                </SuspenseLayout>
            }
        />
    </Route>
)

export default AuthRoute
