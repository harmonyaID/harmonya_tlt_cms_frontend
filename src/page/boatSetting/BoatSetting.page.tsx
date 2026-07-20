import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
// import TabBoatContactForm from '@/page/boatSetting/container/TabBoatContactForm.tsx'
import TabBoatType from '@/page/boatSetting/container/TabBoatType.tsx'
import TabSimpleSettingCRUD from '@/common/dataFeature/tabSetting/TabSimpleSettingCRUD.tsx'
import { getBoatFormStatus } from '@/service/api/boatManage.api.ts'

const BoatSettingPage = () => {
    return (
        <>
            <div className="mb-4">
                <PageTitle title="Boat Setting" />
            </div>

            <CardNavTab
                tabs={[
                    objectTab('Boat Type', 'tabBoatType'),
                    objectTab('Status Form', 'tabStatusForm'),
                ]}
                tabContents={[
                    objectTabContent('', <TabBoatType />),
                    objectTabContent(
                        '',
                        <TabSimpleSettingCRUD
                            title="Status Form"
                            apiCRUD={{
                                list: getBoatFormStatus,
                            }}
                            isAdd={false}
                            isEdit={false}
                            isRemove={false}
                        />,
                    ),
                ]}
            />
        </>
    )
}

export default BoatSettingPage
