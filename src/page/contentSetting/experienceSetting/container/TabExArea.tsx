import { useState } from 'react'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormSelectOption from '@/component/form/FormSelectOption.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import HDataImage from '@/component/general/HDataImage.tsx'
import { BoxImage } from '@/component/general/Image.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import PreElement from '@/component/general/PreElement.tsx'
import {
    TblLineFirstPrimary,
    TblLineSecond,
} from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import { MDExCategoryAdd, MDExCategoryRemove } from '@/config/modal.config.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import { apiExperienceArea } from '@/service/api/contentManageSetting.api.ts'

const initForm = {
    experienceTypeId: '',
    name: '',
    description: '',
    featuredImage: '',
    deleteFeaturedImage: '',
    banner: '',
    deleteBanner: '',
}

const initMapForm = (passData) => ({
    experienceTypeId: passData?.type?.id || '',
    name: passData.name || '',
    description: passData?.description || '',
    featuredImage: '', //passData?.featuredImage || '',
    deleteFeaturedImage: passData?.deleteFeaturedImage || '',
    banner: '', //passData?.banner || '',
    deleteBanner: passData?.deleteBanner || '',
})

const TabExArea = ({
    listType,
    isLoadingType,
}: {
    listType: any[]
    isLoadingType: boolean
}) => {
    const {
        __list,
        __search,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
        __actionChange,
        __actionClear,
    } = useDataListHook({
        urlAPI: (passData) => apiExperienceArea.list({ ...passData }),
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
        modalId: MDExCategoryAdd,
        modalRemoveId: MDExCategoryRemove,
        emptyParam: { ...initForm },
        mapDetailToFormRequest: (passData) => {
            if (passData.featuredImage) {
                setPreviewFeaturedImage(passData.featuredImage)
            }

            if (passData.banner) {
                setPreviewBanner(passData.banner)
            }

            return {
                ...initMapForm(passData),
            }
        },
    })

    const [previewFeaturedImage, setPreviewFeaturedImage] = useState('')

    const [previewBanner, setPreviewBanner] = useState('')

    const { _handleChange } = useNestedFormHook(__formRequest, __setFormRequest)

    const _handleImageRemove = (name = '') => {
        __setFormRequest((prevState) => {
            const newState = { ...prevState }
            newState[name] = ''

            if (name === 'featuredImage') {
                setPreviewFeaturedImage('')
                if (__detailData.featuredImage === previewFeaturedImage) {
                    newState.deleteFeaturedImage = 1
                }
            }

            if (name === 'banner') {
                setPreviewBanner('')
                if (__detailData.banner === previewBanner) {
                    newState.deleteBanner = 1
                }
            }

            return newState
        })
    }

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDExCategoryRemove, false),
        },
    })

    return (
        <>
            <div className="row mb-4">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">Area</h5>
                </div>
                <div className="col-auto">
                    <BtnPrimary onClick={() => __actionAddModal()}>
                        Add New
                    </BtnPrimary>
                </div>
            </div>
            <FilterBarBasic
                formRequest={__search}
                searchTextPlaceholder="e.g D'Stars Fast Ferry"
                isDateRange={false}
                classNameWrap="pb-4"
                actions={{
                    change: __actionChange,
                    pagination: __actionPagination,
                    clear: __actionClear,
                }}
            />
            <div className="row overflow-y position-relative">
                <div className="col-md-12">
                    <TableThemeLogic
                        isLoading={__isLoading}
                        isNoWrap
                        ths={[
                            {
                                content: 'Area',
                                className: 'max-w-200px',
                            },
                            'Banner',
                            'Type',
                            'Description',
                            '',
                        ]}
                        tds={__list}>
                        {__list.map((vm, index) => {
                            return (
                                <tr
                                    key={index}
                                    title="Preview Detail"
                                    className="cursor-pointer">
                                    <td>
                                        <HDataImage src={vm.featuredImage}>
                                            <TblLineFirstPrimary
                                                value={vm?.name || ''}
                                            />
                                        </HDataImage>
                                    </td>
                                    <td>
                                        <BoxImage src={vm.banner} />
                                    </td>
                                    <td>
                                        <TblLineSecond>
                                            {vm?.type?.name || '-'}
                                        </TblLineSecond>
                                    </td>
                                    <td>
                                        {vm.description ? (
                                            <PreElement>
                                                {vm.description}
                                            </PreElement>
                                        ) : (
                                            '-'
                                        )}
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
                                                title="Edit Data"
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
                    id={MDExCategoryRemove}
                    configHandle={{
                        urlAPI: () =>
                            apiExperienceArea.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <ModalWithActionFormCRUDLogic
                    id={MDExCategoryAdd}
                    detail={__detailData}
                    title="Area"
                    isEdit={__isEdit}
                    formRequest={__formRequest}
                    actions={{
                        change: _handleChange,
                        toggleModal: __actionCloseModal,
                    }}
                    isUseDefaultInput={false}
                    externalForm={
                        <>
                            {/*{!isEmpty(listContactFormType) ? (*/}
                            <FormSelectOption
                                label="Form Type"
                                name="experienceTypeId"
                                required>
                                <option value="">- Select Form Type -</option>
                                {listType.map((vm, index) => (
                                    <option key={index} value={vm.id}>
                                        {vm.name}
                                    </option>
                                ))}
                            </FormSelectOption>
                            {/*) : null}*/}

                            <FormInput
                                label="Name"
                                name="name"
                                required
                                placeholder="e.g JUNGUTBATU"
                            />

                            <FormTextArea
                                label="Description"
                                name="description"
                                required
                                placeholder="e.g Nestled along a pristine stretch of coastline in Nusa Lembongan."
                            />

                            {previewFeaturedImage ? (
                                <>
                                    <div className="pb-3">
                                        <p className="mb-2 text-neutral-100">
                                            Featured Image
                                        </p>

                                        <PreviewFileModalLogic
                                            dataUrl={previewFeaturedImage?.toString()}
                                            dataBy="file"
                                            dataFile={previewFeaturedImage}
                                            isShowBtnRemove
                                            actions={{
                                                remove: () =>
                                                    _handleImageRemove(
                                                        'featuredImage',
                                                    ),
                                            }}
                                            classNameWidth="w-100 max-h-148px"
                                        />
                                    </div>
                                </>
                            ) : (
                                <FormUploadFile
                                    label="Featured Image"
                                    name="featuredImage"
                                    required
                                    isUseHook={false}
                                    isPreview={false}
                                    accept="image/*"
                                    actions={{
                                        onChange: (_, newFiles) => {
                                            const img = new Image()
                                            const objectUrl =
                                                URL.createObjectURL(newFiles)

                                            img.onload = () => {
                                                _handleChange(
                                                    'featuredImage',
                                                    newFiles,
                                                )
                                            }

                                            img.src = objectUrl
                                        },
                                        handleDataFiles: (newDataFiles) => {
                                            setPreviewFeaturedImage(
                                                newDataFiles.url,
                                            )
                                        },
                                    }}
                                />
                            )}

                            {/*Banner Image*/}
                            {previewBanner ? (
                                <>
                                    <div className="pb-3">
                                        <p className="mb-2 text-neutral-100">
                                            Banner Image
                                        </p>

                                        <PreviewFileModalLogic
                                            dataUrl={previewBanner?.toString()}
                                            dataBy="file"
                                            dataFile={previewBanner}
                                            isShowBtnRemove
                                            actions={{
                                                remove: () =>
                                                    _handleImageRemove(
                                                        'banner',
                                                    ),
                                            }}
                                            classNameWidth="w-100 max-h-148px"
                                        />
                                    </div>
                                </>
                            ) : (
                                <FormUploadFile
                                    label="Banner Image"
                                    name="banner"
                                    required
                                    isUseHook={false}
                                    isPreview={false}
                                    accept="image/*"
                                    actions={{
                                        onChange: (_, newFiles) => {
                                            const img = new Image()
                                            const objectUrl =
                                                URL.createObjectURL(newFiles)

                                            img.onload = () => {
                                                _handleChange(
                                                    'banner',
                                                    newFiles,
                                                )
                                            }

                                            img.src = objectUrl
                                        },
                                        handleDataFiles: (newDataFiles) => {
                                            setPreviewBanner(newDataFiles.url)
                                        },
                                    }}
                                />
                            )}
                        </>
                    }
                    configHandle={{
                        urlAPIAdd: () =>
                            apiExperienceArea.addWithData(__formRequest),
                        urlAPIUpdate: () => {
                            return apiExperienceArea.updateWithData(
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

export default TabExArea
