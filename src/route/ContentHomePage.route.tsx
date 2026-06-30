import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import contentHomePagePath from '@/path/contentHomePage.path.ts'

const mainPath = contentHomePagePath.main

const ContentHomePage = lazy(
    () => import('@/page/contentHomePage/ContentHomePage.page.tsx'),
)

const ContentHomePageRoute = () => (
    <Route path={mainPath}>
        <Route
            index
            path={mainPath}
            element={
                <SuspenseLayout titleNavbar="Blog" isCheckPermission={false}>
                    <ContentHomePage />
                </SuspenseLayout>
            }
        />

        <Route path="*" element={<Page404Layout to={mainPath} />} />
    </Route>
)

export default ContentHomePageRoute
