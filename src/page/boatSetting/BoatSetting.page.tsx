import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
// import TabBoatContactForm from '@/page/boatSetting/container/TabBoatContactForm.tsx'
import TabBoatType from '@/page/boatSetting/container/TabBoatType.tsx'

const BoatSettingPage = () => {
    return (
        <>
            <div className="mb-4">
                <PageTitle title="Boat Setting" />
            </div>

            <CardNavTab
                tabs={[
                    objectTab('Boat Type', 'tabBoatType'),
                    // objectTab('Boat Contact Form', 'tabBoatContactForm'),
                ]}
                tabContents={[
                    objectTabContent('', <TabBoatType />),
                    // objectTabContent('', <TabBoatContactForm />),
                ]}
            />
        </>
    )
}

export default BoatSettingPage
