import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import propertyPath from '@/path/property.path.ts'
import propertyContactFormPath from '@/path/propertyContactForm.path.ts'
import propertyInquiryPath from '@/path/propertyInquiry.path.ts'
import propertyVariantPath from '@/path/propertyVariant.path.ts'

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

// Property Inquiry
const PropertyInquiryPage = lazy(
    () => import('@/page/propertyInquiry/PropertyInquiry.page.tsx'),
)

// Property Variant
const PropertyVariantPage = lazy(
    () => import('@/page/propertyVariant/PropertyVariant.page.tsx'),
)
const PropertyVariantAddPage = lazy(
    () => import('@/page/propertyVariant/PropertyVariantAdd.page.tsx'),
)
const PropertyVariantEditPage = lazy(
    () => import('@/page/propertyVariant/PropertyVariantEdit.page.tsx'),
)
const PropertyVariantDetailPage = lazy(
    () => import('@/page/propertyVariant/PropertyVariantDetail.page.tsx'),
)
const PropertyVariantTrashPage = lazy(
    () => import('@/page/propertyVariant/PropertyVariantTrash.page.tsx'),
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

            <Route path={propertyVariantPath.main}>
                <Route
                    index
                    path={propertyVariantPath.main}
                    element={
                        <SuspenseLayout
                            titleNavbar="Property Variant"
                            isCheckPermission={false}>
                            <PropertyVariantPage />
                        </SuspenseLayout>
                    }
                />
                <Route
                    index
                    path={propertyVariantPath.trash}
                    element={
                        <SuspenseLayout
                            titleNavbar="Property Variant"
                            isCheckPermission={false}>
                            <PropertyVariantTrashPage />
                        </SuspenseLayout>
                    }
                />
                <Route
                    index
                    path={propertyVariantPath.add}
                    element={
                        <SuspenseLayout
                            titleNavbar="Property Variant"
                            isCheckPermission={false}>
                            <PropertyVariantAddPage />
                        </SuspenseLayout>
                    }
                />
                <Route
                    index
                    path={propertyVariantPath.edit()}
                    element={
                        <SuspenseLayout
                            titleNavbar="Property Variant"
                            isCheckPermission={false}>
                            <PropertyVariantEditPage />
                        </SuspenseLayout>
                    }
                />
                <Route
                    index
                    path={propertyVariantPath.detail()}
                    element={
                        <SuspenseLayout
                            titleNavbar="Property Variant"
                            isCheckPermission={false}>
                            <PropertyVariantDetailPage />
                        </SuspenseLayout>
                    }
                />

                <Route
                    path="*"
                    element={<Page404Layout to={propertyVariantPath.main} />}
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

            <Route path={propertyInquiryPath.main}>
                <Route
                    index
                    path={propertyInquiryPath.main}
                    element={
                        <SuspenseLayout
                            titleNavbar="Property Inquiry"
                            isCheckPermission={false}>
                            <PropertyInquiryPage />
                        </SuspenseLayout>
                    }
                />
                <Route
                    path="*"
                    element={<Page404Layout to={propertyInquiryPath.main} />}
                />
            </Route>
        </>
    )
}

export default PropertyRoute
