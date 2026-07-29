import { useParams } from 'react-router'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import propertyPath from '@/path/property.path.ts'
import { apiProperty } from '@/service/api/property.api.ts'

const usePropertyDetail = () => {
    const { id } = useParams()

    const restored = useLocationStateHook()

    const { __detail, __isLoading } = useDataDetailHook({
        urlAPI: () => apiProperty.detail(id),
        isCallAPI: true,
        triggerBy: id,
    })

    const { __handleToAdd, __handleToEdit, __handleToMain } =
        usePageFlowHandlerHook({
            basePath: propertyPath,
            pathFromKey: 'property-detail',
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

export default usePropertyDetail
