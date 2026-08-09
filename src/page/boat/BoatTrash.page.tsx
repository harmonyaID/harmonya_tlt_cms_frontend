import useBoatMain from '@/page/boat/hook/useBoatMain.hook.ts'
import CardListData from '@/component/card/CardListData.tsx'
import {
    BtnCircleRestore, BtnCircleX,
    BtnInfo,
} from '@/component/general/Button.tsx'
import {
    TblLineFirst,
    TblLineFirstPrimary,
    TblLineSecond,
} from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import { apiBoat } from '@/service/api/boatManage.api.ts'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import useTrash from '@/common/dataFeature/trash/hook/useTrash.ts'
import TrashConfirmModals from '@/common/dataFeature/trash/TrashConfirmModals.tsx'

const BoatTrashPage = () => {
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
        __handleToMain
    } = useBoatMain({ urlAPI: apiBoat.trash })


    const {
        __isLoadingTrash,
        __handlePermanentRemove,
        __handleChooseRestore,
        __handleRestore,
        __handleChoosePermanentRemove,
        __dataPermanentRemove,
        __dataRestore,
    } = useTrash({
        urlAPIRestore: apiBoat.restore,
        urlAPIPermanentRemove: apiBoat.permanentDelete,
        actions:{
            onSuccess: (boat) => __actionRemove(boat.id),
        }
    })

    return (
        <>
            <CardListData
                title="Boat Trash"
                componentAction={
                    <div className="hstack gap-3">
                        <BtnInfo isOutline onClick={() => __handleToMain()}>
                            Back
                        </BtnInfo>
                    </div>
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
                                'Name',
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
                                    <tr key={index} title="Preview Detail">
                                        <td>
                                            <TblLineFirstPrimary
                                                value={vm?.name}
                                            />
                                        </td>
                                        <td>
                                            <TblLineFirst
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
                                                <BtnCircleX
                                                    actions={{
                                                        click: () => {
                                                            __handleChoosePermanentRemove(
                                                                vm,
                                                            )
                                                        },
                                                    }}
                                                />

                                                <BtnCircleRestore
                                                    actions={{
                                                        click: () => {
                                                            __handleChooseRestore(
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
            </CardListData>

            <CreatePortalLayout>
                <TrashConfirmModals
                    name={__dataRestore?.name  || __dataPermanentRemove?.name}
                    isLoading={__isLoadingTrash}
                    actions={{
                        handleRestore: __handleRestore,
                        handlePermanentRemove: __handlePermanentRemove
                    }}
                />
            </CreatePortalLayout>
        </>
    )
}

export default BoatTrashPage
