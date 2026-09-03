import { useNavigate, useParams } from 'react-router'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import contentBlogPath from '@/path/contentBlog.path.ts'
import { apiBlogContent } from '@/service/api/contentManage.api.ts'
import { objDataSearchOther } from '@/config/objectPassState.config.ts'
import {
    RESTORE_COUNT,
    RESTORE_COUNT_ADVANCE,
    RESTORE_IS_USE_SEARCH,
} from '@/config/advanceSearch.config.ts'

const useContentBlogDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const restored = useLocationStateHook()

    const { __detail, __isLoading } = useDataDetailHook({
        urlAPI: () => apiBlogContent.detail(id),
        isCallAPI: true,
        triggerBy: id,
    })

    const { __handleToAdd, __handleToEdit, __handleToMain, __handleToDetail } =
        usePageFlowHandlerHook({
            basePath: contentBlogPath,
            pathFromKey: 'blog-detail',
            search: restored.dataSearch,
        })

    const _handleToPreview = (id: number|string) => {
        navigate(contentBlogPath.preview(id), {
            state: {
                ...objDataSearchOther(restored.dataSearch),
                from: contentBlogPath.detail(id),
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

export default useContentBlogDetail
