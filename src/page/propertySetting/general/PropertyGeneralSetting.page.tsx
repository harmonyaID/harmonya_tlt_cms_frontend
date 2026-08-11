import CardNavTab from '@/component/card/CardNavTab.tsx'
import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabPropertyBedType from '@/page/propertySetting/general/container/TabPropertyBedType.tsx'
import TabPropertyRoomRoomType from '@/page/propertySetting/general/container/TabPropertyRoomType.tsx'
import TabPropertyTag from '@/page/propertySetting/general/container/TabPropertyTag.tsx'
import TabPropertyType from '@/page/propertySetting/general/container/TabPropertyType.tsx'

const PropertyGeneralSettingPage = () => {
    return (
        <>
            <PageTitle title="General Setting" className="pb-4" />

            <CardNavTab
                tabs={[
                    objectTab('Type', 'tabTypes'),
                    objectTab('Bed Type', 'tabBedTypes'),
                    objectTab('Room Type', 'tabRoomTypes'),
                    objectTab('Tag', 'tabTag'),
                    objectTab('Amenities Category', 'tagAmenitiesCategory'),
                ]}
                tabContents={[
                    objectTabContent('', <TabPropertyType />),
                    objectTabContent('', <TabPropertyBedType />),
                    objectTabContent('', <TabPropertyRoomRoomType />),
                    objectTabContent('', <TabPropertyTag />),
                ]}
            />
        </>
    )
}

export default PropertyGeneralSettingPage
