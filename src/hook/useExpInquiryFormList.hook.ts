import { MDExCategoryRemove } from '@/config/modal.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useExpInquiryDetailOffCanvas from '@/page/experienceInquiryForm/hook/useExpInquiryDetailOffCanvas.hook.ts'
import { apiExpInquiryForm } from '@/service/api/contentManage.api.ts'

const useExpInquiryFormList = ({
    experienceId = '',
}: {
    experienceId?: string | number
}) => {
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
        urlAPI: (passData) => apiExpInquiryForm.list({ ...passData }),
        advancedSearch: {
            experienceId,
        },
    })

    const {
        __detail,
        __isLoadingDetail,

        __handleChooseDetail,
        __handleCloseDetail,
    } = useExpInquiryDetailOffCanvas()

    const {
        __data: __dataForRemove,
        __handleChooseAndNextStep: __handleChooseRemove,
        __setData: __handleSetDataForRemove,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDExCategoryRemove, false),
        },
    })

    return {
        // List
        __list,
        __isLoading,
        __pagination,
        __search,
        __actionPagination,
        __actionChange,
        __actionClear,
        __actionRemove,
        // __actionAdd,
        __actionUpdate,

        // Detail
        __detail,
        __isLoadingDetail,
        __handleChooseDetail,
        __handleCloseDetail,

        // Remove
        __dataForRemove,
        __handleChooseRemove,
        __handleSetDataForRemove,
    }
}

export default useExpInquiryFormList
