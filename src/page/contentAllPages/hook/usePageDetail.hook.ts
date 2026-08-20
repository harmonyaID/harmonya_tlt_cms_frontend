import { useNavigate, useParams } from 'react-router'
import { objDataSearchOther } from '@/config/objectPassState.config.ts'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import contentAllPages from '@/path/contentAllPages.path.ts'
import contentBlogPath from '@/path/contentBlog.path.ts'
import { apiPageContent } from '@/service/api/contentManage.api.ts'

const usePageDetailHook = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const restored = useLocationStateHook()

    const { __detail, __isLoading } = useDataDetailHook({
        urlAPI: () => apiPageContent.detail(id),
        isCallAPI: true,
        triggerBy: id,
    })

    const { __handleToAdd, __handleToEdit, __handleToMain, __handleToDetail } =
        usePageFlowHandlerHook({
            basePath: contentAllPages,
            pathFromKey: 'content-page-detail',
            search: restored.dataSearch,
        })

    const _handleToPreview = (id: number | string) => {
        navigate(contentAllPages.preview(id), {
            state: {
                ...objDataSearchOther(restored.dataSearch),
                from: contentAllPages.detail(id),
            },
        })
    }

    return {
        __id: id,
        __detail,
        __isLoading,
        __pageStateDataSearch: restored,

        // Change Page
        __handleToAdd,
        __handleToEdit,
        __handleToMain,
        __handleToPreview: _handleToPreview,
        __handleToDetail,
    }
}

export default usePageDetailHook
