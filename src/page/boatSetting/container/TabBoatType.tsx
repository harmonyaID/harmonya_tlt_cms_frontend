import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import CardPreview from '@/component/card/CardPreview.tsx'
import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import LoadingStatePreviewData from '@/component/loading/LoadingStatePreviewData.tsx'
import { MDBoatTypeAdd, MDBoatTypeRemove } from '@/config/modal.config.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import { apiBoatType } from '@/service/api/boatManage.api.ts'

const initForm = {
    name: '',
}

const initMapForm = (passData) => ({
    name: passData?.name || '',
})

const TabBoatType = () => {
    const {
        __list,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
    } = useDataListHook({
        urlAPI: apiBoatType.list,
        advancedSearch: {
            page: 0,
        },
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
        modalId: MDBoatTypeAdd,
        modalRemoveId: MDBoatTypeRemove,
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
            nextStep: () => actionModal(MDBoatTypeRemove, false),
        },
    })

    return (
        <>
            <div className="row mb-4">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">Boat Type</h5>
                </div>
                <div className="col-auto">
                    <BtnPrimary onClick={() => __actionAddModal()}>
                        Add New
                    </BtnPrimary>
                </div>
            </div>

            <LoadingStatePreviewData isLoading={__isLoading} data={__list}>
                <div className="row g-3">
                    {__list?.map((vm, index) => (
                        <div className="col-lg-3 col-md-6" key={index}>
                            <CardPreview className="mb-0 h-100">
                                <div className="hstack gap-2 justify-content-between flex-wrap mb-3 align-items-start">
                                    <h6 className="fw-500 text-neutral-100 mb-0">
                                        {vm.name}
                                    </h6>
                                </div>

                                <div className="hstack gap-2 flex-wrap mt-auto">
                                    <BtnCircleRemove
                                        title="Delete Data"
                                        actions={{
                                            remove: (e) => {
                                                e.stopPropagation()
                                                _handleChooseRemove(vm)
                                            },
                                        }}
                                    />
                                    <BtnCircleEdit
                                        title="Edit"
                                        actions={{
                                            edit: (e) => {
                                                e.stopPropagation()
                                                __actionUpdateModal(vm)
                                            },
                                        }}
                                    />
                                </div>
                            </CardPreview>
                        </div>
                    ))}
                </div>
            </LoadingStatePreviewData>

            {/*{isShowPagination(__isLoading, __list, __pagination) ? (*/}
            {/*    <Pagination*/}
            {/*        onMove={(step) => __actionPagination(step)}*/}
            {/*        className="mt-2"*/}
            {/*        pagination={configDefaultPagination(*/}
            {/*            __pagination,*/}
            {/*            'totalPage',*/}
            {/*        )}*/}
            {/*    />*/}
            {/*) : null}*/}

            <CreatePortalLayout>
                <ConfirmRemoveListLogic
                    id={MDBoatTypeRemove}
                    configHandle={{
                        urlAPI: () => apiBoatType.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <ModalWithActionFormCRUDLogic
                    id={MDBoatTypeAdd}
                    detail={__detailData}
                    title="Boat Type"
                    isEdit={__isEdit}
                    formRequest={__formRequest}
                    actions={{
                        change: _handleChange,
                        toggleModal: __actionCloseModal,
                    }}
                    placeholder="e.g Customer Staging"
                    configHandle={{
                        urlAPIAdd: () => apiBoatType.add(__formRequest),
                        urlAPIUpdate: () => {
                            return apiBoatType.update(
                                __selectedId,
                                __formRequest,
                            )
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
            </CreatePortalLayout>
        </>
    )
}

export default TabBoatType
