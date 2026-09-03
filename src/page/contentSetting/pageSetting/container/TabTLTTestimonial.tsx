import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnDanger,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import {
    apiTLTReview,
    apiTLTTestimonial,
    getTLTReviewTrash,
    getTLTTestimonialTrash,
    permanentDeleteTLTReview,
    permanentDeleteTLTTestimonial,
    restoreTLTReview,
    restoreTLTTestimonial,
} from '@/service/api/contentManageSetting.api.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import {
    MDPSTabFAQAdd,
    MDPSTabFAQRemove,
    MDPSTabLanguageAdd,
    MDPSTabTLTTestimonialAdd,
    MDPSTabTLTTestimonialRemove,
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
import RenderHtml from '@/component/general/RenderHtml.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'

const defaultIsActive = 1

const initForm = {
    name: '',
    position: '',
    company: '',
    order: '0',
    testimonial: '',
    isActive: defaultIsActive,
    photo: '',
}

const initMapForm = (passData) => ({
    name: passData?.name || '',
    position: passData?.position || '',
    company: passData?.company || '',
    order: passData?.order || '0',
    testimonial: passData?.testimonial || '',
    isActive: passData?.isActive ? 1 : 0,
    deletePhotoIds: [],
    photo: passData?.photo || '',
})

const TabTLTTestimonial = () => {
    const [isShowTrash, setIsShowTrash] = useState<boolean>(false)
    const [urlAPI, setUrlAPI] = useState(() => apiTLTTestimonial.list)

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

    const [lisPreviousPhotos, setLisPreviousPhotos] = useState([])

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
        modalId: MDPSTabTLTTestimonialAdd,
        modalRemoveId: MDPSTabTLTTestimonialRemove,
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
        urlAPIRestore: restoreTLTTestimonial,
        urlAPIPermanentRemove: permanentDeleteTLTTestimonial,
        actions: {
            onSuccess: (vm) => __actionRemove(vm.id),
        },
    })

    const _handleShowTrash = () => {
        setIsShowTrash(true)
        setUrlAPI(() => getTLTTestimonialTrash)
    }

    const _handleShowList = () => {
        setIsShowTrash(false)
        setUrlAPI(() => apiTLTTestimonial.list)
    }

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDPSTabTLTTestimonialRemove, false),
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
                        TLT Testimonial {isShowTrash && 'Trash'}
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
                            'Company',
                            'Testimonial',
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
                                            <TblLineSecond
                                                value={vm.position}
                                            />
                                        </td>
                                        <td>
                                            <TblLineSecond value={vm.company} />
                                        </td>
                                        <td className="max-w-300px">
                                            <RenderHtml
                                                html={vm.testimonial || '-'}
                                            />
                                        </td>
                                        <td>
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
                    id={MDPSTabTLTTestimonialRemove}
                    configHandle={{
                        urlAPI: () =>
                            apiTLTTestimonial.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <ModalWithActionFormCRUDLogic
                    id={MDPSTabTLTTestimonialAdd}
                    detail={__detailData}
                    title="TLT Testimonial"
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
                                label="Position"
                                name="position"
                                required
                                placeholder="e.g Marketing"
                            />

                            <FormInput
                                label="Company"
                                name="company"
                                required
                                placeholder="e.g XYW Ltd"
                            />

                            <FormTextArea
                                label="Testimonial"
                                name="testimonial"
                                required
                                placeholder="e.g Nusa Lembongan is a great place to bring children of all ages. It’s a very safe island and the locals adore children."
                            />

                            <FormInput
                                label="Order"
                                name="order"
                                isNumberOnly
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
                            return apiTLTTestimonial.addWithData(dataForm)
                        },
                        urlAPIUpdate: async (): Promise<APIResponse> => {
                            const dataForm = await objectToFormData({
                                ...__formRequest,
                            })
                            return apiTLTTestimonial.updateWithData(
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

                            setLisPreviousPhotos([])
                        },
                        emptySelect: () => {
                            __setFormRequest({
                                ...initForm,
                            })

                            setLisPreviousPhotos([])
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

export default TabTLTTestimonial
