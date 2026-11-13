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
    MDPropertySettingAmenitiesCategoryRemove,
} from '@/config/modal.config.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import { apiAmenitiesCategoryCRUD } from '@/service/api/setting.api.ts'

const initForm = {
    name: '',
    icon: '',
    order: '',
}

const initMapForm = (passData) => ({
    name: passData?.name || '',
    icon: passData?.icon || '',
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
                actionModal(MDPropertySettingAmenitiesCategoryRemove, false),
        },
    })

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
                                        <TblLineSecond>
                                            {vm?.icon || '-'}
                                        </TblLineSecond>
                                    </td>
                                    <td>
                                        {/*<div className="hstack gap-2 justify-content-end">*/}
                                        {/*    <BtnCircleRemove*/}
                                        {/*        actions={{*/}
                                        {/*            remove: (e) => {*/}
                                        {/*                e.stopPropagation()*/}
                                        {/*                _handleChooseRemove(vm)*/}
                                        {/*            },*/}
                                        {/*        }}*/}
                                        {/*    />*/}

                                        {/*    <BtnCircleEdit*/}
                                        {/*        title="Edit Data"*/}
                                        {/*        actions={{*/}
                                        {/*            edit: (e) => {*/}
                                        {/*                e.stopPropagation()*/}
                                        {/*                // actions.edit(vm.id)*/}
                                        {/*            },*/}
                                        {/*        }}*/}
                                        {/*    />*/}
                                        {/*</div>*/}
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
            </CreatePortalLayout>
        </>
    )
}

export default TabAmenitiesCategory
