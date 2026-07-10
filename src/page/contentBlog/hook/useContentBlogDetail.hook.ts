import { useParams } from 'react-router'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import { apiBoat } from '@/service/api/boatManage.api.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import boatPath from '@/path/boat.path.ts'
import contentBlogPath from '@/path/contentBlog.path.ts'
import { apiBlogContent } from '@/service/api/contentManage.api.ts'

const useContentBlogDetail = () => {
    const { id } = useParams()

    const restored = useLocationStateHook()

    const { __detail, __isLoading } = useDataDetailHook({
        urlAPI: () => apiBlogContent.detail(id),
        isCallAPI: true,
        triggerBy: id,
    })

    const { __handleToAdd, __handleToEdit, __handleToMain } =
        usePageFlowHandlerHook({
            basePath: contentBlogPath,
            pathFromKey: 'blog-detail',
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
    }
}

export default useContentBlogDetail
