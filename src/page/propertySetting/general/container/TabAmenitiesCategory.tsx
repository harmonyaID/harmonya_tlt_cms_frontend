import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import {
    TblLineFirstPrimary,
    TblLineSecond,
} from '@/component/general/TablePartial.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import {
    MDPropertySettingAmenities,
    MDPropertySettingAmenitiesCategory,
    MDPropertySettingAmenitiesCategoryRemove,
} from '@/config/modal.config.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import {
    apiAmenitiesCategoryCRUD,
    apiAmenitiesCRUD,
} from '@/service/api/setting.api.ts'
import { useState } from 'react'
import { APIResponse } from '@/type/resultAPI.ts'
import { objectToFormData } from '@/helper/convertFormData.helper.ts'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import { BtnCircleEdit } from '@/component/general/Button.tsx'
import Image from 'rc-image'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'

const initForm = {
    name: '',
    icon: '',
    deletedIcon: '',
    order: '',
}

const initMapForm = (passData) => ({
    name: passData?.name || '',
    icon: '',
    deletedIcon: '',
    order: passData?.order || '',
})

const TabAmenitiesCategory = () => {
    const {
        __list,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
    } = useDataListHook({
        urlAPI: apiAmenitiesCategoryCRUD.list,
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
        modalId: MDPropertySettingAmenitiesCategory,
        modalRemoveId: MDPropertySettingAmenitiesCategory + 'Remove',
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
            nextStep: () =>
                actionModal(MDPropertySettingAmenitiesCategoryRemove, false),
        },
    })

    const [previewIcon, setPreviewIcon] = useState()

    const _handleUpdateSync = async (): Promise<APIResponse> => {
        const dataForm = await objectToFormData(__formRequest)
        return apiAmenitiesCategoryCRUD.updateWithData(__selectedId, dataForm)
    }

    const _handleRemoveIcon = () => {
        __setFormRequest((prev) => ({
            ...prev,
            icon: '',
            deletedIcon: previewIcon,
        }))
        setPreviewIcon(undefined)
    }

    const _handleEdit = (vm) => {
        __actionUpdateModal(vm)
        setPreviewIcon(vm.icon)
    }

    return (
        <>
            <div className="row mb-4">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">Amenities Category</h5>
                </div>
                <div className="col-auto">
                    {/*<BtnPrimary>Add New</BtnPrimary>*/}
                </div>
            </div>

            <div className="row overflow-y position-relative">
                <div className="col-md-12 table-responsive-md">
                    <TableThemeLogic
                        isLoading={__isLoading}
                        isNoWrap
                        ths={['Name', 'Order', 'Icon', '']}
                        tds={__list}>
                        {__list.map((vm, index) => {
                            return (
                                <tr
                                    key={index}
                                    title="Preview Detail"
                                    // className="cursor-pointer"
                                    onClick={() => {
                                        // _handleChooseDetail(vm)
                                    }}>
                                    <td>
                                        <TblLineFirstPrimary
                                            value={vm?.name || '-'}
                                            className="mb-1 fw-500"
                                            isUseDefaultMargin={false}
                                        />
                                    </td>
                                    <td>
                                        <TblLineSecond>
                                            {vm?.order || '-'}
                                        </TblLineSecond>
                                    </td>
                                    <td>
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="position-relative float-end">
                                                    <div className="overflow-hidden rounded position-relative">
                                                        <div
                                                            className="wp-img-preview"
                                                            onClick={() => {}}>
                                                            <Image
                                                                src={vm?.icon}
                                                                alt="Preview File"
                                                                fallback={
                                                                    ImgGeneralDefault
                                                                }
                                                                className="data-img data-img-contain avatar-46 object-fit-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="hstack gap-2 justify-content-end">
                                            {/*    <BtnCircleRemove*/}
                                            {/*        actions={{*/}
                                            {/*            remove: (e) => {*/}
                                            {/*                e.stopPropagation()*/}
                                            {/*                _handleChooseRemove(vm)*/}
                                            {/*            },*/}
                                            {/*        }}*/}
                                            {/*    />*/}

                                            <BtnCircleEdit
                                                title="Edit Data"
                                                actions={{
                                                    edit: (e) => {
                                                        e.stopPropagation()
                                                        _handleEdit(vm)
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
                    id={MDPropertySettingAmenitiesCategoryRemove}
                    configHandle={{
                        urlAPI: () =>
                            apiAmenitiesCategoryCRUD.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <ModalWithActionFormCRUDLogic
                    id={MDPropertySettingAmenitiesCategory}
                    detail={__detailData}
                    title="Amenities Category"
                    isEdit={__isEdit}
                    formRequest={__formRequest}
                    actions={{
                        change: _handleChange,
                        toggleModal: __actionCloseModal,
                    }}
                    isUseDefaultInput={false}
                    externalForm={
                        <>
                            {previewIcon ? (
                                <div className="my-3">
                                    <p className="mb-2 text-neutral-100">
                                        Icon
                                    </p>

                                    <PreviewFileModalLogic
                                        dataUrl={String(previewIcon)}
                                        dataBy="file"
                                        dataFile={previewIcon}
                                        isShowBtnRemove
                                        actions={{
                                            remove: () => _handleRemoveIcon(),
                                        }}
                                    />
                                </div>
                            ) : (
                                <FormUploadFile
                                    label="Icon"
                                    name="icon"
                                    isUseHook={false}
                                    isPreview={false}
                                    accept="image/*"
                                    actions={{
                                        onChange: (name, newFiles) => {
                                            const img = new window.Image()
                                            const objectUrl =
                                                URL.createObjectURL(newFiles)

                                            img.onload = () => {
                                                _handleChange('icon', newFiles)
                                            }

                                            img.src = objectUrl
                                        },

                                        handleDataFiles: (newDataFiles) =>
                                            setPreviewIcon(newDataFiles.url),
                                    }}
                                />
                            )}
                        </>
                    }
                    configHandle={{
                        urlAPIAdd: null,
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

export default TabAmenitiesCategory
