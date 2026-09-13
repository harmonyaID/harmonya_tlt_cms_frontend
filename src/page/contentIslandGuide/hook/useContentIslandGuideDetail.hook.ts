import { useParams } from 'react-router'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import {
    apiExperienceContent,
    apiIslandGuide,
} from '@/service/api/contentManage.api.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import contentExperiencePath from '@/path/contentExperience.path.ts'
import contentIslandGuidePath from '@/path/contentIslandGuide.path.ts'

const useContentIslandGuideDetail = () => {
    const { id } = useParams()

    const restored = useLocationStateHook()

    const { __detail, __isLoading } = useDataDetailHook({
        urlAPI: () => apiIslandGuide.detail(id),
        isCallAPI: true,
        triggerBy: id,
    })

    const { __handleToAdd, __handleToEdit, __handleToMain } =
        usePageFlowHandlerHook({
            basePath: contentIslandGuidePath,
            pathFromKey: contentIslandGuidePath.detail(id),
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

export default useContentIslandGuideDetail
