import useDataListHook from '@/hook/base/useDataList.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import contentBlogPath from '@/path/contentBlog.path.ts'
import { apiBlogContent } from '@/service/api/contentManage.api.ts'

const useContentBlogMainHook = () => {
    const {
        __list,
        __isLoading,
        __pagination,
        __search,
        __actionPagination,
        __actionRemove,
        __actionChange,
        __actionClear,
    } = useDataListHook({
        urlAPI: apiBlogContent.list,
        advancedSearch: {
            page: 1,
            // limit: 10,
            // typeIds: [],
            // categoryIds: [],
        },
    })

    const { __handleToAdd, __handleToEdit, __handleToDetail } =
        usePageFlowHandlerHook({
            basePath: contentBlogPath,
            pathFromKey: 'blog-main',
        })

    return {
        // ---- List Data ----
        __list,
        __isLoading,
        __pagination,
        __search,
        __actionPagination,
        __actionRemove,
        __actionChange,
        __actionClear,

        // ---- Change Page ----
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
    }
}

export default useContentBlogMainHook
