import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import { BtnCircleEdit } from '@/component/general/Button.tsx'
import { BoxImage } from '@/component/general/Image.tsx'
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
} from '@/config/modal.config.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import { apiAmenitiesCRUD } from '@/service/api/setting.api.ts'

const initForm = {
    name: '',
    icon: '',
    order: '',
    isPopular: false,
    isPublish: false,
}

const initMapForm = (passData) => ({
    name: passData?.name || '',
    icon: passData?.icon || '',
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

    console.log('__formRequest: ', __formRequest)

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
                                    <td className="w-20">
                                        {vm.icon ? (
                                            <BoxImage src={vm.icon} />
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td>
                                        <TextTrueOrFalse value={vm.isPublish} />
                                    </td>
                                    <td>
                                        <TextTrueOrFalse value={vm.isPopular} />
                                    </td>
                                    <td>
                                        <div className="hstack gap-2 justify-content-end">
                                            {/*<BtnCircleRemove*/}
                                            {/*    actions={{*/}
                                            {/*        remove: (e) => {*/}
                                            {/*            e.stopPropagation()*/}
                                            {/*            _handleChooseRemove(vm)*/}
                                            {/*        },*/}
                                            {/*    }}*/}
                                            {/*/>*/}

                                            <BtnCircleEdit
                                                title="Edit Data"
                                                actions={{
                                                    edit: (e) => {
                                                        e.stopPropagation()
                                                        __actionUpdateModal({
                                                            ...vm,
                                                            order:
                                                                vm.order ||
                                                                index + 1,
                                                        })
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
                    title="Icon"
                    isEdit
                    formRequest={__formRequest}
                    isUseDefaultInput={false}
                    actions={{
                        change: _handleChange,
                        toggleModal: () => {
                            __actionCloseModal()
                        },
                    }}
                    externalForm={
                        <>
                            <FormUploadFile name="icon" accept="image/*" />
                        </>
                    }
                    configHandle={{
                        urlAPIUpdate: () =>
                            apiAmenitiesCRUD.updateWithData(
                                __selectedId,
                                __formRequest,
                            ),
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
