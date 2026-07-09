import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { apiBoat } from '@/service/api/boatManage.api.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import boatPath from '@/path/boat.path.ts'

const useBoatMain = () => {
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
        urlAPI: apiBoat.list,
        // isHideSidebar: true,
        advancedSearch: {
            page: 1,
            // limit: 10,
            // typeIds: [],
            // categoryIds: [],
        },
    })

    const { __handleToAdd, __handleToEdit, __handleToDetail } =
        usePageFlowHandlerHook({
            basePath: boatPath,
            pathFromKey: 'boat-main',
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

export default useBoatMain
