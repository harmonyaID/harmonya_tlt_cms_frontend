import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { apiExperienceContent } from '@/service/api/contentManage.api.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import contentExperiencePath from '@/path/contentExperience.path.ts'

const useContentExHook = () => {
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
        urlAPI: apiExperienceContent.list,
        advancedSearch: {
            page: 1,
            // limit: 10,
            // typeIds: [],
            // categoryIds: [],
        },
    })

    const { __handleToAdd, __handleToEdit, __handleToDetail } =
        usePageFlowHandlerHook({
            basePath: contentExperiencePath,
            pathFromKey: 'ex-main',
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

export default useContentExHook
