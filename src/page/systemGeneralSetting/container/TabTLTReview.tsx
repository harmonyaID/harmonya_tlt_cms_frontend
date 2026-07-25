import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { apiTLTReview } from '@/service/api/contentManageSetting.api.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import {
    MDPSTabFAQAdd,
    MDPSTabFAQRemove,
    MDPSTabLanguageAdd,
    MDPSTabTLTReviewAdd,
    MDPSTabTLTReviewRemove,
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
import { useState } from 'react'
import FormEditFileLogic from '@/common/misc/FormEditFile.logic.tsx'

const defaultIsActive = 1

const initForm = {
    name: '',
    position: '',
    company: '',
    rating: '1',
    review: '',
    isActive: defaultIsActive,
    photos: [],
}

const initMapForm = (passData) => ({
    name: passData?.name || '',
    position: passData?.position || '',
    company: passData?.company || '',
    rating: passData?.rating || '1',
    review: passData?.review || '',
    isActive: passData?.isActive ? 1 : 0,
    deletePhotoIds: [],
    photos: [],
})

const TabTLTReview = () => {
    const {
        __list,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
    } = useDataListHook({
        urlAPI: apiTLTReview.list,
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
        modalId: MDPSTabTLTReviewAdd,
        modalRemoveId: MDPSTabTLTReviewRemove,
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

    // Start Edit Photos
    const _handleListPreviousPhotos = (passData) => {
        if (passData?.photos?.length > 0) {
            setLisPreviousPhotos(
                passData.photos.map((photo) => ({
                    ...photo,
                    isDeleted: false,
                })),
            )
        }
    }

    const _handleToggleDeletePrevPhotos = (passId: string | number) => {
        __setFormRequest((prevState) => {
            const newState = { ...prevState }

            const photoIndex = newState['deletePhotoIds'].findIndex(
                (id) => id === passId,
            )

            if (photoIndex > -1) {
                newState['deletePhotoIds'].splice(photoIndex, 1)
            } else {
                newState['deletePhotoIds'].push(passId)
            }

            return newState
        })

        setLisPreviousPhotos((prevState) => {
            const newState = [...prevState]

            const index = newState.findIndex((vm) => vm.id === passId)
            if (index > -1) {
                newState[index].isDeleted = !newState[index].isDeleted
            }

            return newState
        })
    }
    // End Edit Photos

    // Start New Photos
    const {
        __dataFiles,
        __setDataFiles,
        __actionAddFiles,
        __actionSetDataFiles,
        __actionRemoveDataFile,
    } = useFormDataFilesHook(__formRequest, __setFormRequest, 'photos')
    // End New Photos

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDPSTabTLTReviewRemove, false),
        },
    })

    return (
        <>
            <div className="row mb-4">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">TLT Review</h5>
                </div>
                <div className="col-auto">
                    <BtnPrimary onClick={() => __actionAddModal()}>
                        Add New
                    </BtnPrimary>
                </div>
            </div>

            <div className="row overflow-y-auto position-relative">
                <div className="col-md-12">
                    <TableThemeLogic
                        isLoading={__isLoading}
                        isNoWrap
                        ths={[
                            'Name',
                            'Company',
                            'Review',
                            'Active',
                            'Photos',
                            '',
                        ]}
                        tds={__list}>
                        {__list
                            .sort((a, b) => Number(a.order) - Number(b.order))
                            .map((vm, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <TblLineFirst value={vm.name} />
                                            <TblLineSecond
                                                value={vm.position}
                                            />
                                        </td>
                                        <td>
                                            <TblLineSecond value={vm.company} />
                                        </td>
                                        <td>
                                            <TblPointData title="Rating">
                                                {vm.rating || '-'}
                                            </TblPointData>

                                            <TblPointData title="Review">
                                                {vm.review || '-'}
                                            </TblPointData>
                                        </td>
                                        <td>
                                            <TextTrueOrFalse
                                                value={vm.isActive}
                                            />
                                        </td>
                                        <td></td>
                                        <td>
                                            <div className="hstack gap-2 justify-content-end">
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
                                                            _handleListPreviousPhotos(
                                                                vm,
                                                            )
                                                            __actionUpdateModal(
                                                                vm,
                                                            )
                                                        },
                                                    }}
                                                />
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
                    id={MDPSTabTLTReviewAdd}
                    detail={__detailData}
                    title="TLT Review"
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

                            <FormInput
                                label="Rating"
                                name="rating"
                                required
                                placeholder="e.g XYW Ltd"
                                type="number"
                                min="0"
                                max="5"
                                isNumberOnly
                            />

                            <FormTextArea
                                label="Review"
                                name="review"
                                required
                                placeholder="e.g Nusa Lembongan is a great place to bring children of all ages. It’s a very safe island and the locals adore children."
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

                            {__isEdit && lisPreviousPhotos?.length ? (
                                <FormEditFileLogic
                                    dataFiles={lisPreviousPhotos.filter(
                                        (vm) => !vm.isDeleted,
                                    )}
                                    dataBy="photo"
                                    actions={{
                                        remove: (data) =>
                                            _handleToggleDeletePrevPhotos(
                                                data.id,
                                            ),
                                        restore: () => {},
                                    }}
                                />
                            ) : null}

                            <WrapFormContext
                                formRequest={__formRequest}
                                actions={{
                                    // change: __handleChange,
                                    handleAddFiles: __actionAddFiles,
                                    handleSetDataFiles: __actionSetDataFiles,
                                    handleRemoveDataFile:
                                        __actionRemoveDataFile,
                                    // handleArrChange: __handleArrChange,
                                }}>
                                <FormUploadFileWithActionPreviewLogic
                                    label="New Photos"
                                    required
                                    isUseInputDesc={false}
                                    isUseDefaultLabel={false}
                                    formName="photos"
                                    // isEdit={isEdit}
                                    dataFiles={__dataFiles}
                                    formRequest={__formRequest}
                                />
                            </WrapFormContext>
                        </>
                    }
                    configHandle={{
                        urlAPIAdd: async (): Promise<APIResponse> => {
                            const dataForm = await objectToFormData({
                                ...__formRequest,
                            })
                            return apiTLTReview.addWithData(__formRequest)
                        },
                        urlAPIUpdate: async (): Promise<APIResponse> => {
                            const dataForm = await objectToFormData({
                                ...__formRequest,
                            })
                            return apiTLTReview.updateWithData(
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
                            __setDataFiles([])
                            setLisPreviousPhotos([])
                        },
                        emptySelect: () => {
                            __setFormRequest({
                                ...initForm,
                            })
                            __setDataFiles([])
                            setLisPreviousPhotos([])
                        },
                    }}
                />
            </CreatePortalLayout>
        </>
    )
}

export default TabTLTReview
