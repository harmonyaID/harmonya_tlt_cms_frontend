import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import { TblLineFirstPrimary, TblPointData } from '@/component/general/TablePartial.tsx'
import { BadgeStatusGeneral } from '@/component/general/Badge.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import { formatDateTimeByTlt } from '@/helper/actionFormatDate.helper.ts'
import { BtnCircleEdit, BtnCircleRemove } from '@/component/general/Button.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import TrashActionButtons from '@/common/dataFeature/trash/TrashActionButtons.tsx'

const ContentExperienceTable = ({
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
                            'Name',
                            'Info.',
                            'Contact',
                            'Status Active',
                            'Created',
                            '',
                        ]}
                        tds={__list}>
                        {__list.map((vm, index) => {
                            return (
                                <tr
                                    key={index}
                                    title="Preview Detail"
                                    className={!isTrash && 'cursor-pointer'}
                                    onClick={() => {
                                        !isTrash && actions?.__handleToDetail(vm.id)
                                    }}>
                                    <td>
                                        <TblLineFirstPrimary
                                            value={vm?.name || '-'}
                                        />

                                        <TblPointData title="Area">
                                            <BadgeStatusGeneral
                                                value={vm?.area?.name || '-'}
                                                className="text-bg-neutral-300 fw-normal"
                                            />
                                        </TblPointData>
                                    </td>
                                    <td>
                                        <TblPointData title="Open Hours">
                                            {vm?.openHours || '-'}
                                        </TblPointData>

                                        <TblPointData title="Type">
                                            <BadgeStatusGeneral
                                                value={vm?.type?.name || '-'}
                                                className="text-bg-neutral-300 fw-normal"
                                            />
                                        </TblPointData>
                                    </td>

                                    <td>
                                        <TblPointData title="Instagram">
                                            {vm?.instagram || '-'}
                                        </TblPointData>

                                        <TblPointData title="Whatsapp">
                                            {vm?.whatsapp || '-'}
                                        </TblPointData>
                                    </td>

                                    <td>
                                        <TextTrueOrFalse value={vm.isActive} />
                                    </td>
                                    <td>
                                        <TblPointData title="Create At">
                                            {formatDateTimeByTlt(vm?.createdAt)}
                                        </TblPointData>
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

export default ContentExperienceTable