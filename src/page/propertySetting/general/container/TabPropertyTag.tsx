import TabSimpleSettingCRUD from '@/common/dataFeature/tabSetting/TabSimpleSettingCRUD.tsx'
import { MDGeneralFormCRUD } from '@/config/modal.config.ts'
import { apiPropertyTag, getPropertyTagTrash, permanentDeletePropertyTag, restorePropertyTag } from '@/service/api/propertySettingGeneral.api.ts'

const TabPropertyTag = () => (
    <TabSimpleSettingCRUD
        title="Tag"
        apiCRUD={apiPropertyTag}
        apiTrash={{
            list: getPropertyTagTrash,
            delete: permanentDeletePropertyTag,
            restore: restorePropertyTag,
        }}
        idModal={MDGeneralFormCRUD + 'PropertyTag'}
        placeholder="e.g Ocean View"
    />
)

export default TabPropertyTag
