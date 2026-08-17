import CardNavTab from '@/component/card/CardNavTab.tsx'
import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabGuestyConfig from '@/page/systemGeneralSetting/container/TabGuestyConfig.tsx'
import TabLanguage from '@/page/systemGeneralSetting/container/TabLanguage.tsx'
import TabNewsletterConfig from '@/page/systemGeneralSetting/container/TabNewsletterConfig.tsx'
import TabNotificationConfig from '@/page/systemGeneralSetting/container/TabNotificationConfig.tsx'
import TabTltReview from '@/page/systemGeneralSetting/container/TabTLTReview.tsx'

const SystemGeneralSettingPage = () => {
    return (
        <>
            <PageTitle title="General Setting" className="pb-4" />

            <CardNavTab
                tabs={[
                    objectTab('Language', 'tabMultiLanguage'),
                    objectTab('Notification', 'tabNotification'),
                    objectTab('Newsletter', 'tabNewsletter'),
                    objectTab('Tlt Review', 'tabTltReview'),
                    objectTab('Guesty Configuration', 'tabGuesty'),
                ]}
                tabContents={[
                    objectTabContent('', <TabLanguage />),
                    objectTabContent('', <TabNotificationConfig />),
                    objectTabContent('', <TabNewsletterConfig />),
                    objectTabContent('', <TabTltReview />),
                    objectTabContent('', <TabGuestyConfig />),
                ]}
            />
        </>
    )
}

export default SystemGeneralSettingPage
