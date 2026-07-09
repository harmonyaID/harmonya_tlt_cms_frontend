import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabFAQ from '@/page/contentSetting/pageSetting/container/TabFAQ.tsx'
import TabLanguage from '@/page/contentSetting/pageSetting/container/TabLanguage.tsx'
import TabTLTReview from '@/page/contentSetting/pageSetting/container/TabTLTReview.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'

const PageSettingPage = () => {
    return (
        <>
            <PageTitle title="Page Setting" className="pb-4" />

            <CardNavTab
                tabs={[
                    objectTab('FAQ', 'tabFAQ'),
                    objectTab('Language', 'tabLanguage'),
                    objectTab('TLT Review', 'tabTLTReview'),
                ]}
                tabContents={[
                    objectTabContent('', <TabFAQ />),
                    objectTabContent('', <TabLanguage />),
                    objectTabContent('', <TabTLTReview />),
                ]}
            />
        </>
    )
}

export default PageSettingPage
