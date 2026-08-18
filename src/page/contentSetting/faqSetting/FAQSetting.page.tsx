import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabFAQ from '@/page/contentSetting/faqSetting/container/TabFAQ.tsx'
import { NotAvailable } from '@/component/general/TextDefault.tsx'
import PageComingSoonLayout from '@/component/layout/PageComingSoon.layout.tsx'

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
                    objectTabContent('', <PageComingSoonLayout />),
                ]}
            />
        </>
    )
}

export default FAQSettingPage
