import { OCGeneralPreviewDetail } from '@/config/offCanvas.config.ts'
import actionOffCanvas from '@/helper/actionOffCanvas.helper.ts'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import { apiExperienceArea } from '@/service/api/contentManageSetting.api.ts'

const useExAreaDetailOffCanvasHook = () => {
    const {
        __data: dataForDetail,
        __handleChooseAndNextStep: __handleChooseDetail,
        __setData: __handleSetDetail,
    } = useChooseData({
        action: {
            nextStep: () => actionOffCanvas(OCGeneralPreviewDetail),
        },
    })

    const { id } = dataForDetail || {}
    const isAutoGet: boolean = id ? true : false

    const { __detail, __isLoading: __isLoadingDetail } = useDataDetailHook({
        urlAPI: () => apiExperienceArea.detail(id),
        triggerBy: id,
        isAutoGet: isAutoGet,
    })

    const _handleCloseDetail = () => {
        actionOffCanvas(OCGeneralPreviewDetail, true)
        __handleSetDetail({})
    }

    return {
        __detail,
        __isLoadingDetail,

        __handleChooseDetail,
        __handleSetDetail,
        __handleCloseDetail: _handleCloseDetail,
    }
}

export default useExAreaDetailOffCanvasHook
