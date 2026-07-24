import CardListData from '@/component/card/CardListData.tsx'
import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import usePropertyMainHook from '@/page/property/hook/usePropertyMain.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { MDGeneralRemove } from '@/config/modal.config.ts'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import {
    TblLineFirst,
    TblLineFirstPrimary,
    TblLineSecond,
    TblPointData,
} from '@/component/general/TablePartial.tsx'
import { BadgeStatusGeneral } from '@/component/general/Badge.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import { apiProperty } from '@/service/api/property.api.ts'
import Image from 'rc-image'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'

const PropertyPage = () => {
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
    } = usePropertyMainHook()

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
                title="Property"
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
                                {
                                    content: 'Property',
                                    className: 'max-w-200px',
                                },
                                'Source Type',
                                'Unit Type',
                                'Occupancy',
                                'Cleaning Status',
                                'Status',
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
                                        <td className="col-3 max-w-200px">
                                            <div className="row gy-2">
                                                <div
                                                    className="col-auto"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }>
                                                    <div className="position-relative float-end">
                                                        <div className="overflow-hidden rounded position-relative">
                                                            <div
                                                                className="wp-img-preview"
                                                                onClick={() => {}}>
                                                                <Image
                                                                    src={
                                                                        vm?.coverPhoto
                                                                    }
                                                                    alt="Preview File"
                                                                    fallback={
                                                                        ImgGeneralDefault
                                                                    }
                                                                    className="data-img data-img-contain avatar-46"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9 px-0">
                                                    <div className="hstack flex-wrap gap-2 pb-2">
                                                        <TblLineFirstPrimary
                                                            value={vm.nickname}
                                                            isUseDefaultMargin={
                                                                false
                                                            }
                                                            className="mb-0 fw-600"
                                                        />

                                                        <div className="fs-12 py-0 px-2 rounded-pill bg-tint-500">
                                                            {vm?.type?.name}
                                                        </div>
                                                    </div>

                                                    <TblLineSecond>
                                                        {vm.address}
                                                    </TblLineSecond>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <TblLineFirst>
                                                {vm?.sourceType?.name}
                                            </TblLineFirst>
                                        </td>
                                        <td>
                                            <TblLineFirst>
                                                {vm?.unitType?.name}
                                            </TblLineFirst>
                                        </td>
                                        <td>
                                            <TblLineFirst>
                                                {vm?.occupancy || '-'}
                                            </TblLineFirst>
                                        </td>
                                        <td>
                                            <TblLineFirst>
                                                {vm?.cleaningStatus?.name ||
                                                    '-'}
                                            </TblLineFirst>
                                        </td>
                                        <td>
                                            <TextTrueOrFalse
                                                value={
                                                    vm?.status?.name ===
                                                    'Active'
                                                        ? true
                                                        : false
                                                }
                                            />
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
                        urlAPI: () => apiProperty.delete(dataForRemove.id),
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

export default PropertyPage
