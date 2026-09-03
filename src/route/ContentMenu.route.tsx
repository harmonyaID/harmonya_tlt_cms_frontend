import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import contentMenuPath from '@/path/contentMenu.path.ts'

const mainPath = contentMenuPath.main

const titleNavbar = 'Menu'

const ContentContentPage = lazy(
    () => import('@/page/contentMenu/ContentMenu.page.tsx'),
)
const ContentContentAddPage = lazy(
    () => import('@/page/contentMenu/ContentMenuAdd.page.tsx'),
)
const ContentContentEditPage = lazy(
    () => import('@/page/contentMenu/ContentMenuEdit.page.tsx'),
)
const ContentContentDetailPage = lazy(
    () => import('@/page/contentMenu/ContentMenuDetail.page.tsx'),
)

const ContentMenuRoute = () => (
    <Route path={mainPath}>
        <Route
            index
            path={mainPath}
            element={
                <SuspenseLayout
                    titleNavbar={titleNavbar}
                    isCheckPermission={false}>
                    <ContentContentPage />
                </SuspenseLayout>
            }
        />
        <Route
            index
            path={contentMenuPath.add}
            element={
                <SuspenseLayout
                    titleNavbar={titleNavbar}
                    isCheckPermission={false}>
                    <ContentContentAddPage />
                </SuspenseLayout>
            }
        />
        <Route
            index
            path={contentMenuPath.edit()}
            element={
                <SuspenseLayout
                    titleNavbar={titleNavbar}
                    isCheckPermission={false}>
                    <ContentContentEditPage />
                </SuspenseLayout>
            }
        />
        <Route
            index
            path={contentMenuPath.detail()}
            element={
                <SuspenseLayout
                    titleNavbar={titleNavbar}
                    isCheckPermission={false}>
                    <ContentContentDetailPage />
                </SuspenseLayout>
            }
        />

        <Route path="*" element={<Page404Layout to={mainPath} />} />
    </Route>
)

export default ContentMenuRoute
