import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import contentExperiencePath from '@/path/contentExperience.path.ts'

const mainPath = contentExperiencePath.main

const ContentExperiencePage = lazy(
    () => import('@/page/contentExperience/ContentExperience.page.tsx'),
)
const ContentExperienceAddPage = lazy(
    () => import('@/page/contentExperience/ContentExperienceAdd.page.tsx'),
)
const ContentExperienceEditPage = lazy(
    () => import('@/page/contentExperience/ContentExperienceEdit.page.tsx'),
)
const ContentExperienceDetailPage = lazy(
    () => import('@/page/contentExperience/ContentExperienceDetail.page.tsx'),
)

const ContentExperienceRoute = () => (
    <Route path={mainPath}>
        <Route
            index
            path={mainPath}
            element={
                <SuspenseLayout
                    titleNavbar="Experience"
                    isCheckPermission={false}>
                    <ContentExperiencePage />
                </SuspenseLayout>
            }
        />
        <Route
            index
            path={contentExperiencePath.add}
            element={
                <SuspenseLayout
                    titleNavbar="Experience"
                    isCheckPermission={false}>
                    <ContentExperienceAddPage />
                </SuspenseLayout>
            }
        />
        <Route
            index
            path={contentExperiencePath.edit()}
            element={
                <SuspenseLayout
                    titleNavbar="Experience"
                    isCheckPermission={false}>
                    <ContentExperienceEditPage />
                </SuspenseLayout>
            }
        />
        <Route
            index
            path={contentExperiencePath.detail()}
            element={
                <SuspenseLayout
                    titleNavbar="Experience"
                    isCheckPermission={false}>
                    <ContentExperienceDetailPage />
                </SuspenseLayout>
            }
        />

        <Route path="*" element={<Page404Layout to={mainPath} />} />
    </Route>
)

export default ContentExperienceRoute
