import TabSimpleSettingCRUD from '@/common/dataFeature/tabSetting/TabSimpleSettingCRUD.tsx'
import {
    apiPropertyBedType,
    apiPropertyType, getPropertyBedTypeTrash, permanentDeletePropertyBedType, restorePropertyBedType,
} from '@/service/api/propertySettingGeneral.api.ts'
import { MDGeneralFormCRUD } from '@/config/modal.config.ts'

const TabPropertyBedType = () => (
    <TabSimpleSettingCRUD
        title="Bed Type"
        apiCRUD={apiPropertyBedType}
        apiTrash={{
            list: getPropertyBedTypeTrash,
            delete: permanentDeletePropertyBedType,
            restore: restorePropertyBedType,
        }}
        idModal={MDGeneralFormCRUD + 'PropertyBedType'}
        placeholder="e.g King Bed"
    />
)

export default TabPropertyBedType
