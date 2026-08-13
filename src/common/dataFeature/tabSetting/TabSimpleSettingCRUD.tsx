import { useEffect, useState } from 'react'
import useTrash from '@/common/dataFeature/trash/hook/useTrash.ts'
import TrashActionButtons from '@/common/dataFeature/trash/TrashActionButtons.tsx'
import TrashConfirmModals from '@/common/dataFeature/trash/TrashConfirmModals.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import CardPreview from '@/component/card/CardPreview.tsx'
import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnDanger,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import LoadingStatePreviewData from '@/component/loading/LoadingStatePreviewData.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import {
    permanentDeleteBoat,
    restoreBoat,
} from '@/service/api/boatManage.api.ts'

const initForm = {
    name: '',
}

const initMapForm = (passData) => ({
    name: passData?.name || '',
})

const TabSimpleSettingCRUD = ({
    apiCRUD = {
        list: (passForm) => {},
        add: (passForm) => {},
        update: (id, passForm) => {},
        delete: (id) => {},
    },
    apiTrash,
    idModal = '',
    placeholder = 'e.g Hotel',
    title = '',
    isSearch = false,
    isAdd = true,
    isEdit = true,
    isRemove = true,
    isAutoSearch = false,
}: {
    title: string
    apiCRUD: any
    apiTrash?: {
        list: any
        restore: any
        delete: any
    }
    idModal?: string
    placeholder?: string
    isSearch?: boolean
    isAdd?: boolean
    isEdit?: boolean
    isRemove?: boolean
    isAutoSearch?: boolean
}) => {
    const idModalAdd = idModal + 'Add'
    const idModalRemove = idModal + 'Remove'

    const [isShowTrash, setIsShowTrash] = useState<boolean>(false)
    const [urlAPI, setUrlAPI] = useState(() => apiCRUD.list)

    const {
        __list,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
        __actionRemoveAll,
    } = useDataListHook({
        urlAPI: (passData) => urlAPI?.(isSearch ? passData : { page: 0 }),
        advancedSearch: {
            page: 0,
        },
        isAutoSearch,
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
        modalId: idModalAdd,
        modalRemoveId: idModalRemove,
        emptyParam: { ...initForm },
        mapDetailToFormRequest: (passData) => initMapForm({ ...passData }),
    })

    const { _handleChange } = useNestedFormHook(__formRequest, __setFormRequest)

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(idModalRemove, false),
        },
    })

    const {
        __isLoadingTrash,
        __handlePermanentRemove,
        __handleChooseRestore,
        __handleRestore,
        __handleChoosePermanentRemove,
        __dataPermanentRemove,
        __dataRestore,
    } = useTrash({
        urlAPIRestore: apiTrash?.restore,
        urlAPIPermanentRemove: apiTrash?.delete,
        actions: {
            onSuccess: (vm) => __actionRemove(vm.id),
        },
    })

    const _handleShowTrash = () => {
        setIsShowTrash(true)
        if (apiTrash?.list) {
            setUrlAPI(() => apiTrash.list)
            // __actionPagination(1)
        }
    }

    const _handleShowList = () => {
        setIsShowTrash(false)
        setUrlAPI(() => apiCRUD.list)
        // __actionPagination(1)
    }

    useEffect(() => {
        __actionRemoveAll()
        __actionPagination(1)
    }, [urlAPI])

    return (
        <>
            <div className="row mb-4">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">
                        {title} {isShowTrash ? 'Trash' : ''}
                    </h5>
                </div>
                <div className="col-auto">
                    {isShowTrash ? (
                        <BtnPrimary isOutline onClick={() => _handleShowList()}>
                            Back
                        </BtnPrimary>
                    ) : (
                        <div className="hstack gap-2">
                            {apiTrash?.list && (
                                <BtnDanger
                                    isOutline
                                    handle={() => _handleShowTrash()}>
                                    Trash
                                </BtnDanger>
                            )}
                            {isAdd ? (
                                <BtnPrimary onClick={() => __actionAddModal()}>
                                    Add New
                                </BtnPrimary>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>

            <LoadingStatePreviewData isLoading={__isLoading} data={__list}>
                <div className="row g-3">
                    {__list?.map((vm, index) => (
                        <div className="col-lg-3 col-md-6" key={index}>
                            <CardPreview className="mb-0 h-100">
                                <div className="hstack gap-2 justify-content-between flex-wrap align-items-start">
                                    <h6 className="fw-500 text-neutral-100 mb-0">
                                        {vm.name}
                                    </h6>
                                </div>

                                <div className="hstack gap-2 flex-wrap mt-auto pt-3">
                                    {isShowTrash ? (
                                        <TrashActionButtons
                                            selected={vm}
                                            actions={{
                                                permanentRemove:
                                                    __handleChoosePermanentRemove,
                                                restore: __handleChooseRestore,
                                            }}
                                        />
                                    ) : (
                                        <>
                                            {isRemove ? (
                                                <BtnCircleRemove
                                                    title="Delete Data"
                                                    actions={{
                                                        remove: (e) => {
                                                            e.stopPropagation()
                                                            _handleChooseRemove(
                                                                vm,
                                                            )
                                                        },
                                                    }}
                                                />
                                            ) : null}

                                            {isEdit ? (
                                                <BtnCircleEdit
                                                    title="Edit"
                                                    actions={{
                                                        edit: (e) => {
                                                            e.stopPropagation()
                                                            __actionUpdateModal(
                                                                vm,
                                                            )
                                                        },
                                                    }}
                                                />
                                            ) : null}
                                        </>
                                    )}
                                </div>
                            </CardPreview>
                        </div>
                    ))}
                </div>
            </LoadingStatePreviewData>

            {isShowPagination(__isLoading, __list, __pagination) && isSearch ? (
                <Pagination
                    onMove={(step) => __actionPagination(step)}
                    className="mt-2"
                    pagination={configDefaultPagination(
                        __pagination,
                        'totalPage',
                    )}
                />
            ) : null}

            <CreatePortalLayout>
                <ConfirmRemoveListLogic
                    id={idModalRemove}
                    configHandle={{
                        urlAPI: () => apiCRUD.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <ModalWithActionFormCRUDLogic
                    id={idModalAdd}
                    detail={__detailData}
                    title={title}
                    isEdit={__isEdit}
                    formRequest={__formRequest}
                    actions={{
                        change: _handleChange,
                        toggleModal: __actionCloseModal,
                    }}
                    placeholder={placeholder}
                    configHandle={{
                        urlAPIAdd: () => apiCRUD.add(__formRequest),
                        urlAPIUpdate: () => {
                            return apiCRUD.update(__selectedId, __formRequest)
                        },
                        initialForm: () =>
                            // @ts-ignore
                            __setFormRequest(initMapForm(__detailData)),
                        callBack: (newData) => {
                            __isEdit
                                ? __actionUpdate(newData)
                                : __actionAdd(newData, 'id', true)
                        },
                        // @ts-ignore
                        emptySelect: () => __setFormRequest({ ...initForm }),
                    }}
                />

                <TrashConfirmModals
                    name={__dataRestore?.name || __dataPermanentRemove?.name}
                    isLoading={__isLoadingTrash}
                    actions={{
                        handleRestore: __handleRestore,
                        handlePermanentRemove: __handlePermanentRemove,
                    }}
                />
            </CreatePortalLayout>
        </>
    )
}

export default TabSimpleSettingCRUD
