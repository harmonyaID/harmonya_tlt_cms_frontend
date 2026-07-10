import {
    smActivityLogPath,
    smPlatformInfoPath,
    smWebConfigPath,
} from '@/path/systemManagement.path.ts'
import propertyPath from '@/path/property.path.ts'
import propertyBookingSystemPath from '@/path/propertyBookingSystem.path.ts'
import propertySettingPath from '@/path/propertySetting.path.ts'
import { Route } from 'react-router'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import { lazy } from 'react'

const generalSettingPath = propertySettingPath.general
const integrationSettingPath = propertySettingPath.integration

const PropertyGeneralSettingPage = lazy(
    () =>
        import('@/page/propertySetting/general/PropertyGeneralSetting.page.tsx'),
)
const PropertyIntegrationSettingPage = lazy(
    () =>
        import('@/page/propertySetting/integration/PropertyIntegrationSetting.page.tsx'),
)

const PropertySettingRoute = () => {
    return (
        <>
            <Route path={generalSettingPath}>
                <Route
                    index
                    path={generalSettingPath}
                    element={
                        <SuspenseLayout
                            titleNavbar="General Setting"
                            isCheckPermission={false}>
                            <PropertyGeneralSettingPage />
                        </SuspenseLayout>
                    }
                />

                <Route
                    path="*"
                    element={<Page404Layout to={generalSettingPath} />}
                />
            </Route>

            <Route path={integrationSettingPath}>
                <Route
                    index
                    path={integrationSettingPath}
                    element={
                        <SuspenseLayout
                            titleNavbar="Integration Setting"
                            isCheckPermission={false}>
                            <PropertyIntegrationSettingPage />
                        </SuspenseLayout>
                    }
                />

                <Route
                    path="*"
                    element={<Page404Layout to={integrationSettingPath} />}
                />
            </Route>
        </>
    )
}

export default PropertySettingRoute
