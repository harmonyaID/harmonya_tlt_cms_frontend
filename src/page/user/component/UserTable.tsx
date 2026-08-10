import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import { TblLineFirstPrimary, TblLineSecond, TblPointData } from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import { BtnCircleEdit, BtnCircleRemove, BtnCircleRestore, BtnCircleX } from '@/component/general/Button.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'

const UserTable = ({
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
        __handleChooseForPermission?: (data: any) => void
        __handleChooseForRole?: (data: any) => void
        __handleChooseForUpdatePW?: (data: any) => void
        __handleChooseForUpdateActivation?: (data: any) => void
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
                            'Full Name',
                            'Country',
                            'Address',
                            'Contact',
                            'Super Admin',
                            'Status',
                            '',
                        ]}
                        tds={__list}>
                        {__list.map((vm, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <TblLineFirstPrimary
                                            value={vm.fullName}
                                        />

                                        <TblPointData
                                            title="Gender"
                                            value={vm?.gender?.name || '-'}
                                        />
                                    </td>
                                    <td>
                                        <TblLineSecond>
                                            {vm?.country?.name || '-'}
                                        </TblLineSecond>
                                    </td>
                                    <td>
                                        <TblLineSecond>
                                            {vm?.address || '-'}
                                        </TblLineSecond>
                                    </td>
                                    <td>
                                        <TblPointData
                                            title="Email"
                                            value={vm.email || '-'}
                                        />
                                        <TblPointData
                                            title="Phone"
                                            value={vm.phone || '-'}
                                        />
                                    </td>
                                    <td>
                                        <TextTrueOrFalse
                                            value={vm.isSuperadmin}
                                        />
                                    </td>
                                    <td>
                                        <TextTrueOrFalse
                                            value={vm.isActive}
                                            textTrue="Active"
                                            textFalse="Not Active"
                                        />
                                    </td>
                                    <td>
                                        <div className="hstack gap-2 justify-content-end">
                                            {isTrash ? (
                                                <>
                                                    <BtnCircleX
                                                        actions={{
                                                            click: () => {
                                                                actions?.__handleChoosePermanentRemove(
                                                                    vm,
                                                                )
                                                            },
                                                        }}
                                                    />

                                                    <BtnCircleRestore
                                                        actions={{
                                                            click: () => {
                                                                actions?.__handleChooseRestore(
                                                                    vm,
                                                                )
                                                            },
                                                        }}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <div className="dropdown me-1">
                                                        <button
                                                            className="btn btn-outline-neutral-300 btn-sm dropdown-toggle"
                                                            type="button"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false">
                                                            Setting
                                                        </button>
                                                        <ul className="dropdown-menu p-2">
                                                            <li>
                                                                <button
                                                                    className="dropdown-item btn-sm"
                                                                    onClick={() =>
                                                                        actions?.__handleChooseForRole(
                                                                            vm,
                                                                        )
                                                                    }>
                                                                    Role
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="dropdown-item btn-sm"
                                                                    onClick={() =>
                                                                        actions?.__handleChooseForPermission(
                                                                            vm,
                                                                        )
                                                                    }>
                                                                    Permission
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="dropdown-item btn-sm"
                                                                    onClick={() =>
                                                                        actions?.__handleChooseForUpdatePW(
                                                                            vm,
                                                                        )
                                                                    }>
                                                                    Update
                                                                    Password
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="dropdown-item btn-sm"
                                                                    onClick={() =>
                                                                        actions?.__handleChooseForUpdateActivation(
                                                                            vm,
                                                                        )
                                                                    }>
                                                                    Change
                                                                    Activation
                                                                </button>
                                                            </li>
                                                            {/*<li>*/}
                                                            {/*    <button*/}
                                                            {/*        className="dropdown-item btn-sm"*/}
                                                            {/*        onClick={() =>*/}
                                                            {/*            _handleChooseForUpdateSuperAdmin(*/}
                                                            {/*                vm,*/}
                                                            {/*            )*/}
                                                            {/*        }>*/}
                                                            {/*        Change Super*/}
                                                            {/*        Admin*/}
                                                            {/*    </button>*/}
                                                            {/*</li>*/}
                                                        </ul>
                                                    </div>

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

export  default UserTable