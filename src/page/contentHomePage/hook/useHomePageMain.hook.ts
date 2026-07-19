import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { detailHomePageContent } from '@/service/api/contentManage.api.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import contentBlogPath from '@/path/contentBlog.path.ts'
import contentHomePagePath from '@/path/contentHomePage.path.ts'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'

const useHomePageMainHook = () => {
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
        urlAPI: (dataSearch) =>
            detailHomePageContent({ locale: dataSearch.locale }),
        advancedSearch: {
            locale: 'en',
        },
    })

    const { __handleToAdd, __handleToEdit, __handleToDetail } =
        usePageFlowHandlerHook({
            basePath: contentHomePagePath,
            pathFromKey: 'hom-main',
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

export default useHomePageMainHook
