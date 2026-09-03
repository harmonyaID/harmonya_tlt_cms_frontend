import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnDanger,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import {
    apiTeam,
    apiTLTReview,
    getTeamTrash,
    getTLTReviewTrash,
    permanentDeleteTeam,
    permanentDeleteTLTReview,
    restoreTeam,
    restoreTLTReview,
} from '@/service/api/contentManageSetting.api.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import {
    MDPSTabFAQAdd,
    MDPSTabFAQRemove,
    MDPSTabLanguageAdd,
    MDPSTabTLTReviewAdd,
    MDPSTabTLTReviewRemove,
    MDPSTabTLTTeamAdd,
    MDPSTabTLTTeamRemove,
} from '@/config/modal.config.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import {
    TblLineFirst,
    TblLineSecond,
    TblPointData,
} from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import { APIResponse } from '@/type/resultAPI.ts'
import { objectToFormData } from '@/helper/convertFormData.helper.ts'
import useFormDataFilesHook from '@/hook/dev/useFormDataFiles.hook.ts'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import FormUploadFileWithActionPreviewLogic from '@/common/misc/FormUploadFileWithActionPreview.logic.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import { useEffect, useState } from 'react'
import FormEditFileLogic from '@/common/misc/FormEditFile.logic.tsx'
import useTrash from '@/common/dataFeature/trash/hook/useTrash.ts'
import TrashActionButtons from '@/common/dataFeature/trash/TrashActionButtons.tsx'
import TrashConfirmModals from '@/common/dataFeature/trash/TrashConfirmModals.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'

const defaultIsActive = 1

const initForm = {
    name: '',
    role: '',
    question: '',
    answer: '',
    order: 1,
    isActive: defaultIsActive,
    photo: '',
}

const initMapForm = (passData) => ({
    name: passData?.name || '',
    role: passData?.role || '',
    question: passData?.question || '',
    answer: passData?.answer || '',
    order: passData?.order || 1,
    isActive: passData?.isActive ? 1 : 0,
    photo: passData?.photo || '',
})

const TabTLTTeam = () => {
    const [isShowTrash, setIsShowTrash] = useState<boolean>(false)
    const [urlAPI, setUrlAPI] = useState(() => apiTeam.list)

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
        modalId: MDPSTabTLTTeamAdd,
        modalRemoveId: MDPSTabTLTTeamRemove,
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
        urlAPIRestore: restoreTeam,
        urlAPIPermanentRemove: permanentDeleteTeam,
        actions: {
            onSuccess: (vm) => __actionRemove(vm.id),
        },
    })

    const _handleShowTrash = () => {
        setIsShowTrash(true)
        setUrlAPI(() => getTeamTrash)
    }

    const _handleShowList = () => {
        setIsShowTrash(false)
        setUrlAPI(() => apiTeam.list)
    }

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDPSTabTLTTeamRemove, false),
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
                        TLT Team {isShowTrash && 'Trash'}
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
                        ths={[
                            'Order',
                            'Name',
                            'Role',
                            'Question',
                            'Answer',
                            'Active',
                            'Photo',
                            '',
                        ]}
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
                                            <TblLineSecond value={vm.role} />
                                        </td>
                                        <td>
                                            <TblLineSecond
                                                value={vm.question}
                                            />
                                        </td>
                                        <td className="max-w-300px">
                                            <TblLineSecond value={vm.answer} />
                                        </td>
                                        <td className="max-w-300px">
                                            <TextTrueOrFalse
                                                value={vm.isActive}
                                            />
                                        </td>
                                        <td>
                                            <PreviewFileModalLogic
                                                classNameWidth="avatar-46"
                                                dataUrl={vm.photo || ''}
                                            />
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
                    id={MDPSTabTLTReviewRemove}
                    configHandle={{
                        urlAPI: () => apiTLTReview.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <ModalWithActionFormCRUDLogic
                    id={MDPSTabTLTTeamAdd}
                    detail={__detailData}
                    title="TLT Team"
                    isEdit={__isEdit}
                    formRequest={__formRequest}
                    actions={{
                        change: _handleChange,
                        toggleModal: __actionCloseModal,
                    }}
                    placeholder="e.g Customer Staging"
                    isUseDefaultInput={false}
                    externalForm={
                        <>
                            <FormInput
                                label="Name"
                                name="name"
                                required
                                placeholder="e.g Jane Smith"
                            />

                            <FormInput
                                label="Order"
                                name="order"
                                isNumberOnly
                                placeholder="e.g 2"
                                min={0}
                            />

                            <FormInput
                                label="Role"
                                name="role"
                                placeholder="e.g Founder"
                            />

                            <FormInput
                                label="Question"
                                name="question"
                                placeholder="e.g Why?"
                            />

                            <FormInput
                                label="Answer"
                                name="answer"
                                placeholder="e.g Thats why"
                            />

                            <FormRadioButtonMulti
                                label="Active"
                                name="isActive"
                                checkBoxs={[
                                    {
                                        defaultValue: 0,
                                        label: 'No',
                                    },
                                    {
                                        defaultValue: 1,
                                        label: 'Yes',
                                    },
                                ]}
                            />

                            <FormUploadFile
                                name="photo"
                                isUseHook={false}
                                label="Photo"
                                classNameLayoutImage="col-md-5"
                                value={__formRequest.photo}
                                actions={{
                                    onChange: _handleChange,
                                }}
                            />
                        </>
                    }
                    configHandle={{
                        urlAPIAdd: async (): Promise<APIResponse> => {
                            const dataForm = await objectToFormData({
                                ...__formRequest,
                            })
                            return apiTeam.addWithData(dataForm)
                        },
                        urlAPIUpdate: async (): Promise<APIResponse> => {
                            const dataForm = await objectToFormData({
                                ...__formRequest,
                            })
                            return apiTeam.updateWithData(
                                __selectedId,
                                dataForm,
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

export default TabTLTTeam
