import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import boatPath from '@/path/boat.path.ts'
import boatSettingPath from '@/path/boatSetting.path.ts'
import {
    boatInquiryPrivatePath,
    boatInquiryTransferPath,
} from '@/path/boatInquiry.path.ts'

const BoatPage = lazy(() => import('@/page/boat/Boat.page.tsx'))
const BoatTrashPage = lazy(() => import('@/page/boat/BoatTrash.page.tsx'))
const BoatAddPage = lazy(() => import('@/page/boat/BoatAdd.page.tsx'))
const BoatEditPage = lazy(() => import('@/page/boat/BoatEdit.page.tsx'))
const BoatDetailPage = lazy(() => import('@/page/boat/BoatDetail.page.tsx'))

const BoatInquiryTransferPage = lazy(
    () =>
        import('@/page/boatInquiry/boatTransfer/BoatInquiryTransfer.page.tsx'),
)
const BoatInquiryPrivatePage = lazy(
    () => import('@/page/boatInquiry/privateBoat/BoatInquiryPrivate.page.tsx'),
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

        <Route path={boatInquiryTransferPath.main}>
            <Route
                index
                path={boatInquiryTransferPath.main}
                element={
                    <SuspenseLayout
                        titleNavbar="Boat Transfer"
                        isCheckPermission={false}>
                        <BoatInquiryTransferPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path="*"
                element={<Page404Layout to={boatInquiryTransferPath.main} />}
            />
        </Route>

        <Route path={boatInquiryPrivatePath.main}>
            <Route
                index
                path={boatInquiryPrivatePath.main}
                element={
                    <SuspenseLayout
                        titleNavbar="Private Boat"
                        isCheckPermission={false}>
                        <BoatInquiryPrivatePage />
                    </SuspenseLayout>
                }
            />

            <Route
                path="*"
                element={<Page404Layout to={boatInquiryPrivatePath.main} />}
            />
        </Route>
    </>
)

export default BoatManagementRoute
