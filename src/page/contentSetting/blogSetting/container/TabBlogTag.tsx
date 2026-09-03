import TabSimpleSettingCRUD from '@/common/dataFeature/tabSetting/TabSimpleSettingCRUD.tsx'
import {
    apiBlogTag,
    getBlogCategoryTrash,
    permanentDeleteBlogCategory,
    restoreBlogCategory,
} from '@/service/api/contentManageSetting.api.ts'
import { MDGeneralFormCRUD } from '@/config/modal.config.ts'

const TabBlogTag = () => (
    <TabSimpleSettingCRUD
        title="Tag"
        apiTrash={{
            list: getBlogCategoryTrash,
            delete: permanentDeleteBlogCategory,
            restore: restoreBlogCategory,
        }}
        apiCRUD={apiBlogTag}
        idModal={MDGeneralFormCRUD + 'BlogTag'}
        placeholder="e.g Event"
    />
)

export default TabBlogTag
