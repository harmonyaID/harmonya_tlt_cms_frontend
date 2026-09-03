import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import propertyPath from '@/path/property.path.ts'
import propertyContactFormPath from '@/path/propertyContactForm.path.ts'

const PropertyMainPage = lazy(() => import('@/page/property/Property.page.tsx'))

const PropertyTrashPage = lazy(
    () => import('@/page/property/PropertyTrash.page.tsx'),
)

const PropertyAddPage = lazy(
    () => import('@/page/property/PropertyAdd.page.tsx'),
)

const PropertyEditPage = lazy(
    () => import('@/page/property/PropertyEdit.page.tsx'),
)

const PropertyDetailPage = lazy(
    () => import('@/page/property/PropertyDetail.page.tsx'),
)

// Property Form Request
const PropertyFormRequestPage = lazy(
    () => import('@/page/propertyContactForm/PropertyContactForm.page.tsx'),
)

const PropertyRoute = () => {
    return (
        <>
            <Route path={propertyPath.main}>
                <Route
                    index
                    path={propertyPath.main}
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
                    element={<Page404Layout to={propertyPath.main} />}
                />
            </Route>

            <Route path={propertyContactFormPath.main}>
                <Route
                    index
                    path={propertyContactFormPath.main}
                    element={
                        <SuspenseLayout
                            titleNavbar="Property Contact Form"
                            isCheckPermission={false}>
                            <PropertyFormRequestPage />
                        </SuspenseLayout>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Page404Layout to={propertyContactFormPath.main} />
                    }
                />
            </Route>
        </>
    )
}

export default PropertyRoute
