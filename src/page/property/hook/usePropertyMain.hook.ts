import useDataListHook from '@/hook/base/useDataList.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import propertyPath from '@/path/property.path.ts'

const usePropertyMainHook = ({ urlAPI }: { urlAPI: any }) => {
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
        urlAPI: urlAPI,
        isHideSidebar: true,
        advancedSearch: {
            page: 1,
            // limit: 10,
            // typeIds: [],
            // categoryIds: [],
        },
    })

    const {
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
        __handleToTrash,
        __handleToMain,
    } = usePageFlowHandlerHook({
        basePath: propertyPath,
        pathFromKey: 'property-main',
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
        __handleToTrash,
        __handleToMain,
    }
}

export default usePropertyMainHook
