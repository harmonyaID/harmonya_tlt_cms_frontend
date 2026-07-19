import TabSimpleSettingCRUD from '@/common/dataFeature/tabSetting/TabSimpleSettingCRUD.tsx'
import { apiPropertyType } from '@/service/api/propertySettingGeneral.api.ts'
import { MDGeneralFormCRUD } from '@/config/modal.config.ts'

const TabPropertyType = () => (
    <TabSimpleSettingCRUD
        title="Type"
        apiCRUD={apiPropertyType}
        idModal={MDGeneralFormCRUD + 'PropertyType'}
        placeholder="e.g Villa"
    />
)

export default TabPropertyType
