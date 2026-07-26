import TabSimpleSettingCRUD from '@/common/dataFeature/tabSetting/TabSimpleSettingCRUD.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import {
    getStaticAddressType,
    getStaticAdvanceNoticeUnit,
    getStaticAvailabilityType,
    getStaticCleaningFeeType,
    getStaticCleaningStatus,
    getStaticGuestySyncStatus,
    getStaticListingType,
    getStaticMediaPartnerType,
    getStaticSourceType,
    getStaticStatus,
    getStaticStatusForm,
    getStaticUnitType,
} from '@/service/api/propertySettingGeneral.api.ts'

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
    const UNIT_TYPE = 'Unit Type'
    const LISTING_TYPE = 'Listing Type'
    const MEDIA_PARTNER_TYPE = 'Media Partner Type'
    const STATUS_FORM = 'Status Form'

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
                    objectTab(MEDIA_PARTNER_TYPE, 'tab_MEDIA_PARTNER_TYPE'),
                    objectTab(STATUS_FORM, 'tabStatusForm'),
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
                    objectTabContent(
                        '',
                        <TabSettingStatic
                            title={MEDIA_PARTNER_TYPE}
                            apiList={getStaticMediaPartnerType}
                        />,
                    ),
                    objectTabContent(
                        '',
                        <TabSettingStatic
                            title={STATUS_FORM}
                            apiList={getStaticStatusForm}
                        />,
                    ),
                ]}
            />
        </>
    )
}

export default PropertyStaticSettingPage
