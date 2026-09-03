import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import { TblLineFirstPrimary, TblLineSecond, TblPointData } from '@/component/general/TablePartial.tsx'
import HyperLink from '@/component/general/HyperLink.tsx'
import contentExperiencePath from '@/path/contentExperience.path.ts'
import { formatDateByTlt, formatDateTimeByTlt } from '@/helper/actionFormatDate.helper.ts'
import { viewData } from '@/helper/condition.helper.ts'
import { BadgeStatusGeneral } from '@/component/general/Badge.tsx'
import { BtnCircleDetail, BtnCircleRemove } from '@/component/general/Button.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import TrashActionButtons from '@/common/dataFeature/trash/TrashActionButtons.tsx'

const ExpInquiryFormTable = ({
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
        __handleChooseDetail?: (vm: any) => void
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
                        ths={[
                            'Full Name',
                            'Email',
                            'Phone',
                            'Event Date',
                            'Total Guest',
                            'Status',
                            'Created',
                            '',
                        ]}
                        tds={__list}>
                        {__list.map((vm, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <TblLineFirstPrimary
                                            value={vm?.fullName || ''}
                                        />
                                        <TblPointData title="Experience">
                                            {vm?.experience?.name ? (
                                                <HyperLink
                                                    isOpenNewTab
                                                    className="fs-13"
                                                    url={contentExperiencePath.detail(
                                                        vm.experience.id || '#',
                                                    )}>
                                                    {vm.experience.name}
                                                </HyperLink>
                                            ) : (
                                                '-'
                                            )}
                                        </TblPointData>
                                    </td>
                                    <td>
                                        <TblLineSecond
                                            value={vm?.email || '-'}
                                        />
                                    </td>
                                    <td>
                                        <TblLineSecond
                                            value={vm?.phone || '-'}
                                        />
                                    </td>
                                    <td>
                                        <TblLineSecond>
                                            {formatDateByTlt(vm?.eventDate)}
                                        </TblLineSecond>
                                    </td>
                                    <td>
                                        <TblLineSecond>
                                            {viewData(
                                                vm?.totalGuests.toString(),
                                            )}
                                        </TblLineSecond>
                                    </td>
                                    <td>
                                        {vm?.status?.name ? (
                                            <BadgeStatusGeneral
                                                value={vm?.status.name}
                                                className="bg-neutral-300"
                                                inTable
                                            />
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td>
                                        <TblLineSecond>
                                            {formatDateTimeByTlt(vm?.createdAt)}
                                        </TblLineSecond>
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
                                                                actions?.__handleChooseRemove(vm)
                                                            },
                                                        }}
                                                    />

                                                    {/*<BtnCircleEdit*/}
                                                    {/*    title="Edit Data"*/}
                                                    {/*    actions={{*/}
                                                    {/*        edit: (e) => {*/}
                                                    {/*            e.stopPropagation()*/}
                                                    {/*            __handleToEdit(*/}
                                                    {/*                vm.id,*/}
                                                    {/*            )*/}
                                                    {/*        },*/}
                                                    {/*    }}*/}
                                                    {/*/>*/}

                                                    <BtnCircleDetail
                                                        actions={{
                                                            onClick: (e) => {
                                                                e.stopPropagation()
                                                                actions?.__handleChooseDetail(vm)
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

export default ExpInquiryFormTable