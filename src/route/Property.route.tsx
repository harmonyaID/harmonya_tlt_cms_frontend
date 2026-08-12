import propertyPath from '@/path/property.path.ts'
import { Route } from 'react-router'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import { lazy } from 'react'

const PropertyMainPage = lazy(() => import('@/page/property/Property.page.tsx'))

const PropertyTrashPage = lazy(() => import('@/page/property/PropertyTrash.page.tsx'))

const PropertyAddPage = lazy(
    () => import('@/page/property/PropertyAdd.page.tsx'),
)

const PropertyEditPage = lazy(
    () => import('@/page/property/PropertyEdit.page.tsx'),
)

const PropertyDetailPage = lazy(
    () => import('@/page/property/PropertyDetail.page.tsx'),
)

const propertyMainPath = propertyPath.main

const PropertyRoute = () => {
    return (
        <>
            <Route path={propertyMainPath}>
                <Route
                    index
                    path={propertyMainPath}
                    element={
                        <SuspenseLayout
                            titleNavbar="Property"
                            isCheckPermission={false}>
                            <PropertyMainPage />
                        </SuspenseLayout>
                    }
                />
                <Route
                    index
                    path={propertyPath.trash}
                    element={
                        <SuspenseLayout
                            titleNavbar="Property"
                            isCheckPermission={false}>
                            <PropertyTrashPage />
                        </SuspenseLayout>
                    }
                />
                <Route
                    index
                    path={propertyPath.add}
                    element={
                        <SuspenseLayout
                            titleNavbar="Property"
                            isCheckPermission={false}>
                            <PropertyAddPage />
                        </SuspenseLayout>
                    }
                />
                <Route
                    index
                    path={propertyPath.edit()}
                    element={
                        <SuspenseLayout
                            titleNavbar="Property"
                            isCheckPermission={false}>
                            <PropertyEditPage />
                        </SuspenseLayout>
                    }
                />
                <Route
                    index
                    path={propertyPath.detail()}
                    element={
                        <SuspenseLayout
                            titleNavbar="Property"
                            isCheckPermission={false}>
                            <PropertyDetailPage />
                        </SuspenseLayout>
                    }
                />

                <Route
                    path="*"
                    element={<Page404Layout to={propertyMainPath} />}
                />
            </Route>
        </>
    )
}

export default PropertyRoute
