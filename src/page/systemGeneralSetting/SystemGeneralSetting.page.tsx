import CardNavTab from '@/component/card/CardNavTab.tsx'
import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabLanguage from '@/page/systemGeneralSetting/container/TabLanguage.tsx'
import TabTltReview from '@/page/systemGeneralSetting/container/TabTLTReview.tsx'

const SystemGeneralSettingPage = () => {
    return (
        <>
            <PageTitle title="General Setting" className="pb-4" />

            <CardNavTab
                tabs={[
                    objectTab('Multi Language', 'tabMultiLanguage'),
                    objectTab('Tlt Review', 'tabTltReview'),
                ]}
                tabContents={[
                    objectTabContent('', <TabLanguage />),
                    objectTabContent('', <TabTltReview />),
                ]}
            />
        </>
    )
}

export default SystemGeneralSettingPage
