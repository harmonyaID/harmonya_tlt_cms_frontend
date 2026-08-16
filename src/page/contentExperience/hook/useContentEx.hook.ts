import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { apiExperienceContent } from '@/service/api/contentManage.api.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import contentExperiencePath from '@/path/contentExperience.path.ts'
import moment from 'moment'

const experienceFilterParam = () => ({
    fromDate: moment().subtract({ months: 1 }).format('DD/MM/YYYY'),
    toDate: moment().format('DD/MM/YYYY'),
    typeIds: [],
    areaIds: [],
    limit: 50,
})

const useContentExHook = ({
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
        advancedSearch: {
            ...experienceFilterParam(),
        },
    })

    const {
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
        __handleToMain,
        __handleToTrash,
    } = usePageFlowHandlerHook({
        basePath: contentExperiencePath,
        pathFromKey: isTrash
            ? contentExperiencePath.trash
            : contentExperiencePath.main,
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

export default useContentExHook
