import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import propertySettingPath from '@/path/propertySetting.path.ts'

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
        import('@/page/propertySetting/component/PropertyComponentSetting.page.tsx'),
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

            <Route path={propertySettingPath.component}>
                <Route
                    index
                    path={propertySettingPath.component}
                    element={
                        <SuspenseLayout
                            titleNavbar="Component Setting"
                            isCheckPermission={false}>
                            <PropertyStaticSettingPage />
                        </SuspenseLayout>
                    }
                />

                <Route
                    path="*"
                    element={
                        <Page404Layout to={propertySettingPath.component} />
                    }
                />
            </Route>
        </>
    )
}

export default PropertySettingRoute
