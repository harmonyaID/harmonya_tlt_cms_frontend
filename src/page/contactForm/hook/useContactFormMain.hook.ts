import { BtnPrimary } from '@/component/general/Button.tsx'
import actionOffCanvas from '@/helper/actionOffCanvas.helper.ts'
import { OCContactFormCRUD } from '@/config/offCanvas.config.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import moment from 'moment/moment'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { apiWebContactForm } from '@/service/api/contentManageSetting.api.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import { MDPSTabWebContactFormRemove } from '@/config/modal.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import useContactFormDetailHook from '@/page/contactForm/hook/useContactFormDetail.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import { contactFormPath } from '@/path/contactFormManage.path.ts'

const useContactFormMain = ({ urlAPI }: { urlAPI: any }) => {
    const initForm = {
        formTypeId: '',
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    }

    const initMapForm = (passData) => ({
        formTypeId: passData?.formType?.id || '',
        name: passData.name || '',
        email: passData.email || '',
        phone: passData.phone || '',
        subject: passData.subject || '',
        message: passData.message || '',
    })

    const contactFormFilterParam = () => ({
        fromDate: moment().subtract({ months: 1 }).format('DD/MM/YYYY'),
        toDate: moment().format('DD/MM/YYYY'),
        contactFormTypeIds: [],
        limit: 50,
    })

    const {
        __list,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
        __search,
        __setSearch,
        __actionSetIsUseSearch,
        __actionChange,
        __actionClear,
    } = useDataListHook({
        urlAPI: urlAPI,
        advancedSearch: contactFormFilterParam(),
    })

    const { __handleToTrash, __handleToMain } = usePageFlowHandlerHook({
        isUseSearch: false,
        basePath: contactFormPath,
        pathFromKey: contactFormPath.main,
    })

    const {
        __formRequest,
        __detailData,
        __selectedId,
        __isEdit,
        __setFormRequest,
        __setSelectedId,
        __actionAddModal,
        __actionUpdateModal,
        __actionCloseModal,
        __actionRemoveModal,
    } = useCRUDModalRequestHook({
        // modalId: OCContactFormCRUD,
        // modalRemoveId: MDPSTabWebContactFormRemove,
        emptyParam: { ...initForm },
        mapDetailToFormRequest: initMapForm,
    })

    const { _handleChange } = useNestedFormHook(__formRequest, __setFormRequest)

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDPSTabWebContactFormRemove, false),
        },
    })

    const {
        __detail,
        __isLoadingDetail,

        __handleChooseDetail,
        __handleSetDetail,
        __handleCloseDetail,
    } = useContactFormDetailHook()

    return {
        __search,
        __isLoading,
        __list,
        __pagination,
        __detailData,
        __isEdit,
        __formRequest,
        __selectedId,
        __isLoadingDetail,
        __detail,
        __initForm: initForm,
        __dataForRemove: dataForRemove,

        __actionAddModal,
        __actionChange,
        __actionPagination,
        __actionClear,
        __actionSetIsUseSearch,
        __setSearch,
        __handleChooseRemove: _handleChooseRemove,
        __actionUpdateModal,
        __handleChooseDetail,
        __actionRemove,
        __actionCloseModal,
        __setFormRequest,
        __initMapForm: initMapForm,
        __actionUpdate,
        __actionAdd,
        __handleSetData: _handleSetData,
        __handleChange: _handleChange,
        __handleCloseDetail,
        __handleToTrash,
        __handleToMain,
    }
}

export default useContactFormMain
