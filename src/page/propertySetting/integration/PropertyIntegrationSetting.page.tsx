import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import TabGuestyConfig from '@/page/propertySetting/integration/container/TabGuestyConfig.tsx'

const PropertyIntegrationSettingPage = () => {
    return (
        <>
            <PageTitle title="Integration Setting" className="pb-4" />

            <CardNavTab
                tabs={[objectTab('Guesty Configuration', 'tabGuesty')]}
                tabContents={[objectTabContent('', <TabGuestyConfig />)]}
            />
        </>
    )
}

export default PropertyIntegrationSettingPage
