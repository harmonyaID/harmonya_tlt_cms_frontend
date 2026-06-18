import { useState } from 'react'
import { useNavigate } from 'react-router'
import {
    RESTORE_COUNT,
    RESTORE_COUNT_ADVANCE,
    RESTORE_IS_USE_SEARCH,
} from '@/config/advanceSearch.config'
import { objDataSearchOther } from '@/config/objectPassState.config'
import actionModal from '@/helper/base/actionModal.helper'
import { isSuccess } from '@/helper/condition.helper'
import { UsePageFlowHandlerType } from '@/hook/type/usePageFlow.type.ts'

const usePageFlowHandlerHook = ({
    basePath,
    extraPath,
    pathFromKey,
    modalRemoveId,
    search = {},
    countAdvance = 0,
    isUseSearch = true,
}: UsePageFlowHandlerType) => {
    const navigate = useNavigate()
    const [selectedId, setSelectedId] = useState<string>('')

    const _handleNavigateWithState = (
        url: string,
        extraState: Record<string, any> = {},
    ) => {
        navigate(url, {
            state: {
                ...objDataSearchOther(search),
                [RESTORE_COUNT]: {
                    [RESTORE_COUNT_ADVANCE]: countAdvance,
                    [RESTORE_IS_USE_SEARCH]: isUseSearch,
                },
                ...extraState,
            },
        })
    }

    // Deprecated*
    const _handleToDetailAdd = (
        id: string,
        extraState: Record<string, any> = {},
    ) =>
        _handleNavigateWithState(basePath.detail(id) + extraPath + '/add', {
            from: pathFromKey,
            ...extraState,
        })

    // Deprecated*
    const _handleToDetailEdit = (
        id: string,
        extraState: Record<string, any> = {},
        detailId: number | string,
    ) =>
        _handleNavigateWithState(
            basePath.detail(id) + extraPath + '/' + detailId + '/edit',
            {
                from: pathFromKey,
                ...extraState,
            },
        )

    // Deprecated*
    const _handleToDetailView = (
        id: string,
        extraState: Record<string, any> = {},
        detailId: number | string,
    ) =>
        _handleNavigateWithState(
            basePath.detail(id) + extraPath + '/' + detailId + '/detail',
            {
                from: pathFromKey,
                ...extraState,
            },
        )

    const _handleToDetail = (
        id: string,
        extraState: Record<string, any> = {},
    ) => _handleNavigateWithState(basePath.detail(id), { ...extraState })

    const _handleToAdd = (extraState: Record<string, any> = {}) =>
        _handleNavigateWithState(basePath.add, {
            from: pathFromKey,
            ...extraState,
        })

    const _handleToEdit = (id: string, extraState: Record<string, any> = {}) =>
        _handleNavigateWithState(basePath.edit(id), {
            from: pathFromKey,
            ...extraState,
        })

    const _handleToMain = (extraState: Record<string, any> = {}) =>
        _handleNavigateWithState(basePath.main, extraState)

    const _handleRemove = (id: string) => {
        setSelectedId(id)
        if (modalRemoveId) actionModal(modalRemoveId)
    }

    const _handleCancel = (restoredData: Record<string, any> = {}) => {
        if (restoredData.from === pathFromKey && restoredData.parentId) {
            _handleToDetail(restoredData.parentId, restoredData)
        } else {
            _handleToMain(restoredData)
        }
    }

    const _handleSubmit = ({
        apiCall,
        setIsLoading,
        callBack,
        isDirectToDetail = true,
    }: {
        apiCall: () => Promise<any>
        setIsLoading: (state: boolean) => void
        callBack?: (res: any, id: string) => void
        isDirectToDetail?: boolean
    }) => {
        setIsLoading(true)
        apiCall()
            .then((resData) => {
                setIsLoading(false)
                if (isSuccess(resData)) {
                    const dataIdOrUUID =
                        resData?.result?.id || resData?.result?.uuid
                    if (!dataIdOrUUID) return

                    callBack?.(resData, dataIdOrUUID)
                    if (isDirectToDetail) {
                        _handleToDetail(dataIdOrUUID)
                    }
                }
            })
            .catch(() => {
                setIsLoading(false)
            })
    }

    return {
        __selectedId: selectedId,
        __setSelectedId: setSelectedId,
        __handleToDetail: _handleToDetail,
        __handleToAdd: _handleToAdd,
        __handleToEdit: _handleToEdit,
        __handleToMain: _handleToMain,
        __handleRemove: _handleRemove,
        __handleCancel: _handleCancel,
        __handleSubmit: _handleSubmit,
    }
}

export default usePageFlowHandlerHook
