import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import Image from 'rc-image'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
import { TblLineFirst, TblLineFirstPrimary, TblLineSecond } from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import { BtnCircleEdit, BtnCircleRemove } from '@/component/general/Button.tsx'
import TrashActionButtons from '@/common/dataFeature/trash/TrashActionButtons.tsx'

const PropertyTable = ({
    isTrash = false,
    __isLoading,
    __list,
    __pagination,
    actions,
}: {
    isTrash?: boolean
    __isLoading: boolean
    __list: any[]
    __pagination: any
    actions: {
        __handleToDetail?: (id) => void
        __handleChooseRemove?: (id) => void
        __handleToEdit?: (id) => void
        __actionPagination: (page, search?: any) => void
        __handleChoosePermanentRemove?: (data: any) => void
        __handleChooseRestore?: (data: any) => void
    }
}) => {
    return (
        <>
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
                                        actions?.__handleToDetail(vm.id)
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
                                            {isTrash ? (
                                                <TrashActionButtons
                                                    selected={vm}
                                                    actions={{
                                                        restore: actions?.__handleChooseRestore,
                                                        permanentRemove:actions?.__handleChoosePermanentRemove
                                                    }}
                                                />
                                            ) : (
                                                <>
                                                    <BtnCircleRemove
                                                        actions={{
                                                            remove: (e) => {
                                                                e.stopPropagation()
                                                                actions?.__handleChooseRemove(
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
                                                                actions?.__handleToEdit(
                                                                    vm.id,
                                                                )
                                                            },
                                                        }}
                                                    />
                                                </>
                                            )}
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
                    onMove={(step) => actions?.__actionPagination(step)}
                    className="mt-2"
                    pagination={configDefaultPagination(
                        __pagination,
                        'totalPage',
                    )}
                />
            ) : null}
        </>
    )
}

export default PropertyTable