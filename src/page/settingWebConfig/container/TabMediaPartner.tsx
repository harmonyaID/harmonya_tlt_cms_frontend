import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { apiMediaPartner } from '@/service/api/contentManageSetting.api.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import {
    MDPSTabMediaPartnerAdd,
    MDPSTabMediaPartnerRemove,
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
import { Link } from 'react-router'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import { objectToFormData } from '@/helper/convertFormData.helper.ts'
import { APIResponse } from '@/type/resultAPI'
import { ImgInTable } from '@/component/general/Image.tsx'
import { useState } from 'react'

const initForm = {
    name: '',
    description: '',
    url: '',
    isPublish: 1,
    image: '',
}

const initMapForm = (passData) => ({
    name: passData.name || '',
    description: passData.description || '',
    url: passData.url || '',
    isPublish: passData.isPublish ? 1 : 0,
    image: '',
})

const TabMediaPartner = () => {
    const {
        __list,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
    } = useDataListHook({
        urlAPI: apiMediaPartner.list,
    })

    const [previewImage, setPreviewImage] = useState('')

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
        modalId: MDPSTabMediaPartnerAdd,
        modalRemoveId: MDPSTabMediaPartnerRemove,
        emptyParam: { ...initForm },
        mapDetailToFormRequest: (res) => {
            if (res?.image) {
                setPreviewImage(res.image)
            }

            return initMapForm(res)
        },
    })

    const { _handleChange } = useNestedFormHook(__formRequest, __setFormRequest)

    const _handleRemoveImage = () => {
        setPreviewImage('')
        _handleChange('image', '')
    }

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDPSTabMediaPartnerRemove, false),
        },
    })

    const _handleAddSync = async (): Promise<APIResponse> => {
        const dataForm = await objectToFormData({ ...__formRequest })
        return apiMediaPartner.addWithData(dataForm)
    }

    const _handleUpdateSync = async (): Promise<APIResponse> => {
        const dataForm = await objectToFormData({ ...__formRequest })
        return apiMediaPartner.updateWithData(__selectedId, dataForm)
    }

    return (
        <>
            <div className="row mb-4">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">Media Partner</h5>
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
                            { content: 'Image', className: 'w-10' },
                            'Name',
                            'Description',
                            'Publish',
                            'Link',
                            '',
                        ]}
                        tds={__list}>
                        {__list.map((vm, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {/*{vm.image}*/}

                                        <ImgInTable
                                            src={vm.image}
                                            alt={vm.name}
                                            extraClassImg="img-contain-100"
                                        />
                                    </td>
                                    <td>
                                        <TblLineFirst value={vm.name} />
                                    </td>
                                    <td>
                                        <TblLineSecond>
                                            {vm.description || '-'}
                                        </TblLineSecond>
                                    </td>
                                    <td>
                                        <TextTrueOrFalse value={vm.isPublish} />
                                    </td>
                                    <td>
                                        <TblLineSecond>
                                            {vm.url ? (
                                                <Link
                                                    to={vm.url}
                                                    target="_blank">
                                                    Preview
                                                </Link>
                                            ) : (
                                                '-'
                                            )}
                                        </TblLineSecond>
                                    </td>
                                    <td>
                                        <div className="hstack gap-2 justify-content-end">
                                            <BtnCircleRemove
                                                actions={{
                                                    remove: (e) => {
                                                        e.stopPropagation()
                                                        _handleChooseRemove(vm)
                                                    },
                                                }}
                                            />

                                            <BtnCircleEdit
                                                actions={{
                                                    edit: (e) => {
                                                        e.stopPropagation()
                                                        __actionUpdateModal(vm)
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
                    id={MDPSTabMediaPartnerRemove}
                    configHandle={{
                        urlAPI: () => apiMediaPartner.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <ModalWithActionFormCRUDLogic
                    id={MDPSTabMediaPartnerAdd}
                    detail={__detailData}
                    title="Media Partner"
                    isEdit={__isEdit}
                    formRequest={__formRequest}
                    actions={{
                        change: _handleChange,
                        toggleModal: __actionCloseModal,
                    }}
                    isUseDefaultInput={false}
                    externalForm={
                        <>
                            <FormInput
                                label="Name"
                                name="name"
                                required
                                placeholder="e.g Global X"
                            />
                            <FormInput
                                label="Url"
                                name="url"
                                required
                                type="url"
                                placeholder="e.g https://www.thelembongantraveller.com/"
                            />
                            <FormTextArea
                                label="Description"
                                name="description"
                                required
                                placeholder="e.g Nusa Lembongan is a great place to bring children of all ages. It’s a very safe island and the locals adore children."
                            />

                            <FormRadioButtonMulti
                                label="Share Publish ?"
                                name="isPublish"
                                required
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

                            {previewImage ? (
                                <div className="my-3">
                                    <p className="mb-2 text-neutral-100">
                                        Logo
                                    </p>

                                    <PreviewFileModalLogic
                                        dataUrl={previewImage?.toString()}
                                        dataBy="file"
                                        dataFile={previewImage}
                                        isShowBtnRemove
                                        actions={{
                                            remove: _handleRemoveImage,
                                        }}
                                    />
                                </div>
                            ) : (
                                <>
                                    <FormUploadFile
                                        label="Logo"
                                        name="image"
                                        required
                                        isUseHook={false}
                                        isPreview={false}
                                        accept="image/*"
                                        actions={{
                                            onChange: (name, newFiles) => {
                                                const img = new Image()
                                                const objectUrl =
                                                    URL.createObjectURL(
                                                        newFiles,
                                                    )

                                                img.onload = () => {
                                                    _handleChange(
                                                        'image',
                                                        newFiles,
                                                    )
                                                }

                                                img.src = objectUrl
                                            },

                                            handleDataFiles: (newDataFiles) =>
                                                setPreviewImage(
                                                    newDataFiles.url,
                                                ),
                                        }}
                                    />
                                </>
                            )}
                        </>
                    }
                    configHandle={{
                        urlAPIAdd: _handleAddSync,
                        urlAPIUpdate: _handleUpdateSync,
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

export default TabMediaPartner
