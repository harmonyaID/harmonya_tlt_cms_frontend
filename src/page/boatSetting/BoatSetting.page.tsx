import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabSimpleSettingCRUD from '@/common/dataFeature/tabSetting/TabSimpleSettingCRUD.tsx'
import { apiBoatType, getBoatFormStatus, getBoatTypeTrash, permanentDeleteBoatType, restoreBoatType } from '@/service/api/boatManage.api.ts'
import { MDBoatTypeAdd } from '@/config/modal.config.ts'

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
                    objectTabContent(
                        '',
                        <TabSimpleSettingCRUD
                            title="Boat Type"
                            apiCRUD={apiBoatType}
                            apiTrash={{
                                list: getBoatTypeTrash,
                                restore: restoreBoatType,
                                delete: permanentDeleteBoatType
                            }}
                            idModal={MDBoatTypeAdd}
                            placeholder="e.g Boat"
                        />,
                    ),
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
