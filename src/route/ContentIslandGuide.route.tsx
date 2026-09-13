import { lazy } from 'react'
import { Route } from 'react-router'
import contentIslandGuidePath from '@/path/contentIslandGuide.path.ts'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import islandGuideAreaPath from '@/path/islandGuideArea.path.ts'
import islandGuideTypePath from '@/path/islandGuideType.path.ts'

const IslandGuidePage = lazy(
    () => import('@/page/contentIslandGuide/ContentIslandGuide.page.tsx'),
)
const IslandGuideTrashPage = lazy(
    () => import('@/page/contentIslandGuide/ContentIslandGuideTrash.page.tsx'),
)
const IslandGuideAddPage = lazy(
    () => import('@/page/contentIslandGuide/ContentIslandGuideAdd.page.tsx'),
)
const IslandGuideEditPage = lazy(
    () => import('@/page/contentIslandGuide/ContentIslandGuideEdit.page.tsx'),
)
const IslandGuideDetailPage = lazy(
    () => import('@/page/contentIslandGuide/ContentIslandGuideDetail.page.tsx'),
)

// Setting Area
const IslandGuideAreaPage = lazy(
    () => import('@/page/islandGuideArea/IslandGuideArea.page'),
)
const IslandGuideAreaTrashPage = lazy(
    () => import('@/page/islandGuideArea/IslandGuideAreaTrash.page'),
)
const IslandGuideAreaAddPage = lazy(
    () => import('@/page/islandGuideArea/IslandGuideAreaAdd.page'),
)
const IslandGuideAreaEditPage = lazy(
    () => import('@/page/islandGuideArea/IslandGuideAreaEdit.page'),
)

// Setting Type
const IslandGuideTypePage = lazy(
    () => import('@/page/islandGuideType/IslandGuideType.page'),
)
const IslandGuideTypeTrashPage = lazy(
    () => import('@/page/islandGuideType/IslandGuideTypeTrash.page'),
)
const IslandGuideTypeAddPage = lazy(
    () => import('@/page/islandGuideType/IslandGuideTypeAdd.page'),
)
const IslandGuideTypeEditPage = lazy(
    () => import('@/page/islandGuideType/IslandGuideTypeEdit.page'),
)

const ContentIslandGuideRoute = () => (
    <>
        <Route path={contentIslandGuidePath.main}>
            <Route
                index
                element={
                    <SuspenseLayout
                        titleNavbar="Island Guide"
                        isCheckPermission={false}>
                        <IslandGuidePage />
                    </SuspenseLayout>
                }
            />

            <Route
                path={contentIslandGuidePath.trash}
                element={
                    <SuspenseLayout
                        titleNavbar="Island Guide"
                        isCheckPermission={false}>
                        <IslandGuideTrashPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path={contentIslandGuidePath.add}
                element={
                    <SuspenseLayout
                        titleNavbar="Island Guide"
                        isCheckPermission={false}>
                        <IslandGuideAddPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path={contentIslandGuidePath.edit()}
                element={
                    <SuspenseLayout
                        titleNavbar="Island Guide"
                        isCheckPermission={false}>
                        <IslandGuideEditPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path={contentIslandGuidePath.detail()}
                element={
                    <SuspenseLayout
                        titleNavbar="Island Guide"
                        isCheckPermission={false}>
                        <IslandGuideDetailPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path="*"
                element={<Page404Layout to={contentIslandGuidePath.main} />}
            />
        </Route>

        <Route path={islandGuideAreaPath.main}>
            <Route
                index
                element={
                    <SuspenseLayout
                        titleNavbar="Island Guide Area"
                        isCheckPermission={false}>
                        <IslandGuideAreaPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path={islandGuideAreaPath.trash}
                element={
                    <SuspenseLayout
                        titleNavbar="Island Guide Area"
                        isCheckPermission={false}>
                        <IslandGuideAreaTrashPage />
                    </SuspenseLayout>
                }
            />
            <Route
                path={islandGuideAreaPath.add}
                element={
                    <SuspenseLayout
                        titleNavbar="Island Guide Area"
                        isCheckPermission={false}>
                        <IslandGuideAreaAddPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path={islandGuideAreaPath.edit()}
                element={
                    <SuspenseLayout
                        titleNavbar="Island Guide Area"
                        isCheckPermission={false}>
                        <IslandGuideAreaEditPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path="*"
                element={<Page404Layout to={islandGuideAreaPath.main} />}
            />
        </Route>

        <Route path={islandGuideTypePath.main}>
            <Route
                index
                element={
                    <SuspenseLayout
                        titleNavbar="Island Guide Type"
                        isCheckPermission={false}>
                        <IslandGuideTypePage />
                    </SuspenseLayout>
                }
            />

            <Route
                path={islandGuideTypePath.trash}
                element={
                    <SuspenseLayout
                        titleNavbar="Island Guide Type"
                        isCheckPermission={false}>
                        <IslandGuideTypeTrashPage />
                    </SuspenseLayout>
                }
            />
            <Route
                path={islandGuideTypePath.add}
                element={
                    <SuspenseLayout
                        titleNavbar="Island Guide Type"
                        isCheckPermission={false}>
                        <IslandGuideTypeAddPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path={islandGuideTypePath.edit()}
                element={
                    <SuspenseLayout
                        titleNavbar="Island Guide Type"
                        isCheckPermission={false}>
                        <IslandGuideTypeEditPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path="*"
                element={<Page404Layout to={islandGuideTypePath.main} />}
            />
        </Route>
    </>
)

export default ContentIslandGuideRoute
