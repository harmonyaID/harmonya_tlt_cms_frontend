import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import { TblLineFirst } from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import {
    BtnCircleDetail,
    BtnCircleEdit,
    BtnCircleRemove,
} from '@/component/general/Button.tsx'
import actionOffCanvas from '@/helper/actionOffCanvas.helper.ts'
import { OCContactFormCRUD } from '@/config/offCanvas.config.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import TrashActionButtons from '@/common/dataFeature/trash/TrashActionButtons.tsx'

const ContactFormTable = ({
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
        __handleChooseRemove?: (id) => void
        __actionUpdateModal?: (id) => void
        __handleChooseDetail?: (vm) => void
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
                            'Form Type',
                            'Phone',
                            'Email',
                            // 'Contact Info.',
                            // { content: 'FAQ', className: 'w-75' },
                            'Subject',
                            'Read',
                            '',
                        ]}
                        tds={__list}>
                        {__list
                            .sort((a, b) => Number(a.order) - Number(b.order))
                            .map((vm, index) => {
                                return (
                                    <tr key={index}>
                                        <td scope="row" className="max-w-200px">
                                            <TblLineFirst
                                                value={vm.name || '-'}
                                            />
                                        </td>
                                        <td>
                                            <TblLineFirst
                                                value={
                                                    vm?.formType?.name || '-'
                                                }
                                            />
                                        </td>
                                        <td>
                                            <TblLineFirst
                                                value={vm.phone || '-'}
                                            />
                                        </td>
                                        <td>
                                            <TblLineFirst
                                                value={vm.email || '-'}
                                            />
                                        </td>
                                        <td>
                                            <TblLineFirst
                                                value={vm.subject || '-'}
                                            />
                                        </td>
                                        <td>
                                            <TextTrueOrFalse
                                                value={vm.isRead}
                                            />
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
                                                                    actions.__handleChooseRemove(
                                                                        vm,
                                                                    )
                                                                },
                                                            }}
                                                        />
                                                        <BtnCircleEdit
                                                            actions={{
                                                                edit: (e) => {
                                                                    e.stopPropagation()
                                                                    actions.__actionUpdateModal(
                                                                        vm,
                                                                    )
                                                                    actionOffCanvas(
                                                                        OCContactFormCRUD,
                                                                    )
                                                                },
                                                            }}
                                                        />
                                                        <BtnCircleDetail
                                                            actions={{
                                                                onClick: (
                                                                    e,
                                                                ) => {
                                                                    e.stopPropagation()
                                                                    actions.__handleChooseDetail(
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
                    onMove={(step) => actions.__actionPagination(step)}
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

export default ContactFormTable
