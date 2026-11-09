import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import {
    TblLineFirstPrimary,
    TblLineSecond,
} from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import {
    MDPropertySettingAmenities,
    MDPropertySettingAmenitiesRemove,
    MDPSTabMediaPartnerAdd,
} from '@/config/modal.config.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import { apiAmenitiesCRUD } from '@/service/api/setting.api.ts'
import Image from 'rc-image'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
import { BtnCircleEdit } from '@/component/general/Button.tsx'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import { APIResponse } from '@/type/resultAPI.ts'
import { objectToFormData } from '@/helper/convertFormData.helper.ts'
import { useState } from 'react'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'

const initForm = {
    name: '',
    icon: '',
    deletedIcon: '',
    order: '',
    isPopular: false,
    isPublish: false,
}

const initMapForm = (passData) => ({
    name: passData?.name || '',
    icon: '',
    deletedIcon: '',
    order: passData?.order || '',
    isPopular: passData?.isPopular || false,
    isPublish: passData?.isPublish || false,
})

const TabAmenities = () => {
    const {
        __list,
        __isLoading,
        __search,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
        __actionChange,
        __actionClear,
    } = useDataListHook({
        urlAPI: apiAmenitiesCRUD.list,
        // advancedSearch: {
        //     page: 0,
        // },
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
        modalId: MDPropertySettingAmenities,
        modalRemoveId: MDPropertySettingAmenities + 'Remove',
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
                actionModal(MDPropertySettingAmenitiesRemove, false),
        },
    })

    const [previewIcon, setPreviewIcon] = useState()
    const [selected, setSelected] = useState<any>()

    const _handleUpdateSync = async (): Promise<APIResponse> => {
        const dataForm = await objectToFormData(__formRequest)
        return apiAmenitiesCRUD.updateWithData(__selectedId, dataForm)
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
            <div className="row mb-2">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">Amenities</h5>
                </div>
                <div className="col-auto">
                    {/*<BtnPrimary>Add New</BtnPrimary>*/}
                </div>
            </div>

            <FilterBarBasic
                formRequest={__search}
                searchTextPlaceholder="e.g D'Stars Fast Ferry"
                classNameWrap="pb-3"
                isDateRange={false}
                actions={{
                    change: __actionChange,
                    pagination: __actionPagination,
                    clear: __actionClear,
                }}
            />

            <div className="row overflow-y position-relative">
                <div className="col-md-12 table-responsive-md">
                    <TableThemeLogic
                        isLoading={__isLoading}
                        isNoWrap
                        ths={[
                            'Name',
                            'Order',
                            'Icon',
                            'Publish',
                            'Popular',
                            '',
                        ]}
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
                                        <TextTrueOrFalse value={vm.isPublish} />
                                    </td>
                                    <td>
                                        <TextTrueOrFalse value={vm.isPopular} />
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
                    id={MDPropertySettingAmenitiesRemove}
                    configHandle={{
                        urlAPI: () => apiAmenitiesCRUD.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <ModalWithActionFormCRUDLogic
                    id={MDPropertySettingAmenities}
                    detail={__detailData}
                    title="Amenities"
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

export default TabAmenities
