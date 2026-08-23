import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { apiBoat } from '@/service/api/boatManage.api.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import boatPath from '@/path/boat.path.ts'
import moment from 'moment/moment'

const boatFilterParam = () => ({
    dateFrom: moment().subtract({ months: 1 }).format('DD/MM/YYYY'),
    dateTo: moment().format('DD/MM/YYYY'),
    typeIds: [],
    limit: 50,
})

const useBoatMain = ({
    urlAPI,
    isTrash = false,
}: {
    urlAPI: any
    isTrash?: boolean
}) => {
    const {
        __list,
        __isLoading,
        __pagination,
        __search,
        __isUseSearch,
        __actionSetIsUseSearch,
        __setSearch,
        __actionPagination,
        __actionRemove,
        __actionChange,
        __actionClear,
    } = useDataListHook({
        urlAPI: urlAPI,
        // isHideSidebar: true,
        advancedSearch: { ...boatFilterParam() },
    })

    const {
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
        __handleToMain,
        __handleToTrash,
    } = usePageFlowHandlerHook({
        basePath: boatPath,
        pathFromKey: isTrash ? boatPath.trash : boatPath.main,
        search: __search,
        isUseSearch: __isUseSearch,
    })

    return {
        // ---- List Data ----
        __list,
        __isLoading,
        __pagination,
        __search,
        __actionRemove,
        __actionChange,
        __actionClear,
        __setSearch,
        __actionPagination,
        __actionSetIsUseSearch,

        // ---- Change Page ----
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
        __handleToMain,
        __handleToTrash,
    }
}

export default useBoatMain
