import { useState } from 'react'
import actionModal from '@/helper/base/actionModal.helper'
import { UseCRUDModalRequestOptions } from '@/hook/type/useCRUDModalRequest.type.ts'

function useCRUDModalRequestHook<TDetail = any, TForm = any>({
    modalId,
    modalRemoveId,
    emptyParam,
    mapDetailToFormRequest,
}: UseCRUDModalRequestOptions<TDetail, TForm>) {
    const [formRequest, setFormRequest] = useState<TForm>(emptyParam)
    const [detailData, setDetailData] = useState<TDetail>({} as TDetail)
    const [selectedId, setSelectedId] = useState<number>(0)
    const [isEdit, setIsEdit] = useState(false)

    const _handleAdd = (data?: TDetail & { id: number }) => {
        setIsEdit(false)
        setSelectedId(data?.id ?? 0)

        const mapped = data ? mapDetailToFormRequest(data) : emptyParam
        setFormRequest(mapped)
        setDetailData((data ?? {}) as TDetail)

        if (modalId) actionModal(modalId)
    }

    const _handleUpdate = (data: TDetail & { id: number }) => {
        setIsEdit(true)
        setSelectedId(data.id)

        const mapped = mapDetailToFormRequest(data)
        setFormRequest(mapped)
        setDetailData(data)

        if (modalId) actionModal(modalId)
    }

    const _handleClose = () => {
        if (modalId) actionModal(modalId, true)

        setIsEdit(false)
        setSelectedId(0)
        setFormRequest(emptyParam)
        setDetailData({} as TDetail)
    }

    const _handleRemove = (id: number) => {
        setSelectedId(id)
        if (modalRemoveId) actionModal(modalRemoveId)
    }

    const _handleReset = () => {
        setFormRequest(emptyParam)
        setDetailData({} as TDetail)
        setSelectedId(0)
        setIsEdit(false)
    }

    return {
        __formRequest: formRequest,
        __detailData: detailData,
        __selectedId: selectedId,
        __isEdit: isEdit,
        __setFormRequest: setFormRequest,
        __setDetailData: setDetailData,
        __setSelectedId: setSelectedId,
        __setIsEdit: setIsEdit,
        __actionAddModal: _handleAdd,
        __actionUpdateModal: _handleUpdate,
        __actionCloseModal: _handleClose,
        __actionRemoveModal: _handleRemove,
        __actionReset: _handleReset,
    }
}

export default useCRUDModalRequestHook
