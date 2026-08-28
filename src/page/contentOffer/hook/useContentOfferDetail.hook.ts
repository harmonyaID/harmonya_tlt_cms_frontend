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

    return {
        __id: id,
        __detail,
        __isLoading,
        __pageStateDataSearch: restored,

        // Change Page
        __handleToAdd,
        __handleToEdit,
        __handleToMain,
        __handleToDetail,
    }
}

export default useContentOfferDetail
