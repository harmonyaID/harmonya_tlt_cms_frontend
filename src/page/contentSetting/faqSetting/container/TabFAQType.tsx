import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnDanger,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import {
    apiFAQType,
    apiTLTReview,
    apiTLTTestimonial,
    getFAQTypeTrash,
    getTLTReviewTrash,
    permanentDeleteFAQType,
    restoreFAQType,
} from '@/service/api/contentManageSetting.api.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import {
    MDPSTabFAQTypeAdd,
    MDPSTabFAQTypeRemove,
} from '@/config/modal.config.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import { TblLineFirst } from '@/component/general/TablePartial.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import { APIResponse } from '@/type/resultAPI.ts'
import { objectToFormData } from '@/helper/convertFormData.helper.ts'
import { useEffect, useState } from 'react'
import useTrash from '@/common/dataFeature/trash/hook/useTrash.ts'
import TrashActionButtons from '@/common/dataFeature/trash/TrashActionButtons.tsx'
import TrashConfirmModals from '@/common/dataFeature/trash/TrashConfirmModals.tsx'

const initForm = {
    name: '',
    order: '0',
}

const initMapForm = (passData) => ({
    name: passData?.name || '',
    order: passData?.order || '0',
})

const TabFAQType = () => {
    const [isShowTrash, setIsShowTrash] = useState<boolean>(false)
    const [urlAPI, setUrlAPI] = useState(() => apiFAQType.list)

    const {
        __list,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionRemoveAll,
        __actionPagination,
    } = useDataListHook({
        urlAPI: urlAPI,
        isAutoSearch: false,
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
        modalId: MDPSTabFAQTypeAdd,
        modalRemoveId: MDPSTabFAQTypeRemove,
        //@ts-ignore
        emptyParam: { ...initForm },
        mapDetailToFormRequest: (passData) => {
            const configParam = {
                ...passData,
                isActive: passData.isActive ? 1 : 0,
            }

            return initMapForm(configParam)
        },
    })

    const { _handleChange } = useNestedFormHook(__formRequest, __setFormRequest)

    const {
        __isLoadingTrash,
        __handlePermanentRemove,
        __handleChooseRestore,
        __handleRestore,
        __handleChoosePermanentRemove,
        __dataPermanentRemove,
        __dataRestore,
    } = useTrash({
        urlAPIRestore: restoreFAQType,
        urlAPIPermanentRemove: permanentDeleteFAQType,
        actions: {
            onSuccess: (vm) => __actionRemove(vm.id),
        },
    })

    const _handleShowTrash = () => {
        setIsShowTrash(true)
        setUrlAPI(() => getFAQTypeTrash)
    }

    const _handleShowList = () => {
        setIsShowTrash(false)
        setUrlAPI(() => apiFAQType.list)
    }

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDPSTabFAQTypeRemove, false),
        },
    })

    useEffect(() => {
        __actionRemoveAll()
        __actionPagination(1)
    }, [urlAPI])

    return (
        <>
            <div className="row mb-4">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">
                        FAQ Type {isShowTrash && 'Trash'}
                    </h5>
                </div>
                <div className="col-auto">
                    {isShowTrash ? (
                        <BtnPrimary isOutline onClick={() => _handleShowList()}>
                            Back
                        </BtnPrimary>
                    ) : (
                        <div className="hstack gap-2">
                            <BtnDanger
                                isOutline
                                handle={() => _handleShowTrash()}>
                                Trash
                            </BtnDanger>
                            <BtnPrimary onClick={() => __actionAddModal()}>
                                Add New
                            </BtnPrimary>
                        </div>
                    )}
                </div>
            </div>

            <div className="row overflow-y-auto position-relative">
                <div className="col-md-12">
                    <TableThemeLogic
                        isLoading={__isLoading}
                        isNoWrap
                        ths={['Order', 'Name', '']}
                        tds={__list}>
                        {__list
                            .sort((a, b) => Number(a.order) - Number(b.order))
                            .map((vm, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{vm.order}</td>
                                        <td>
                                            <TblLineFirst value={vm.name} />
                                        </td>
                                        <td>
                                            <div className="hstack gap-2 justify-content-end">
                                                {isShowTrash ? (
                                                    <TrashActionButtons
                                                        selected={vm}
                                                        actions={{
                                                            permanentRemove:
                                                                __handleChoosePermanentRemove,
                                                            restore:
                                                                __handleChooseRestore,
                                                        }}
                                                    />
                                                ) : (
                                                    <>
                                                        <BtnCircleRemove
                                                            actions={{
                                                                remove: (e) => {
                                                                    e.stopPropagation()
                                                                    _handleChooseRemove(
                                                                        vm,
                                                                    )
                                                                },
                                                            }}
                                                        />
                                                        <BtnCircleEdit
                                                            actions={{
                                                                edit: (e) => {
                                                                    e.stopPropagation()
                                                                    __actionUpdateModal(
                                                                        vm,
                                                                    )
                                                                },
                                                            }}
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                    </TableThemeLogic>
                </div>
            </div>

            {isShowPagination(__isLoading, __list, __pagination) ? (
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
                    id={MDPSTabFAQTypeRemove}
                    configHandle={{
                        urlAPI: () => apiFAQType.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <ModalWithActionFormCRUDLogic
                    id={MDPSTabFAQTypeAdd}
                    detail={__detailData}
                    title="FAQ Type"
                    isEdit={__isEdit}
                    formRequest={__formRequest}
                    actions={{
                        change: _handleChange,
                        toggleModal: __actionCloseModal,
                    }}
                    placeholder="e.g General"
                    isUseDefaultInput={false}
                    externalForm={
                        <>
                            <FormInput
                                label="Order"
                                name="order"
                                isNumberOnly
                            />
                            <FormInput
                                label="Name"
                                name="name"
                                required
                                placeholder="e.g General"
                            />
                        </>
                    }
                    configHandle={{
                        urlAPIAdd: async (): Promise<APIResponse> => {
                            return apiFAQType.add(__formRequest)
                        },
                        urlAPIUpdate: async (): Promise<APIResponse> => {
                            return apiFAQType.update(
                                __selectedId,
                                __formRequest,
                            )
                        },
                        initialForm: () =>
                            __setFormRequest(initMapForm(__detailData)),
                        callBack: (newData) => {
                            __isEdit
                                ? __actionUpdate(newData)
                                : __actionAdd(newData, 'id', true)
                        },
                        emptySelect: () => {
                            __setFormRequest({
                                ...initForm,
                            })
                        },
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

export default TabFAQType
