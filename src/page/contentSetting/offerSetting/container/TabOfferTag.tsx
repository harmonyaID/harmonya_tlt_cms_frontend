import TabSimpleSettingCRUD from '@/common/dataFeature/tabSetting/TabSimpleSettingCRUD.tsx'
import { MDGeneralFormCRUD } from '@/config/modal.config.ts'
import {
    apiOfferTag,
    getOfferTagTrash,
    permanentDeleteOfferCategory,
    permanentDeleteOfferTag,
    restoreOfferCategory,
    restoreOfferTag,
} from '@/service/api/contentManageSetting.api.ts'

const TabOfferTag = () => (
    <TabSimpleSettingCRUD
        title="Tag"
        apiTrash={{
            list: getOfferTagTrash,
            delete: permanentDeleteOfferTag,
            restore: restoreOfferTag,
        }}
        apiCRUD={apiOfferTag}
        idModal={MDGeneralFormCRUD + 'OfferTag'}
        placeholder="e.g Event"
    />
)

export default TabOfferTag
