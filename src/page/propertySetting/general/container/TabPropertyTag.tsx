import TabSimpleSettingCRUD from '@/common/dataFeature/tabSetting/TabSimpleSettingCRUD.tsx'
import {
    apiPropertyTag,
    apiPropertyType,
} from '@/service/api/propertySettingGeneral.api.ts'
import { MDGeneralFormCRUD } from '@/config/modal.config.ts'

const TabPropertyTag = () => (
    <TabSimpleSettingCRUD
        title="Tag"
        apiCRUD={apiPropertyTag}
        idModal={MDGeneralFormCRUD + 'PropertyTag'}
        placeholder="e.g Ocean View"
    />
)

export default TabPropertyTag
