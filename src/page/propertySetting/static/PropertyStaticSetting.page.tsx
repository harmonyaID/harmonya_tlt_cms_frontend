import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import {
    getStaticAddressType,
    getStaticAdvanceNoticeUnit,
    getStaticAvailabilityType,
    getStaticCleaningFeeType,
    getStaticCleaningStatus,
    getStaticGuestySyncStatus,
    getStaticListingType,
    getStaticSourceType,
    getStaticStatus,
    getStaticUnitType,
} from '@/service/api/propertySettingGeneral.api.ts'
import TabSimpleSettingCRUD from '@/common/dataFeature/tabSetting/TabSimpleSettingCRUD.tsx'

const TabSettingStatic = ({ title, apiList }) => (
    <TabSimpleSettingCRUD
        title={title}
        apiCRUD={{
            list: apiList,
        }}
        isAdd={false}
        isEdit={false}
        isRemove={false}
    />
)

const PropertyStaticSettingPage = () => {
    return (
        <>
            <PageTitle title="Static Setting" className="pb-4" />

            <CardNavTab
                tabs={[
                    objectTab('Unit Type', 'tabUnitTypes'),
                    objectTab('Listing Type', 'tabListingTypes'),
                    objectTab('Status', 'tabStatus'),
                    objectTab('Address Type', 'tabAddressType'),
                    objectTab('Source Type', 'tabSourceType'),
                    objectTab('Availability Type', 'tabAvailabilityType'),
                    objectTab('Cleaning Fee Type', 'tabCleaningFeeType'),
                    objectTab('Cleaning Status', 'tabCleaningStatus'),
                    objectTab('Advance Notice Unit', 'tabAdvanceNoticeUnit'),
                    objectTab('Guesty Sync Status', 'tabGuestySyncStatus'),
                ]}
                tabContents={[
                    objectTabContent(
                        '',
                        <TabSettingStatic
                            title="Unit Type"
                            apiList={getStaticUnitType}
                        />,
                    ),
                    objectTabContent(
                        '',
                        <TabSettingStatic
                            title="Listing Type"
                            apiList={getStaticListingType}
                        />,
                    ),
                    objectTabContent(
                        '',
                        <TabSettingStatic
                            title="Status"
                            apiList={getStaticStatus}
                        />,
                    ),
                    objectTabContent(
                        '',
                        <TabSettingStatic
                            title="Address Type"
                            apiList={getStaticAddressType}
                        />,
                    ),
                    objectTabContent(
                        '',
                        <TabSettingStatic
                            title="Source Type"
                            apiList={getStaticSourceType}
                        />,
                    ),
                    objectTabContent(
                        '',
                        <TabSettingStatic
                            title="Availability Type"
                            apiList={getStaticAvailabilityType}
                        />,
                    ),
                    objectTabContent(
                        '',
                        <TabSettingStatic
                            title="Cleaning Fee Type"
                            apiList={getStaticCleaningFeeType}
                        />,
                    ),
                    objectTabContent(
                        '',
                        <TabSettingStatic
                            title="Cleaning Status"
                            apiList={getStaticCleaningStatus}
                        />,
                    ),
                    objectTabContent(
                        '',
                        <TabSettingStatic
                            title="Advance Notice Unit"
                            apiList={getStaticAdvanceNoticeUnit}
                        />,
                    ),
                    objectTabContent(
                        '',
                        <TabSettingStatic
                            title="Guesty Sync Status"
                            apiList={getStaticGuestySyncStatus}
                        />,
                    ),
                ]}
            />
        </>
    )
}

export default PropertyStaticSettingPage
