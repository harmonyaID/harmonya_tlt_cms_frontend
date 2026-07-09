import useContentBlogMainForm from '@/page/contentBlog/hook/useContentBlogMainForm.hook.ts'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import { objectNavBread } from '@/config/objectNavBread.config.ts'
import boatPath from '@/path/boat.path.ts'

const ContentBlogMainForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const {
        __formRequest,
        __isLoading,
        __isLoadingDetail,
        __pageStateDataSearch,
        __setFormRequest,
        __handleChange,
    } = useContentBlogMainForm({ isEdit })

    return (
        <>
            <NavBreadcrumb
                navs={[
                    objectNavBread('Boat', {
                        url: boatPath.main,
                        state: __pageStateDataSearch,
                    }),
                    objectNavBread(isEdit ? 'Edit' : 'Add'),
                ]}
            />
        </>
    )
}

export default ContentBlogMainForm
