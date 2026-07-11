import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { apiMenu } from '@/service/api/contentManage.api.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import contentMenuPath from '@/path/contentMenu.path.ts'

const useContentMenuHook = () => {
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
        urlAPI: apiMenu.list,
        advancedSearch: {
            page: 1,
            // limit: 10,
            // typeIds: [],
            // categoryIds: [],
        },
    })

    const { __handleToAdd, __handleToEdit, __handleToDetail } =
        usePageFlowHandlerHook({
            basePath: contentMenuPath,
            pathFromKey: 'cm-menu-main',
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

export default useContentMenuHook
