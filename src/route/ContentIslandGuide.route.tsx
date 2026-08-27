import { lazy } from 'react'
import { Route } from 'react-router'
import contentIslandGuidePath from '@/path/contentIslandGuide.path.ts'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'

const IslandGuidePage = lazy(
    () => import('@/page/contentIslandGuide/ContentIslandGuide.page.tsx'),
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
        </Route>
    </>
)

export default ContentIslandGuideRoute
