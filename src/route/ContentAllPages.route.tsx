import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import contentAllPagesPath from '@/path/contentAllPages.path.ts'

const mainPath = contentAllPagesPath.main

const ContentPagePage = lazy(
    () => import('@/page/contentAllPages/ContentPage.page.tsx'),
)
const ContentPagePageAdd = lazy(
    () => import('@/page/contentAllPages/ContentPageAdd.page.tsx'),
)
const ContentPagePageEdit = lazy(
    () => import('@/page/contentAllPages/ContentPageEdit.page.tsx'),
)
const ContentPagePageDetail = lazy(
    () => import('@/page/contentAllPages/ContentPageDetail.page.tsx'),
)

const ContentAllPageRoute = () => (
    <Route path={mainPath}>
        <Route
            index
            path={mainPath}
            element={
                <SuspenseLayout titleNavbar="Page" isCheckPermission={false}>
                    <ContentPagePage />
                </SuspenseLayout>
            }
        />
        <Route
            path={contentAllPagesPath.add}
            element={
                <SuspenseLayout titleNavbar="Page" isCheckPermission={false}>
                    <ContentPagePageAdd />
                </SuspenseLayout>
            }
        />
        <Route
            path={contentAllPagesPath.edit()}
            element={
                <SuspenseLayout titleNavbar="Page" isCheckPermission={false}>
                    <ContentPagePageEdit />
                </SuspenseLayout>
            }
        />
        <Route
            path={contentAllPagesPath.detail()}
            element={
                <SuspenseLayout titleNavbar="Page" isCheckPermission={false}>
                    <ContentPagePageDetail />
                </SuspenseLayout>
            }
        />

        <Route path="*" element={<Page404Layout to={mainPath} />} />
    </Route>
)

export default ContentAllPageRoute
