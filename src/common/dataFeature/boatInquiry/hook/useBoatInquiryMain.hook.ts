import useDataListHook from '@/hook/base/useDataList.hook.ts'
import {
    apiBoat,
    apiReadBoatContactForm,
    apiUpdateStatusBoatContactForm,
} from '@/service/api/boatManage.api.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import boatPath from '@/path/boat.path.ts'
import moment from 'moment/moment'
import { boatInquiryPath } from '@/path/boatInquiry.path.ts'
import { useState } from 'react'
import actionModal from '@/helper/base/actionModal.helper.ts'
import {
    MDBoatInquiryRead,
    MDBoatInquiryUpdateStatus,
} from '@/config/modal.config.ts'
import { isSuccess } from '@/helper/base/condition.helper.ts'

const filterParam = () => ({
    fromDate: moment().subtract({ months: 1 }).format('DD/MM/YYYY'),
    toDate: moment().format('DD/MM/YYYY'),
    typeIds: [],
    limit: 50,
})

const useBoatInquiryMain = ({
    urlAPI,
    basePath,
    isTrash = false,
}: {
    urlAPI: any
    basePath: any
    isTrash?: boolean
}) => {
    const [id, setId] = useState()
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [formRequestStatus, setFormRequestStatus] = useState({ statusId: '' })

    const {
        __list,
        __isLoading,
        __pagination,
        __search,
        __isUseSearch,
        __actionSetIsUseSearch,
        __setSearch,
        __actionPagination,
        __actionRemove,
        __actionChange,
        __actionUpdate,
        __actionClear,
    } = useDataListHook({
        urlAPI: urlAPI,
        // isHideSidebar: true,
        advancedSearch: { ...filterParam() },
    })

    const {
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
        __handleToMain,
        __handleToTrash,
    } = usePageFlowHandlerHook({
        basePath: basePath,
        pathFromKey: isTrash ? basePath.trash : basePath.main,
        search: __search,
        isUseSearch: __isUseSearch,
    })

    const _handleConfirmRead = (id) => {
        setId(id)
        actionModal(MDBoatInquiryRead, false)
    }

    const _handleRead = () => {
        setIsLoadingUpdate(true)
        apiReadBoatContactForm(id)
            .then((res) => {
                if (isSuccess(res)) {
                    __actionUpdate(res.result, 'id', true)
                    actionModal(MDBoatInquiryRead, true)
                }
            })
            .finally(() => setIsLoadingUpdate(false))
    }

    const _handleConfirmUpdateStatus = (id) => {
        setId(id)
        const selected = __list.find((vm) => vm.id === id)
        setFormRequestStatus({ statusId: selected.status?.id })
        actionModal(MDBoatInquiryUpdateStatus, false)
    }

    const _handleUpdateStatus = () => {
        setIsLoadingUpdate(true)
        apiUpdateStatusBoatContactForm(id, formRequestStatus)
            .then((res) => {
                if (isSuccess(res)) {
                    __actionUpdate(res.result, 'id', true)
                    actionModal(MDBoatInquiryUpdateStatus, true)
                }
            })
            .finally(() => setIsLoadingUpdate(false))
    }

    const _handleChangeStatus = (name, value) => {
        setFormRequestStatus({ statusId: value })
    }

    return {
        // ---- List Data ----
        __list,
        __isLoading,
        __pagination,
        __search,
        __actionRemove,
        __actionChange,
        __actionClear,
        __setSearch,
        __actionPagination,
        __actionSetIsUseSearch,

        // ---- Change Page ----
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
        __handleToMain,
        __handleToTrash,

        // ---- Actions ----
        __formRequestStatus: formRequestStatus,
        __isLoadingUpdate: isLoadingUpdate,
        __handleConfirmRead: _handleConfirmRead,
        __handleRead: _handleRead,
        __handleConfirmUpdateStatus: _handleConfirmUpdateStatus,
        __handleUpdateStatus: _handleUpdateStatus,
        __handleChangeStatus: _handleChangeStatus,
    }
}

export default useBoatInquiryMain
