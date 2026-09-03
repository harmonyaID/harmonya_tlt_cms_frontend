import { MDPropertyFormRequestRemove } from '@/config/modal.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import usePropertyContactFormDetailOffCanvasHook from '@/hook/usePropertyContactFormDetailOffCanvas.hook.ts'
import { apiPropertyContactFormCRUD } from '@/service/api/property.api.ts'

const usePropertyContactFormList = (
    {
        propertyId,
    }: {
        propertyId?: string | number
    } = { propertyId: '' },
) => {
    const {
        __list,
        __search,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
        __actionChange,
        __actionClear,
    } = useDataListHook({
        urlAPI: (passData) => apiPropertyContactFormCRUD.list({ ...passData }),
        advancedSearch: {
            propertyId,
        },
    })

    const {
        __data: __dataForRemove,
        __handleChooseAndNextStep: __handleChooseRemove,
        __setData: __handleSetDataForRemove,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDPropertyFormRequestRemove, false),
        },
    })

    const {
        __detail,
        __isLoadingDetail,
        __handleChooseDetail,
        __handleSetDetail,
        __handleCloseDetail,
    } = usePropertyContactFormDetailOffCanvasHook()

    return {
        // List
        __list,
        __search,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
        __actionChange,
        __actionClear,

        // Remove
        __dataForRemove,
        __handleChooseRemove,
        __handleSetDataForRemove,

        // Detail
        __detail,
        __isLoadingDetail,
        __handleChooseDetail,
        __handleSetDetail,
        __handleCloseDetail,
    }
}

export default usePropertyContactFormList
