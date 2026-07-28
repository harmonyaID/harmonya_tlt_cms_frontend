import { useState } from 'react'
import { Link } from 'react-router'
import SelectBaseOptionMediaPartnerType from '@/common/dataForm/SelectBaseOptionMediaPartnerType.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import { ImgInTable } from '@/component/general/Image.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import {
    TblLineFirst,
    TblLineSecond,
    TblPointData,
} from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import {
    MDPSTabMediaPartnerAdd,
    MDPSTabMediaPartnerRemove,
} from '@/config/modal.config.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import { objectToFormData } from '@/helper/convertFormData.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import { apiMediaPartner } from '@/service/api/contentManageSetting.api.ts'
import { APIResponse } from '@/type/resultAPI'

const initForm = {
    name: '',
    description: '',
    url: '',
    isPublish: 1,
    logo: '',
    // featureImage: '',
    typeId: '',
}

const initMapForm = (passData) => ({
    name: passData.name || '',
    description: passData.description || '',
    url: passData.url || '',
    isPublish: passData.isPublish ? 1 : 0,
    logo: '',
    // featureImage: '',
    typeId: passData?.type?.id || '',
})

const PARAM_LOGO = 'logo'
const PARAM_FEATURE_IMAGE = 'featureImage'

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

    const [previewDataImage, setPreviewDataImage] = useState({
        [PARAM_LOGO]: '',
        [PARAM_FEATURE_IMAGE]: '',
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
        modalId: MDPSTabMediaPartnerAdd,
        modalRemoveId: MDPSTabMediaPartnerRemove,
        emptyParam: { ...initForm },
        mapDetailToFormRequest: (res) => {
            if (res) {
                setPreviewDataImage({
                    [PARAM_FEATURE_IMAGE]: res[PARAM_FEATURE_IMAGE] || '',
                    [PARAM_LOGO]: res[PARAM_LOGO] || '',
                })
            }

            return initMapForm(res)
        },
    })

    const { _handleChange } = useNestedFormHook(__formRequest, __setFormRequest)

    const _handleDataImage = (name, value = '') => {
        setPreviewDataImage((prevState) => ({ ...prevState, [name]: value }))
    }

    const _handleRemoveImage = (name: string) => {
        _handleDataImage(name, '')
        _handleChange(name, '')
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
                            { content: 'Logo', className: 'w-10' },
                            'Name',
                            'Type',
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
                                            src={vm.logo}
                                            alt={vm.name}
                                            extraClassImg="img-contain-100"
                                        />
                                    </td>
                                    <td>
                                        <TblLineFirst value={vm.name} />
                                    </td>
                                    <td>
                                        <TblLineFirst
                                            value={vm?.type?.name || '-'}
                                        />
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

                            <SelectBaseOptionMediaPartnerType />

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

                            {previewDataImage[PARAM_LOGO] ? (
                                <div className="my-3">
                                    <p className="mb-2 text-neutral-100">
                                        Logo
                                    </p>

                                    <PreviewFileModalLogic
                                        dataUrl={previewDataImage[
                                            PARAM_LOGO
                                        ]?.toString()}
                                        dataBy="file"
                                        dataFile={previewDataImage[PARAM_LOGO]}
                                        isShowBtnRemove
                                        actions={{
                                            remove: () =>
                                                _handleRemoveImage(PARAM_LOGO),
                                        }}
                                    />
                                </div>
                            ) : (
                                <>
                                    <FormUploadFile
                                        label="Logo"
                                        name={PARAM_LOGO}
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
                                                        PARAM_LOGO,
                                                        newFiles,
                                                    )
                                                }

                                                img.src = objectUrl
                                            },

                                            handleDataFiles: (newDataFiles) =>
                                                _handleDataImage(
                                                    PARAM_LOGO,
                                                    newDataFiles.url,
                                                ),
                                        }}
                                    />
                                </>
                            )}

                            {/*{previewDataImage[PARAM_FEATURE_IMAGE] ? (*/}
                            {/*    <div className="my-3">*/}
                            {/*        <p className="mb-2 text-neutral-100">*/}
                            {/*            Featured Image*/}
                            {/*        </p>*/}

                            {/*        <PreviewFileModalLogic*/}
                            {/*            dataUrl={previewDataImage[*/}
                            {/*                PARAM_FEATURE_IMAGE*/}
                            {/*            ]?.toString()}*/}
                            {/*            dataBy="file"*/}
                            {/*            dataFile={*/}
                            {/*                previewDataImage[*/}
                            {/*                    PARAM_FEATURE_IMAGE*/}
                            {/*                ]*/}
                            {/*            }*/}
                            {/*            isShowBtnRemove*/}
                            {/*            actions={{*/}
                            {/*                remove: () =>*/}
                            {/*                    _handleRemoveImage(*/}
                            {/*                        PARAM_FEATURE_IMAGE,*/}
                            {/*                    ),*/}
                            {/*            }}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*) : (*/}
                            {/*    <>*/}
                            {/*        <FormUploadFile*/}
                            {/*            label="Feature Image"*/}
                            {/*            name={PARAM_FEATURE_IMAGE}*/}
                            {/*            isUseHook={false}*/}
                            {/*            isPreview={false}*/}
                            {/*            accept="image/*"*/}
                            {/*            actions={{*/}
                            {/*                onChange: (name, newFiles) => {*/}
                            {/*                    const img = new Image()*/}
                            {/*                    const objectUrl =*/}
                            {/*                        URL.createObjectURL(*/}
                            {/*                            newFiles,*/}
                            {/*                        )*/}

                            {/*                    img.onload = () => {*/}
                            {/*                        _handleChange(*/}
                            {/*                            PARAM_FEATURE_IMAGE,*/}
                            {/*                            newFiles,*/}
                            {/*                        )*/}
                            {/*                    }*/}

                            {/*                    img.src = objectUrl*/}
                            {/*                },*/}

                            {/*                handleDataFiles: (newDataFiles) =>*/}
                            {/*                    _handleDataImage(*/}
                            {/*                        PARAM_FEATURE_IMAGE,*/}
                            {/*                        newDataFiles.url,*/}
                            {/*                    ),*/}
                            {/*            }}*/}
                            {/*        />*/}
                            {/*    </>*/}
                            {/*)}*/}
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
