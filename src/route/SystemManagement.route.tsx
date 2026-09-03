import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import {
    smActivityLogPath,
    smGeneralSettingPath,
    smPlatformInfoPath,
    smWebConfigPath,
} from '@/path/systemManagement.path.ts'

const SettingWebConfigPage = lazy(
    () => import('@/page/settingWebConfig/SettingWebConfig.page.tsx'),
)

const SettingActivityLogPage = lazy(
    () => import('@/page/systemActivityLog/SystemActivityLog.page.tsx'),
)

const SystemPlatformInfoPage = lazy(
    () => import('@/page/systemPlatformInfo/SystemPlatformInfo.page.tsx'),
)

const SystemGeneralSettingPage = lazy(
    () => import('@/page/systemGeneralSetting/SystemGeneralSetting.page.tsx'),
)

const webConfigMainPath = smWebConfigPath.main

const activityLogMainPath = smActivityLogPath.main

const platformInfoMainPath = smPlatformInfoPath.main

const generalSettingMainPath = smGeneralSettingPath.main

const SystemManagementRoute = () => {
    return (
        <>
            {/*Web Config*/}
            <Route path={webConfigMainPath}>
                <Route
                    index
                    path={webConfigMainPath}
                    element={
                        <SuspenseLayout
                            titleNavbar="Website Configuration"
                            isCheckPermission={false}>
                            <SettingWebConfigPage />
                        </SuspenseLayout>
                    }
                />

                <Route
                    path="*"
                    element={<Page404Layout to={webConfigMainPath} />}
                />
            </Route>

            {/*Activity Log*/}
            <Route path={activityLogMainPath}>
                <Route
                    index
                    path={activityLogMainPath}
                    element={
                        <SuspenseLayout
                            titleNavbar="Activity Log"
                            isCheckPermission={false}>
                            <SettingActivityLogPage />
                        </SuspenseLayout>
                    }
                />

                <Route
                    path="*"
                    element={<Page404Layout to={activityLogMainPath} />}
                />
            </Route>

            {/*Platform Information*/}
            <Route path={platformInfoMainPath}>
                <Route
                    index
                    path={platformInfoMainPath}
                    element={
                        <SuspenseLayout
                            titleNavbar="Platform Information"
                            isCheckPermission={false}>
                            <SystemPlatformInfoPage />
                        </SuspenseLayout>
                    }
                />

                <Route
                    path="*"
                    element={<Page404Layout to={platformInfoMainPath} />}
                />
            </Route>

            {/*General Setting*/}
            <Route path={generalSettingMainPath}>
                <Route
                    index
                    path={generalSettingMainPath}
                    element={
                        <SuspenseLayout
                            titleNavbar="General Setting"
                            isCheckPermission={false}>
                            <SystemGeneralSettingPage />
                        </SuspenseLayout>
                    }
                />

                <Route
                    path="*"
                    element={<Page404Layout to={generalSettingMainPath} />}
                />
            </Route>
        </>
    )
}

export default SystemManagementRoute
