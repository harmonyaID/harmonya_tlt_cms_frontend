import useDataListHook from '@/hook/base/useDataList.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import experienceTypePath from '@/path/experienceType.path.ts'
import { apiExperienceType } from '@/service/api/contentManageSetting.api.ts'
import islandGuideTypePath from '@/path/islandGuideType.path.ts'

const useIslandGuideTypeMainHook = ({ urlAPI }: { urlAPI: any }) => {
    const {
        __list,
        __search,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
        __actionChange,
        __actionClear,
    } = useDataListHook({
        urlAPI: (passData) => urlAPI({ ...passData }),
    })

    const {
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
        __handleToTrash,
        __handleToMain,
    } = usePageFlowHandlerHook({
        basePath: islandGuideTypePath,
        pathFromKey: islandGuideTypePath.main,
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

export default useIslandGuideTypeMainHook
