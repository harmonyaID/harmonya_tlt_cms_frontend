import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import contentSettingPath from '@/path/contentSetting.path.ts'

const mainBlogPath = contentSettingPath.blog
const mainPagePath = contentSettingPath.page
const mainExperiencePath = contentSettingPath.experience

const ContentBlogSettingPage = lazy(
    () => import('@/page/contentSetting/blogSetting/BlogSetting.page.tsx'),
)
const ContentPageSettingPage = lazy(
    () => import('@/page/contentSetting/pageSetting/PageSetting.page.tsx'),
)
const ContentExperienceSettingPage = lazy(
    () =>
        import('@/page/contentSetting/experienceSetting/ExperienceSetting.page.tsx'),
)

const ContentSettingRoute = () => (
    <>
        <Route path={mainPagePath}>
            <Route
                index
                path={mainPagePath}
                element={
                    <SuspenseLayout
                        titleNavbar="Page Setting"
                        isCheckPermission={false}>
                        <ContentPageSettingPage />
                    </SuspenseLayout>
                }
            />

            <Route path="*" element={<Page404Layout to={mainPagePath} />} />
        </Route>

        <Route path={mainBlogPath}>
            <Route
                index
                path={mainBlogPath}
                element={
                    <SuspenseLayout
                        titleNavbar="Blog Setting"
                        isCheckPermission={false}>
                        <ContentBlogSettingPage />
                    </SuspenseLayout>
                }
            />

            <Route path="*" element={<Page404Layout to={mainBlogPath} />} />
        </Route>

        <Route path={mainExperiencePath}>
            <Route
                index
                path={mainExperiencePath}
                element={
                    <SuspenseLayout
                        titleNavbar="Experience Setting"
                        isCheckPermission={false}>
                        <ContentExperienceSettingPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path="*"
                element={<Page404Layout to={mainExperiencePath} />}
            />
        </Route>
    </>
)

export default ContentSettingRoute
