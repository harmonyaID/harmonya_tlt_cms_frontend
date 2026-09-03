import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import contentExperiencePath from '@/path/contentExperience.path.ts'
import experienceAreaPath from '@/path/experienceArea.path.ts'
import experienceInquiryFormPath from '@/path/experienceInquiryForm.path.ts'
import experienceTypePath from '@/path/experienceType.path.ts'

const mainPath = contentExperiencePath.main

const ContentExperiencePage = lazy(
    () => import('@/page/contentExperience/ContentExperience.page.tsx'),
)
const ContentExperienceTrashPage = lazy(
    () => import('@/page/contentExperience/ContentExperienceTrash.page.tsx'),
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

// Inquiry Form
const ExpInquiryFormPage = lazy(
    () => import('@/page/experienceInquiryForm/ExpInquiryForm.page.tsx'),
)

const ExpInquiryFormTrashPage = lazy(
    () => import('@/page/experienceInquiryForm/ExpInquiryFormTrash.page.tsx'),
)

// Type
const ExperienceTypePage = lazy(
    () => import('@/page/experienceType/ExpType.page.tsx'),
)
const ExperienceTypeTrashPage = lazy(
    () => import('@/page/experienceType/ExpTypeTrash.page.tsx'),
)
const ExperienceTypeAddPage = lazy(
    () => import('@/page/experienceType/ExpTypeAdd.page.tsx'),
)
const ExperienceTypeEditPage = lazy(
    () => import('@/page/experienceType/ExpTypeEdit.page.tsx'),
)

// Area
const ExperienceAreaPage = lazy(
    () => import('@/page/experienceArea/ExperienceArea.page.tsx'),
)
const ExperienceAreaTrashPage = lazy(
    () => import('@/page/experienceArea/ExperienceAreaTrash.page.tsx'),
)
const ExperienceAreaAddPage = lazy(
    () => import('@/page/experienceArea/ExperienceAreaAdd.page.tsx'),
)
const ExperienceAreaEditPage = lazy(
    () => import('@/page/experienceArea/ExperienceAreaEdit.page.tsx'),
)

const titleInquiryForm = 'Inquiry Form'
const titleArea = 'Area'
const titleType = 'Type'

const ContentExperienceRoute = () => (
    <>
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
                path={contentExperiencePath.trash}
                element={
                    <SuspenseLayout
                        titleNavbar="Experience"
                        isCheckPermission={false}>
                        <ContentExperienceTrashPage />
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

        <Route path={experienceInquiryFormPath.main}>
            <Route
                index
                path={experienceInquiryFormPath.main}
                element={
                    <SuspenseLayout
                        titleNavbar={titleInquiryForm}
                        isCheckPermission={false}>
                        <ExpInquiryFormPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path={experienceInquiryFormPath.trash}
                element={
                    <SuspenseLayout
                        titleNavbar={titleInquiryForm}
                        isCheckPermission={false}>
                        <ExpInquiryFormTrashPage />
                    </SuspenseLayout>
                }
            />
        </Route>

        <Route path={experienceTypePath.main}>
            <Route
                index
                path={experienceTypePath.main}
                element={
                    <SuspenseLayout
                        titleNavbar={titleType}
                        isCheckPermission={false}>
                        <ExperienceTypePage />
                    </SuspenseLayout>
                }
            />
            <Route
                index
                path={experienceTypePath.trash}
                element={
                    <SuspenseLayout
                        titleNavbar={titleType}
                        isCheckPermission={false}>
                        <ExperienceTypeTrashPage />
                    </SuspenseLayout>
                }
            />
            <Route
                index
                path={experienceTypePath.add}
                element={
                    <SuspenseLayout
                        titleNavbar={titleType}
                        isCheckPermission={false}>
                        <ExperienceTypeAddPage />
                    </SuspenseLayout>
                }
            />
            <Route
                index
                path={experienceTypePath.edit()}
                element={
                    <SuspenseLayout
                        titleNavbar={titleType}
                        isCheckPermission={false}>
                        <ExperienceTypeEditPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path="*"
                element={<Page404Layout to={experienceTypePath.main} />}
            />
        </Route>

        <Route path={experienceAreaPath.main}>
            <Route
                index
                path={experienceAreaPath.main}
                element={
                    <SuspenseLayout
                        titleNavbar={titleArea}
                        isCheckPermission={false}>
                        <ExperienceAreaPage />
                    </SuspenseLayout>
                }
            />
            <Route
                path={experienceAreaPath.trash}
                element={
                    <SuspenseLayout
                        titleNavbar={titleArea}
                        isCheckPermission={false}>
                        <ExperienceAreaTrashPage />
                    </SuspenseLayout>
                }
            />
            <Route
                index
                path={experienceAreaPath.add}
                element={
                    <SuspenseLayout
                        titleNavbar={titleArea}
                        isCheckPermission={false}>
                        <ExperienceAreaAddPage />
                    </SuspenseLayout>
                }
            />
            <Route
                index
                path={experienceAreaPath.edit()}
                element={
                    <SuspenseLayout
                        titleNavbar={titleArea}
                        isCheckPermission={false}>
                        <ExperienceAreaEditPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path="*"
                element={<Page404Layout to={experienceAreaPath.main} />}
            />
        </Route>
    </>
)

export default ContentExperienceRoute
