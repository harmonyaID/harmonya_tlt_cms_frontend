import CardNavTab from '@/component/card/CardNavTab.tsx'
import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabFAQ from '@/page/contentSetting/pageSetting/container/TabFAQ.tsx'

const PageSettingPage = () => {
    return (
        <>
            <PageTitle title="Page Setting" className="pb-4" />

            <CardNavTab
                tabs={[objectTab('FAQ', 'tabFAQ')]}
                tabContents={[objectTabContent('', <TabFAQ />)]}
            />
        </>
    )
}

export default PageSettingPage
