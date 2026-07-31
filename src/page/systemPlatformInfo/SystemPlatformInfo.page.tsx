import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import { objectListDetail } from '@/config/objectList.config.ts'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import TabCacheInfo from '@/page/systemPlatformInfo/container/TabCacheInfo.tsx'
import TabSystemInfo from '@/page/systemPlatformInfo/container/TabSystemInfo.tsx'
import { getWebConfig } from '@/service/api/systemManagement.api.ts'

const SystemPlatformInfoPage = () => {
    return (
        <>
            <PageTitle title="Platform Information" className="pb-4" />

            <CardNavTab
                tabs={[
                    objectTab('System Information', 'tabSystemInfo'),
                    objectTab('Cache Management', 'tabCacheInfo'),
                ]}
                tabContents={[
                    objectTabContent('System Information', <TabSystemInfo />),
                    objectTabContent('Cache Management', <TabCacheInfo />),
                ]}
            />
        </>
    )
}

export default SystemPlatformInfoPage
