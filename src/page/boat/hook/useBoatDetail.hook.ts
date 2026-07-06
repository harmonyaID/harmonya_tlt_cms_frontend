import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import { useParams } from 'react-router'
import { apiBoat } from '@/service/api/boatManage.api.ts'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import boatPath from '@/path/boat.path.ts'

const useBoatDetailHook = () => {
    const { id } = useParams()

    const restored = useLocationStateHook()

    const { __detail, __isLoading } = useDataDetailHook({
        urlAPI: () => apiBoat.detail(id),
        isCallAPI: true,
        triggerBy: id,
        // isHideSidebar: true,
    })

    const { __handleToAdd, __handleToEdit, __handleToMain } =
        usePageFlowHandlerHook({
            basePath: boatPath,
            pathFromKey: 'boat-detail',
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

export default useBoatDetailHook
