import useDataListHook from '@/hook/base/useDataList.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import contentBlogPath from '@/path/contentBlog.path.ts'
import moment from 'moment'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import contentOfferPath from '@/path/contentOffer.path.ts'

const contentOfferFilterParam = () => ({
    fromDate: moment().subtract({ months: 1 }).format('DD/MM/YYYY'),
    toDate: moment().format('DD/MM/YYYY'),
    categoryIds: [],
    tagIds: [],
    limit: 50,
})

const useContentOfferMainHook = ({
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
        advancedSearch: { ...contentOfferFilterParam() },
    })

    const {
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
        __handleToTrash,
        __handleToMain,
    } = usePageFlowHandlerHook({
        search: __search,
        basePath: contentOfferPath,
        isUseSearch: __isUseSearch,
        pathFromKey: isTrash ? contentOfferPath.trash : contentOfferPath.main,
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

export default useContentOfferMainHook
