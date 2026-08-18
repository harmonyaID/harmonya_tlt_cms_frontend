import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import PageComingSoonLayout from '@/component/layout/PageComingSoon.layout.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'

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
                    objectTabContent('', <PageComingSoonLayout />),
                    objectTabContent('', <PageComingSoonLayout />),
                ]}
            />
        </>
    )
}

export default OfferSettingPage
