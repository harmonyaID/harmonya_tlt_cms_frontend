import { Route } from 'react-router'
import contentOfferPath from '@/path/contentOffer.path.ts'
import { lazy } from 'react'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'

const ContentOfferPage = lazy(
    () => import('@/page/contentOffer/ContentOffer.page.tsx'),
)

const ContentOfferRoute = () => {
    return (
        <Route path={contentOfferPath.main}>
            <Route
                index
                element={
                    <SuspenseLayout
                        titleNavbar="Offer"
                        isCheckPermission={false}>
                        <ContentOfferPage />
                    </SuspenseLayout>
                }
            />
        </Route>
    )
}

export default ContentOfferRoute
