import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import PageComingSoonLayout from '@/component/layout/PageComingSoon.layout.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import TabOfferCategory from '@/page/contentSetting/offerSetting/container/TabOfferCategory.tsx'
import TabOfferTag from '@/page/contentSetting/offerSetting/container/TabOfferTag.tsx'

const OfferSettingPage = () => {
    return (
        <>
            <PageTitle title="Offer Setting" className="pb-4" />

            <CardNavTab
                tabs={[
                    objectTab('Category', 'tabCategory'),
                    objectTab('Tag', 'tabTag'),
                ]}
                tabContents={[
                    objectTabContent('', <TabOfferCategory />),
                    objectTabContent('', <TabOfferTag />),
                ]}
            />
        </>
    )
}

export default OfferSettingPage
