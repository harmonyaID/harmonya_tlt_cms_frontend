import { useParams } from 'react-router'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import { apiMenu } from '@/service/api/contentManage.api.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import contentMenuPath from '@/path/contentMenu.path.ts'

const useContentMenuDetailHook = () => {
    const { id } = useParams()

    const restored = useLocationStateHook()

    const { __detail, __isLoading } = useDataDetailHook({
        urlAPI: () => apiMenu.detail(id),
        isCallAPI: true,
        triggerBy: id,
    })

    const { __handleToAdd, __handleToEdit, __handleToMain } =
        usePageFlowHandlerHook({
            basePath: contentMenuPath,
            pathFromKey: 'menu-detail',
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

export default useContentMenuDetailHook
