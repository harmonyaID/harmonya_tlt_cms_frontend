import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabFAQ from '@/page/contentSetting/faqSetting/container/TabFAQ.tsx'
import TabFAQType from '@/page/contentSetting/faqSetting/container/TabFAQType.tsx'

const FAQSettingPage = () => {
    return (
        <>
            <PageTitle title="FAQ Setting" className="pb-4" />

            <CardNavTab
                tabs={[
                    objectTab('FAQ', 'tabFAQ'),
                    objectTab('FAQ Type', 'tabFAQType'),
                ]}
                tabContents={[
                    objectTabContent('', <TabFAQ />),
                    objectTabContent('', <TabFAQType />),
                ]}
            />
        </>
    )
}

export default FAQSettingPage
