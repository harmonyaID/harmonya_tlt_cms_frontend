import { Route } from 'react-router'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import { lazy } from 'react'
import propertyBookingSystemPath from '@/path/propertyBookingSystem.path.ts'

const PropertyBookingMainPage = lazy(
    () => import('@/page/propertyBookingSystem/PropertyBookingSystem.page.tsx'),
)

const PropertyBookingAddPage = lazy(
    () =>
        import('@/page/propertyBookingSystem/PropertyBookingSystemAdd.page.tsx'),
)

const PropertyBookingEditPage = lazy(
    () =>
        import('@/page/propertyBookingSystem/PropertyBookingSystemEdit.page.tsx'),
)

const PropertyBookingDetailPage = lazy(
    () =>
        import('@/page/propertyBookingSystem/PropertyBookingSystemDetail.page.tsx'),
)

const propertyMainPath = propertyBookingSystemPath.main

const PropertyBookingSystemRoute = () => {
    return (
        <>
            <Route path={propertyMainPath}>
                <Route
                    index
                    path={propertyMainPath}
                    element={
                        <SuspenseLayout
                            titleNavbar="Booking System"
                            isCheckPermission={false}>
                            <PropertyBookingMainPage />
                        </SuspenseLayout>
                    }
                />
                <Route
                    index
                    path={propertyBookingSystemPath.add}
                    element={
                        <SuspenseLayout
                            titleNavbar="Booking System"
                            isCheckPermission={false}>
                            <PropertyBookingAddPage />
                        </SuspenseLayout>
                    }
                />
                <Route
                    index
                    path={propertyBookingSystemPath.edit()}
                    element={
                        <SuspenseLayout
                            titleNavbar="Booking System"
                            isCheckPermission={false}>
                            <PropertyBookingEditPage />
                        </SuspenseLayout>
                    }
                />
                <Route
                    index
                    path={propertyBookingSystemPath.detail()}
                    element={
                        <SuspenseLayout
                            titleNavbar="Booking System"
                            isCheckPermission={false}>
                            <PropertyBookingDetailPage />
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

export default PropertyBookingSystemRoute
