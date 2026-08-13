import { MDPropertyInquiryRemove } from '@/config/modal.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import usePropertyDetailOffCanvasHook from '@/hook/usePropertyDetailOffCanvas.hook.ts'
import { apiPropertyInquiryCRUD } from '@/service/api/property.api.ts'

const usePropertyInquiryList = (
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
        urlAPI: (passData) => apiPropertyInquiryCRUD.list({ ...passData }),
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
            nextStep: () => actionModal(MDPropertyInquiryRemove, false),
        },
    })

    const {
        __detail,
        __isLoadingDetail,
        __handleChooseDetail,
        __handleSetDetail,
        __handleCloseDetail,
    } = usePropertyDetailOffCanvasHook()

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

export default usePropertyInquiryList
