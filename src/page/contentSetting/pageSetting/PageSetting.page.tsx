import CardNavTab from '@/component/card/CardNavTab.tsx'
import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabFAQ from '@/page/contentSetting/faqSetting/container/TabFAQ.tsx'
import PageComingSoonLayout from '@/component/layout/PageComingSoon.layout.tsx'

const PageSettingPage = () => {
    return (
        <>
            <PageTitle title="Page Setting" className="pb-4" />

            <CardNavTab
                tabs={[
                    objectTab('TLT Team', 'tabTLTTeam'),
                    objectTab('TLT Review', 'tabTLTReview'),
                    objectTab('TLT Testimonial', 'tabTLTTestimonial'),
                    objectTab('TLT Media Partner', 'tabTLTMediaPartner'),
                ]}
                tabContents={[
                    objectTabContent('', <PageComingSoonLayout />),
                    objectTabContent('', <PageComingSoonLayout />),
                    objectTabContent('', <PageComingSoonLayout />),
                    objectTabContent('', <PageComingSoonLayout />),
                ]}
            />
        </>
    )
}

export default PageSettingPage
