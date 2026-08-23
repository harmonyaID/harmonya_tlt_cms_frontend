import CardNavTab from '@/component/card/CardNavTab.tsx'
import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabFAQ from '@/page/contentSetting/faqSetting/container/TabFAQ.tsx'
import PageComingSoonLayout from '@/component/layout/PageComingSoon.layout.tsx'
import TabTLTReview from '@/page/contentSetting/pageSetting/container/TabTLTReview.tsx'
import TabTLTTestimonial from '@/page/contentSetting/pageSetting/container/TabTLTTestimonial.tsx'
import TabTLTMediaPartner from '@/page/contentSetting/pageSetting/container/TabTLTMediaPartner.tsx'

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
                    objectTabContent('', <TabTLTReview />),
                    objectTabContent('', <TabTLTTestimonial />),
                    objectTabContent('', <TabTLTMediaPartner />),
                ]}
            />
        </>
    )
}

export default PageSettingPage
