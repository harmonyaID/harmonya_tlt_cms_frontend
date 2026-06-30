import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import contentBlogPath from '@/path/contentBlog.path.ts'

const mainPath = contentBlogPath.main

const ContentBlogPage = lazy(
    () => import('@/page/contentBlog/ContentBlog.page.tsx'),
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

        <Route path="*" element={<Page404Layout to={mainPath} />} />
    </Route>
)

export default ContentBlogRoute
