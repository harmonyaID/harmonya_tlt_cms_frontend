import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import contentBlogPath from '@/path/contentBlog.path.ts'

const mainPath = contentBlogPath.main

const ContentBlogPage = lazy(
    () => import('@/page/contentBlog/ContentBlog.page.tsx'),
)
const ContentBlogAddPage = lazy(
    () => import('@/page/contentBlog/ContentBlogAdd.page.tsx'),
)
const ContentBlogEditPage = lazy(
    () => import('@/page/contentBlog/ContentBlogEdit.page.tsx'),
)
const ContentBlogDetailPage = lazy(
    () => import('@/page/contentBlog/ContentBlogDetail.page.tsx'),
)

const ContentBlogRoute = () => (
    <Route path={mainPath}>
        <Route
            index
            path={mainPath}
            element={
                <SuspenseLayout titleNavbar="Blog" isCheckPermission={false}>
                    <ContentBlogPage />
                </SuspenseLayout>
            }
        />
        <Route
            index
            path={contentBlogPath.add}
            element={
                <SuspenseLayout titleNavbar="Blog" isCheckPermission={false}>
                    <ContentBlogAddPage />
                </SuspenseLayout>
            }
        />
        <Route
            index
            path={contentBlogPath.edit()}
            element={
                <SuspenseLayout titleNavbar="Blog" isCheckPermission={false}>
                    <ContentBlogEditPage />
                </SuspenseLayout>
            }
        />
        <Route
            path={contentBlogPath.detail()}
            element={
                <SuspenseLayout titleNavbar="Blog" isCheckPermission={false}>
                    <ContentBlogDetailPage />
                </SuspenseLayout>
            }
        />

        <Route path="*" element={<Page404Layout to={mainPath} />} />
    </Route>
)

export default ContentBlogRoute
