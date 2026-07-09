import useBoatMain from '@/page/boat/hook/useBoatMain.hook.ts'
import CardListData from '@/component/card/CardListData.tsx'
import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import {
    TblLineFirstPrimary,
    TblLineSecond,
    TblPointData,
} from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { MDGeneralRemove } from '@/config/modal.config.ts'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import { apiBoat } from '@/service/api/boatManage.api.ts'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'

const BoatPage = () => {
    const {
        // ---- List Data ----
        __list,
        __isLoading,
        __pagination,
        __search,
        __actionPagination,
        __actionRemove,
        __actionChange,
        __actionClear,

        // ---- Change Page ----
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
    } = useBoatMain()

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDGeneralRemove, false),
        },
    })

    return (
        <>
            <CardListData
                title="Boat"
                componentAction={
                    <BtnPrimary onClick={() => __handleToAdd()}>
                        Add New
                    </BtnPrimary>
                }>
                <FilterBarBasic
                    formRequest={__search}
                    searchTextPlaceholder="e.g D'Stars Fast Ferry"
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
                                'Boat Type',
                                'Total Photos',
                                'Total Promo Photos',
                                'Status Active',
                                'Created At',
                                '',
                            ]}
                            tds={__list}>
                            {__list.map((vm, index) => {
                                return (
                                    <tr
                                        key={index}
                                        title="Preview Detail"
                                        className="cursor-pointer"
                                        onClick={() => {
                                            __handleToDetail(vm.id)
                                        }}>
                                        <td>
                                            <TblLineFirstPrimary
                                                value={
                                                    vm?.boatComponentTypeName
                                                }
                                            />
                                        </td>
                                        <td>
                                            <TblLineSecond>
                                                {vm?.photos.length || '-'}
                                            </TblLineSecond>
                                        </td>
                                        <td>
                                            <TblLineSecond>
                                                {vm?.promoPhotos.length || '-'}
                                            </TblLineSecond>
                                        </td>

                                        <td>
                                            <TextTrueOrFalse
                                                value={vm.isActive}
                                            />
                                        </td>
                                        <td>
                                            <TblLineSecond>
                                                {vm?.createdAt || '-'}
                                            </TblLineSecond>
                                        </td>
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
                                                    title="Edit Data"
                                                    actions={{
                                                        edit: (e) => {
                                                            e.stopPropagation()
                                                            __handleToEdit(
                                                                vm.id,
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
            </CardListData>

            <CreatePortalLayout>
                <ConfirmRemoveListLogic
                    id={MDGeneralRemove}
                    configHandle={{
                        urlAPI: () => apiBoat.delete(dataForRemove.id),
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

export default BoatPage
