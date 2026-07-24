import { Route } from 'react-router'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import { lazy } from 'react'
import propertyReviewsPath from '@/path/propertyReviews.path.ts'

const PropertyReviewsPage = lazy(
    () => import('@/page/propertyReviews/PropertyReviews.page.tsx'),
)

const PropertyReviewsAddPage = lazy(
    () => import('@/page/propertyReviews/PropertyReviewsAdd.page.tsx'),
)

const PropertyReviewsEditPage = lazy(
    () => import('@/page/propertyReviews/PropertyReviewsEdit.page.tsx'),
)

const PropertyReviewsDetailPage = lazy(
    () => import('@/page/propertyReviews/PropertyReviewsDetail.page.tsx'),
)

const pathMain = propertyReviewsPath.main

const titleNavbar = 'Property Reviews'

const PropertyReviewsRoute = () => {
    return (
        <>
            <Route path={pathMain}>
                <Route
                    index
                    path={pathMain}
                    element={
                        <SuspenseLayout
                            titleNavbar={titleNavbar}
                            isCheckPermission={false}>
                            <PropertyReviewsPage />
                        </SuspenseLayout>
                    }
                />
                <Route
                    index
                    path={propertyReviewsPath.add}
                    element={
                        <SuspenseLayout
                            titleNavbar={titleNavbar}
                            isCheckPermission={false}>
                            <PropertyReviewsAddPage />
                        </SuspenseLayout>
                    }
                />
                <Route
                    index
                    path={propertyReviewsPath.edit()}
                    element={
                        <SuspenseLayout
                            titleNavbar={titleNavbar}
                            isCheckPermission={false}>
                            <PropertyReviewsEditPage />
                        </SuspenseLayout>
                    }
                />
                <Route
                    index
                    path={propertyReviewsPath.detail()}
                    element={
                        <SuspenseLayout
                            titleNavbar={titleNavbar}
                            isCheckPermission={false}>
                            <PropertyReviewsDetailPage />
                        </SuspenseLayout>
                    }
                />

                <Route path="*" element={<Page404Layout to={pathMain} />} />
            </Route>
        </>
    )
}

export default PropertyReviewsRoute
