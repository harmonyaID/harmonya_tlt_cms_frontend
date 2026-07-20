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
const PropertyStaticSettingPage = lazy(
    () =>
        import('@/page/propertySetting/static/PropertyStaticSetting.page.tsx'),
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

            <Route path={propertySettingPath.static}>
                <Route
                    index
                    path={propertySettingPath.static}
                    element={
                        <SuspenseLayout
                            titleNavbar="Static Setting"
                            isCheckPermission={false}>
                            <PropertyStaticSettingPage />
                        </SuspenseLayout>
                    }
                />

                <Route
                    path="*"
                    element={<Page404Layout to={propertySettingPath.static} />}
                />
            </Route>
        </>
    )
}

export default PropertySettingRoute
