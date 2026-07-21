import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { apiBlogTag } from '@/service/api/contentManageSetting.api.ts'
import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import { MDBlogTagAdd, MDBlogTagRemove } from '@/config/modal.config.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import useChooseData from '@/hook/useChooseData.hook.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import Pagination from '@/component/general/Pagination.tsx'
import LoadingStatePreviewData from '@/component/loading/LoadingStatePreviewData.tsx'
import CardPreview from '@/component/card/CardPreview.tsx'

const initForm = {
    name: '',
}

const initMapForm = (passData) => ({
    name: passData.name || '',
})

const TabBlogTag = () => {
    const {
        __list,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
    } = useDataListHook({
        urlAPI: () => apiBlogTag.list({ page: 0 }),
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
        modalId: MDBlogTagAdd,
        modalRemoveId: MDBlogTagRemove,
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
            nextStep: () => actionModal(MDBlogTagRemove, false),
        },
    })

    return (
        <>
            <div className="row mb-4">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">Tag</h5>
                </div>
                <div className="col-auto">
                    <BtnPrimary onClick={() => __actionAddModal()}>
                        Add New
                    </BtnPrimary>
                </div>
            </div>

            <LoadingStatePreviewData isLoading={__isLoading} data={__list}>
                <div className="row gy-4">
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
                    id={MDBlogTagRemove}
                    configHandle={{
                        urlAPI: () => apiBlogTag.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <ModalWithActionFormCRUDLogic
                    id={MDBlogTagAdd}
                    detail={__detailData}
                    title="Tag"
                    isEdit={__isEdit}
                    formRequest={__formRequest}
                    actions={{
                        change: _handleChange,
                        toggleModal: __actionCloseModal,
                    }}
                    placeholder="e.g Holiday"
                    configHandle={{
                        urlAPIAdd: () => apiBlogTag.add(__formRequest),
                        urlAPIUpdate: () =>
                            apiBlogTag.update(__selectedId, __formRequest),
                        initialForm: () =>
                            __setFormRequest(initMapForm(__detailData)),
                        callBack: (newData) => {
                            __isEdit
                                ? __actionUpdate(newData)
                                : __actionAdd(newData, 'id', true)
                        },
                        emptySelect: () =>
                            __setFormRequest(() => ({
                                ...initForm,
                            })),
                    }}
                />
            </CreatePortalLayout>
        </>
    )
}

export default TabBlogTag
