import TabSimpleSettingCRUD from '@/common/dataFeature/tabSetting/TabSimpleSettingCRUD.tsx'
import { MDGeneralFormCRUD } from '@/config/modal.config.ts'
import { apiPropertyRoomType } from '@/service/api/propertySettingGeneral.api.ts'

const TabPropertyRoomRoomType = () => (
    <TabSimpleSettingCRUD
        title="Room Type"
        apiCRUD={apiPropertyRoomType}
        idModal={MDGeneralFormCRUD + 'PropertyRoomType'}
        placeholder="e.g Living Room"
    />
)

export default TabPropertyRoomRoomType
