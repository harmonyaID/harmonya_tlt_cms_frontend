import TrashActionButtons from '@/common/dataFeature/trash/TrashActionButtons.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import {
    BtnCircleDetail,
    BtnCircleEdit,
    BtnCircleRemove,
} from '@/component/general/Button.tsx'
import { BoxImage } from '@/component/general/Image.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import {
    TblLineFirst,
    TblLineFirstPrimary,
} from '@/component/general/TablePartial.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import { formatDateTimeByTlt } from '@/helper/actionFormatDate.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'

const PageTable = ({
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
                <div className="col-md-12">
                    <TableThemeLogic
                        isLoading={__isLoading}
                        isNoWrap
                        ths={['Title', 'Locale', 'Status', 'Created', '']}
                        tds={__list}>
                        {__list.map((vm, index) => {
                            return (
                                <tr
                                    key={index}
                                    title="Preview Detail"
                                    className={!isTrash && 'cursor-pointer'}
                                    onClick={() => {
                                        !isTrash &&
                                            actions?.__handleToDetail(vm.id)
                                    }}>
                                    <td>
                                        <TblLineFirstPrimary
                                            value={vm?.title || '-'}
                                        />
                                    </td>
                                    <td>
                                        <TblLineFirst>
                                            <span className="text-capitalize">
                                                {vm?.locale || '-'}
                                            </span>
                                        </TblLineFirst>
                                    </td>
                                    <td>
                                        <TblLineFirst>
                                            <span className="text-capitalize">
                                                {vm?.status || '-'}
                                            </span>
                                        </TblLineFirst>
                                    </td>
                                    <td>
                                        <TblLineFirst>
                                            {formatDateTimeByTlt(
                                                vm?.createdAt,
                                            ) || '-'}
                                        </TblLineFirst>
                                    </td>
                                    <td>
                                        <div className="hstack gap-2 justify-content-end">
                                            {isTrash ? (
                                                <TrashActionButtons
                                                    selected={vm}
                                                    actions={{
                                                        restore:
                                                            actions?.__handleChooseRestore,
                                                        permanentRemove:
                                                            actions?.__handleChoosePermanentRemove,
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

export default PageTable
