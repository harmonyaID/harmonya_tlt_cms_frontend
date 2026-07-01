import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabFAQ from '@/page/contentSetting/pageSetting/container/TabFAQ.tsx'
import TabLanguage from '@/page/contentSetting/pageSetting/container/TabLanguage.tsx'
import TabTLTReview from '@/page/contentSetting/pageSetting/container/TabTLTReview.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import TabMediaPartner from '@/page/contentSetting/pageSetting/container/TabMediaPartner.tsx'

const PageSettingPage = () => {
    return (
        <>
            <div className="mb-4">
                <PageTitle title="Page Setting" />
            </div>

            <CardNavTab
                tabs={[
                    objectTab('FAQ', 'tabFAQ'),
                    objectTab('Language', 'tabLanguage'),
                    objectTab('TLT Review', 'tabTLTReview'),
                    objectTab('Media Partner', 'tabMediaPartner'),
                ]}
                tabContents={[
                    objectTabContent('', <TabFAQ />),
                    objectTabContent('', <TabLanguage />),
                    objectTabContent('', <TabTLTReview />),
                    objectTabContent('', <TabMediaPartner />),
                ]}
            />
        </>
    )
}

export default PageSettingPage
