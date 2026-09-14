import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import boatPath from '@/path/boat.path.ts'
import boatSettingPath from '@/path/boatSetting.path.ts'
import { boatInquiryGeneral } from '@/path/boatInquiry.path.ts'

const BoatPage = lazy(() => import('@/page/boat/Boat.page.tsx'))
const BoatTrashPage = lazy(() => import('@/page/boat/BoatTrash.page.tsx'))
const BoatAddPage = lazy(() => import('@/page/boat/BoatAdd.page.tsx'))
const BoatEditPage = lazy(() => import('@/page/boat/BoatEdit.page.tsx'))
const BoatDetailPage = lazy(() => import('@/page/boat/BoatDetail.page.tsx'))

const BoatInquiryPage = lazy(
    () => import('@/page/boatInquiry/BoatInquiry.page.tsx'),
)
const BoatInquiryAddPage = lazy(
    () => import('@/page/boatInquiry/BoatInquiryAdd.page.tsx'),
)

const BoatSettingPage = lazy(
    () => import('@/page/boatSetting/BoatSetting.page.tsx'),
)

const boatMainPath = boatPath.main

const boatSettingMainPath = boatSettingPath.main

const BoatManagementRoute = () => (
    <>
        <Route path={boatMainPath}>
            <Route
                index
                path={boatMainPath}
                element={
                    <SuspenseLayout
                        titleNavbar="Boat"
                        isCheckPermission={false}>
                        <BoatPage />
                    </SuspenseLayout>
                }
            />
            <Route
                index
                path={boatPath.trash}
                element={
                    <SuspenseLayout
                        titleNavbar="Boat Trash"
                        isCheckPermission={false}>
                        <BoatTrashPage />
                    </SuspenseLayout>
                }
            />
            <Route
                path={boatPath.add}
                element={
                    <SuspenseLayout
                        titleNavbar="Boat"
                        isCheckPermission={false}>
                        <BoatAddPage />
                    </SuspenseLayout>
                }
            />
            <Route
                path={boatPath.edit()}
                element={
                    <SuspenseLayout
                        titleNavbar="Boat"
                        isCheckPermission={false}>
                        <BoatEditPage />
                    </SuspenseLayout>
                }
            />
            <Route
                path={boatPath.detail()}
                element={
                    <SuspenseLayout
                        titleNavbar="Boat"
                        isCheckPermission={false}>
                        <BoatDetailPage />
                    </SuspenseLayout>
                }
            />

            <Route path="*" element={<Page404Layout to={boatMainPath} />} />
        </Route>

        <Route path={boatSettingMainPath}>
            <Route
                index
                path={boatSettingMainPath}
                element={
                    <SuspenseLayout
                        titleNavbar="Boat Setting"
                        isCheckPermission={false}>
                        <BoatSettingPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path="*"
                element={<Page404Layout to={boatSettingMainPath} />}
            />
        </Route>

        <Route path={boatInquiryGeneral.main()}>
            <Route
                index
                path={boatInquiryGeneral.main()}
                element={
                    <SuspenseLayout
                        titleNavbar="Boat Inquiry"
                        isCheckPermission={false}>
                        <BoatInquiryPage />
                    </SuspenseLayout>
                }
            />

            <Route
                index
                path={boatInquiryGeneral.add()}
                element={
                    <SuspenseLayout
                        titleNavbar="Boat Inquiry"
                        isCheckPermission={false}>
                        <BoatInquiryAddPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path="*"
                element={<Page404Layout to={boatInquiryGeneral.main()} />}
            />
        </Route>
    </>
)

export default BoatManagementRoute
