import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import contentAllPagesPath from '@/path/contentAllPages.path.ts'

const mainPath = contentAllPagesPath.main

const ContentAllPagesPage = lazy(
    () => import('@/page/contentAllPages/ContentAllPages.page.tsx'),
)

const ContentAllPageRoute = () => (
    <Route path={mainPath}>
        <Route
            index
            path={mainPath}
            element={
                <SuspenseLayout
                    titleNavbar="All Pages"
                    isCheckPermission={false}>
                    <ContentAllPagesPage />
                </SuspenseLayout>
            }
        />

        <Route path="*" element={<Page404Layout to={mainPath} />} />
    </Route>
)

export default ContentAllPageRoute
