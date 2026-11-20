import { useNavigate, useParams } from 'react-router'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import contentBlogPath from '@/path/contentBlog.path.ts'
import {
    apiBlogContent,
    apiOfferContent,
} from '@/service/api/contentManage.api.ts'
import contentOfferPath from '@/path/contentOffer.path.ts'
import { objDataSearchOther } from '@/config/objectPassState.config.ts'

const useContentOfferDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const restored = useLocationStateHook()

    const { __detail, __isLoading } = useDataDetailHook({
        urlAPI: () => apiOfferContent.detail(id),
        isCallAPI: true,
        triggerBy: id,
    })

    const { __handleToAdd, __handleToEdit, __handleToMain, __handleToDetail } =
        usePageFlowHandlerHook({
            basePath: contentOfferPath,
            pathFromKey: contentOfferPath.detail(id),
            search: restored.dataSearch,
        })

    const _handleToPreview = (id: number | string) => {
        navigate(contentOfferPath.preview(id), {
            state: {
                ...objDataSearchOther(restored.dataSearch),
                from: contentOfferPath.detail(id),
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

export default useContentOfferDetail
