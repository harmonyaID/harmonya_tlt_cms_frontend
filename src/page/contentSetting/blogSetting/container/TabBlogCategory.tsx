import useDataListHook from '@/hook/base/useDataList.hook.ts'
import {
    apiBlogCategory,
    apiBlogTag,
    getBlogCategoryTrash,
    permanentDeleteBlogCategory,
    restoreBlogCategory,
} from '@/service/api/contentManageSetting.api.ts'
import TabSimpleSettingCRUD from '@/common/dataFeature/tabSetting/TabSimpleSettingCRUD.tsx'
import { MDGeneralFormCRUD } from '@/config/modal.config.ts'

const TabBlogCategory = () => (
    <TabSimpleSettingCRUD
        title="Category"
        apiTrash={{
            list: getBlogCategoryTrash,
            delete: permanentDeleteBlogCategory,
            restore: restoreBlogCategory,
        }}
        apiCRUD={apiBlogCategory}
        idModal={MDGeneralFormCRUD + 'BlogCategory'}
        placeholder="e.g Event"
    />
)

export default TabBlogCategory
