import useDataListHook from '@/hook/base/useDataList.hook.ts'
import {
    apiBlogCategory,
    apiBlogTag,
    apiOfferCategory,
    getBlogCategoryTrash,
    getOfferCategoryTrash,
    permanentDeleteBlogCategory,
    permanentDeleteOfferCategory,
    restoreOfferCategory,
} from '@/service/api/contentManageSetting.api.ts'
import TabSimpleSettingCRUD from '@/common/dataFeature/tabSetting/TabSimpleSettingCRUD.tsx'
import { MDGeneralFormCRUD } from '@/config/modal.config.ts'

const TabOfferCategory = () => (
    <TabSimpleSettingCRUD
        title="Category"
        apiTrash={{
            list: getOfferCategoryTrash,
            delete: permanentDeleteOfferCategory,
            restore: restoreOfferCategory,
        }}
        apiCRUD={apiOfferCategory}
        idModal={MDGeneralFormCRUD + 'OfferCategory'}
        placeholder="e.g Event"
    />
)

export default TabOfferCategory
