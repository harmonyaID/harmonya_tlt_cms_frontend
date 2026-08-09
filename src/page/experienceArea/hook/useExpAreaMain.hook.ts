import useDataListHook from "@/hook/base/useDataList.hook.ts";
import usePageFlowHandlerHook from "@/hook/usePageFlowHandler.hook.ts";
import experienceAreaPath from "@/path/experienceArea.path.ts";
import {apiExperienceArea} from "@/service/api/contentManageSetting.api.ts";

const useExperienceAreaMain = () => {
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
        urlAPI: (passData) => apiExperienceArea.list({ ...passData }),
    })

    const { __handleToAdd, __handleToEdit, __handleToDetail } =
        usePageFlowHandlerHook({
            basePath: experienceAreaPath,
            pathFromKey: 'ex-area-main',
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

export default useExperienceAreaMain