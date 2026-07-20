import TabSimpleSettingCRUD from '@/common/dataFeature/tabSetting/TabSimpleSettingCRUD.tsx'
import {
    apiPropertyRoomType,
    apiPropertyType,
} from '@/service/api/propertySettingGeneral.api.ts'
import { MDGeneralFormCRUD } from '@/config/modal.config.ts'

const TabPropertyRoomRoomType = () => (
    <TabSimpleSettingCRUD
        title="Room Type"
        apiCRUD={apiPropertyRoomType}
        idModal={MDGeneralFormCRUD + 'PropertyRoomType'}
        placeholder="e.g Living Room"
    />
)

export default TabPropertyRoomRoomType
