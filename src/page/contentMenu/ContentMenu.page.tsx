import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import { BadgeStatusGeneral } from '@/component/general/Badge.tsx'
import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import {
    TblLineFirstPrimary,
    TblLineSecond,
    TblPointData,
} from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import { MDGeneralRemove } from '@/config/modal.config.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import { formatDateTimeByTlt } from '@/helper/actionFormatDate.helper.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useContentMenuHook from '@/page/contentMenu/hook/useContentMenu.hook.ts'
import { apiBlogContent, apiMenu } from '@/service/api/contentManage.api.ts'

const ContentMenuPage = () => {
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
    } = useContentMenuHook()

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
                title="Menu"
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
                                'Title',
                                'Locale',
                                // 'Menu Item',
                                'Created',
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
                                                value={vm?.title || '-'}
                                            />
                                        </td>
                                        <td>
                                            <TblLineSecond>
                                                {vm.locale || '-'}
                                            </TblLineSecond>
                                        </td>
                                        {/*<td>*/}
                                        {/*    <div className="d-inline-flex gap-2">*/}
                                        {/*        {vm?.tags?.map((tag, index) => (*/}
                                        {/*            <BadgeStatusGeneral*/}
                                        {/*                value={tag?.name || '-'}*/}
                                        {/*                className="text-bg-neutral-400 fw-normal"*/}
                                        {/*                key={index}*/}
                                        {/*            />*/}
                                        {/*        )) || '-'}*/}
                                        {/*    </div>*/}
                                        {/*</td>*/}
                                        <td>
                                            <TblLineSecond>
                                                {formatDateTimeByTlt(
                                                    vm?.createdAt,
                                                )}
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
                        urlAPI: () => apiMenu.delete(dataForRemove.id),
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

export default ContentMenuPage
