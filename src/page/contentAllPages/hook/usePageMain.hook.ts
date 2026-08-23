import moment from 'moment/moment'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import contentAllPagesPath from '@/path/contentAllPages.path.ts'
import propertyPath from '@/path/property.path.ts'

const propertyFilterParam = () => ({
    search: '',
    dateFrom: moment().subtract({ months: 1 }).format('DD/MM/YYYY'),
    dateTo: moment().format('DD/MM/YYYY'),
    limit: 50,
    status: '',
    locale: '',
})

const usePageMainHook = ({
    urlAPI,
    isTrash,
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
        advancedSearch: { ...propertyFilterParam() },
    })

    const {
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
        __handleToTrash,
        __handleToMain,
    } = usePageFlowHandlerHook({
        basePath: contentAllPagesPath,
        pathFromKey: isTrash
            ? contentAllPagesPath.trash
            : contentAllPagesPath.main,
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
        __handleToTrash,
        __handleToMain,
    }
}

export default usePageMainHook
