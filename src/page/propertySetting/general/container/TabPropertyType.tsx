import TabSimpleSettingCRUD from '@/common/dataFeature/tabSetting/TabSimpleSettingCRUD.tsx'
import { apiPropertyType, getPropertyTypeTrash, permanentDeletePropertyType, restorePropertyType } from '@/service/api/propertySettingGeneral.api.ts'
import { MDGeneralFormCRUD } from '@/config/modal.config.ts'

const TabPropertyType = () => (
    <TabSimpleSettingCRUD
        title="Type"
        isTrash
        apiTrash={{
            list: getPropertyTypeTrash,
            delete: permanentDeletePropertyType,
            restore: restorePropertyType
        }}
        apiCRUD={apiPropertyType}
        idModal={MDGeneralFormCRUD + 'PropertyType'}
        placeholder="e.g Villa"
    />
)

export default TabPropertyType
