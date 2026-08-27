import { Route } from 'react-router'
import contentOfferPath from '@/path/contentOffer.path.ts'
import { lazy } from 'react'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import Page404Layout from '@/component/layout/Page404.layout.tsx'

const ContentOfferPage = lazy(
    () => import('@/page/contentOffer/ContentOffer.page.tsx'),
)
const ContentOfferTrashPage = lazy(
    () => import('@/page/contentOffer/ContentOfferTrash.page.tsx'),
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

            <Route
                path={contentOfferPath.trash}
                element={
                    <SuspenseLayout
                        titleNavbar="Offer"
                        isCheckPermission={false}>
                        <ContentOfferTrashPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path="*"
                element={<Page404Layout to={contentOfferPath.main} />}
            />
        </Route>
    )
}

export default ContentOfferRoute
