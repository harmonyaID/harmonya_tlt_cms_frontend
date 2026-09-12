import { lazy } from 'react'
import { Route } from 'react-router'
import contentIslandGuidePath from '@/path/contentIslandGuide.path.ts'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import islandGuideAreaPath from '@/path/islandGuideArea.path.ts'

const IslandGuidePage = lazy(
    () => import('@/page/contentIslandGuide/ContentIslandGuide.page.tsx'),
)

const IslandGuideTrashPage = lazy(
    () => import('@/page/contentIslandGuide/ContentIslandGuideTrash.page.tsx'),
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
    </>
)

export default ContentIslandGuideRoute
