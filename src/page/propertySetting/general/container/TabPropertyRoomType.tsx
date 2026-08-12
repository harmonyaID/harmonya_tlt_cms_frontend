import TabSimpleSettingCRUD from '@/common/dataFeature/tabSetting/TabSimpleSettingCRUD.tsx'
import {
    apiPropertyRoomType,
    apiPropertyType,
    getPropertyRoomTypeTrash,
    permanentDeletePropertyRoomType,
    restorePropertyRoomType,
} from '@/service/api/propertySettingGeneral.api.ts'
import { MDGeneralFormCRUD } from '@/config/modal.config.ts'

const TabPropertyRoomRoomType = () => (
    <TabSimpleSettingCRUD
        title="Room Type"
        apiCRUD={apiPropertyRoomType}
        apiTrash={{
            list: getPropertyRoomTypeTrash,
            delete: permanentDeletePropertyRoomType,
            restore: restorePropertyRoomType,
        }}
        idModal={MDGeneralFormCRUD + 'PropertyRoomType'}
        placeholder="e.g Living Room"
    />
)

export default TabPropertyRoomRoomType
