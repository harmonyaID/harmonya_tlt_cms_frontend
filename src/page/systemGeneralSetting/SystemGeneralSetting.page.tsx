import CardNavTab from '@/component/card/CardNavTab.tsx'
import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import PageComingSoonLayout from '@/component/layout/PageComingSoon.layout.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabGuestyConfig from '@/page/propertySetting/integration/container/TabGuestyConfig.tsx'
import TabLanguage from '@/page/systemGeneralSetting/container/TabLanguage.tsx'
import TabLlms from '@/page/systemGeneralSetting/container/TabLlms.tsx'
import TabNewsletterConfig from '@/page/systemGeneralSetting/container/TabNewsletterConfig.tsx'
import TabNotificationConfig from '@/page/systemGeneralSetting/container/TabNotificationConfig.tsx'
import TabRedirection from '@/page/systemGeneralSetting/container/TabRedirection.tsx'
import TabRobots from '@/page/systemGeneralSetting/container/TabRobots.tsx'
import TabTrackingAnalytic from '@/page/systemGeneralSetting/container/TabTrackingAnalytic.tsx'

const SystemGeneralSettingPage = () => {
    return (
        <>
            <PageTitle title="General Setting" className="pb-4" />

            <CardNavTab
                tabs={[
                    objectTab('Language', 'tabMultiLanguage'),
                    objectTab('Notification', 'tabNotification'),
                    objectTab('Newsletter', 'tabNewsletter'),
                    objectTab('Redirection', 'tabRedirection'),
                    objectTab('Tracking Analytics', 'tabTrackingAnalytics'),
                    objectTab('LLMS File', 'tabLLMSFile'),
                    objectTab('Robots File', 'tabRobotsFile'),
                ]}
                tabContents={[
                    objectTabContent('', <TabLanguage />),
                    objectTabContent('', <TabNotificationConfig />),
                    objectTabContent('', <TabNewsletterConfig />),
                    objectTabContent('', <TabRedirection />),
                    objectTabContent('', <TabTrackingAnalytic />),
                    objectTabContent('', <TabLlms />),
                    objectTabContent('', <TabRobots />),
                ]}
            />
        </>
    )
}

export default SystemGeneralSettingPage
