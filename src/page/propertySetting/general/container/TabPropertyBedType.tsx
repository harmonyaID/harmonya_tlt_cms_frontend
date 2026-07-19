import TabSimpleSettingCRUD from '@/common/dataFeature/tabSetting/TabSimpleSettingCRUD.tsx'
import {
    apiPropertyBedType,
    apiPropertyType,
} from '@/service/api/propertySettingGeneral.api.ts'
import { MDGeneralFormCRUD } from '@/config/modal.config.ts'

const TabPropertyBedType = () => (
    <TabSimpleSettingCRUD
        title="Bed Type"
        apiCRUD={apiPropertyBedType}
        idModal={MDGeneralFormCRUD + 'PropertyBedType'}
        placeholder="e.g King Bed"
    />
)

export default TabPropertyBedType
