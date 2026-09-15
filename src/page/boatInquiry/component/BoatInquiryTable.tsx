import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import {
    TblLineFirstPrimary,
    TblLineSecond,
    TblPointData,
} from '@/component/general/TablePartial.tsx'
import { BoxImage } from '@/component/general/Image.tsx'
import {
    BtnCircleDetail,
    BtnCircleEdit,
    BtnCircleRemove,
} from '@/component/general/Button.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import TrashActionButtons from '@/common/dataFeature/trash/TrashActionButtons.tsx'
import { BadgeStatusGeneral } from '@/component/general/Badge.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import BoatInquiryStatus from '@/page/boatInquiry/component/BoatInquiryStatus.tsx'

const BoatInquiryTable = ({
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
        __handleRead?: (id) => void
        __handleUpdateStatus?: (id) => void
        __actionPagination: (page, search?: any) => void
        __handleChoosePermanentRemove?: (data: any) => void
        __handleChooseRestore?: (data: any) => void
        __handleChooseDetail?: (data: any) => void
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
                            'Name',
                            'Boat',
                            'Ticket Info',
                            'Departure',
                            'Status',
                            'Read',
                            '',
                        ]}
                        tds={__list}>
                        {__list.map((vm, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <TblLineFirstPrimary
                                            value={vm?.name || ''}
                                        />
                                        <TblLineSecond>
                                            {vm?.email || '-'}
                                        </TblLineSecond>
                                    </td>
                                    <td>
                                        <TblLineSecond>
                                            {vm?.boat?.name || '-'}
                                        </TblLineSecond>
                                    </td>
                                    <td>
                                        <TblPointData
                                            title="Type"
                                            value={vm?.ticketType}
                                            className="mb-2"
                                        />
                                        {vm.adultCount > 0 && (
                                            <TblPointData
                                                title="Adult"
                                                value={`${vm?.adultCount} Person`}
                                                className="mb-2"
                                            />
                                        )}
                                        {vm.childCount > 0 && (
                                            <TblPointData
                                                title="Child"
                                                value={`${vm?.childCount} Person`}
                                                className="mb-2"
                                            />
                                        )}
                                        {vm.infantCount > 0 && (
                                            <TblPointData
                                                title="Infant"
                                                value={`${vm?.infantCount} Person`}
                                                className="mb-2"
                                            />
                                        )}
                                    </td>
                                    <td>
                                        <TblPointData
                                            title="From Bali"
                                            value={vm?.departureDateFromBali}
                                            className="mb-2"
                                        />
                                        <TblPointData
                                            title="From Lembongan"
                                            value={
                                                vm?.departureDateFromLembongan
                                            }
                                            className="my-2"
                                        />
                                    </td>
                                    <td>
                                        <div className="hstack gap-2">
                                            <BoatInquiryStatus
                                                status={vm?.status}
                                            />
                                            {vm?.status?.id !== 3 && (
                                                <BtnCircleEdit
                                                    title="Edit Data"
                                                    actions={{
                                                        edit: (e) => {
                                                            e.stopPropagation()
                                                            actions?.__handleUpdateStatus(
                                                                vm.id,
                                                            )
                                                        },
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="hstack gap-2">
                                            <TextTrueOrFalse
                                                value={vm?.isRead}
                                            />
                                            {!vm.isRead && (
                                                <BtnCircleEdit
                                                    title="Edit Data"
                                                    actions={{
                                                        edit: (e) => {
                                                            e.stopPropagation()
                                                            actions?.__handleRead(
                                                                vm.id,
                                                            )
                                                        },
                                                    }}
                                                />
                                            )}
                                        </div>
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

                                                    <BtnCircleDetail
                                                        actions={{
                                                            onClick: (e) => {
                                                                e.stopPropagation()
                                                                actions?.__handleChooseDetail(
                                                                    vm,
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

export default BoatInquiryTable
