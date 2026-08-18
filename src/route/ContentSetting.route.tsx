import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import contentSettingPath from '@/path/contentSetting.path.ts'

const mainFAQPath = contentSettingPath.faq
const mainBlogPath = contentSettingPath.blog
const mainOfferPath = contentSettingPath.offer
const mainPagePath = contentSettingPath.page
const mainExperiencePath = contentSettingPath.experience

const ContentBlogSettingPage = lazy(
    () => import('@/page/contentSetting/blogSetting/BlogSetting.page.tsx'),
)
const ContentFAQSettingPage = lazy(
    () => import('@/page/contentSetting/faqSetting/FAQSetting.page.tsx'),
)
const ContentPageSettingPage = lazy(
    () => import('@/page/contentSetting/pageSetting/PageSetting.page.tsx'),
)
const ContentOfferSettingPage = lazy(
    () => import('@/page/contentSetting/offerSetting/OfferSetting.page.tsx'),
)
const ContentExperienceSettingPage = lazy(
    () =>
        import('@/page/contentSetting/experienceSetting/ExperienceSetting.page.tsx'),
)

const ContentSettingRoute = () => (
    <>
        <Route path={mainFAQPath}>
            <Route
                index
                path={mainFAQPath}
                element={
                    <SuspenseLayout
                        titleNavbar="FAQ Setting"
                        isCheckPermission={false}>
                        <ContentFAQSettingPage />
                    </SuspenseLayout>
                }
            />

            <Route path="*" element={<Page404Layout to={mainPagePath} />} />
        </Route>

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

        <Route path={mainOfferPath}>
            <Route
                index
                path={mainOfferPath}
                element={
                    <SuspenseLayout
                        titleNavbar="Offer Setting"
                        isCheckPermission={false}>
                        <ContentOfferSettingPage />
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

        {/*<Route path={mainExperiencePath}>*/}
        {/*    <Route*/}
        {/*        index*/}
        {/*        path={mainExperiencePath}*/}
        {/*        element={*/}
        {/*            <SuspenseLayout*/}
        {/*                titleNavbar="Experience Setting"*/}
        {/*                isCheckPermission={false}>*/}
        {/*                <ContentExperienceSettingPage />*/}
        {/*            </SuspenseLayout>*/}
        {/*        }*/}
        {/*    />*/}

        {/*    <Route*/}
        {/*        path="*"*/}
        {/*        element={<Page404Layout to={mainExperiencePath} />}*/}
        {/*    />*/}
        {/*</Route>*/}
    </>
)

export default ContentSettingRoute
