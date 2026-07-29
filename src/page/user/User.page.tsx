import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
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
import {
    MDSUserSettingPermission,
    MDSUserSettingRole,
    MDSUserUpdatePassword,
    MDUserRemove,
    MDUserUpdateActivation,
    MDUserUpdateSuperAdmin,
} from '@/config/modal.config.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import UserModalSettingPermission from '@/page/user/container/UserModalSettingPermission.tsx'
import UserModalSettingRole from '@/page/user/container/UserModalSettingRole.tsx'
import UserModalUpdateActivation from '@/page/user/container/UserModalUpdateActivation.tsx'
import UserModalUpdatePassword from '@/page/user/container/UserModalUpdatePassword.tsx'
import UserModalUpdateSuperAdmin from '@/page/user/container/UserModalUpdateSuperAdmin.tsx'
import userPath from '@/path/user.path.ts'
import { apiStaff } from '@/service/api/staff.api.ts'

const UserPage = () => {
    const {
        __list,
        __isLoading,
        __pagination,
        __search,
        __actionPagination,
        __actionRemove,
        __actionUpdate,
        __actionChange,
        __actionClear,
    } = useDataListHook({
        urlAPI: apiStaff.list,
        advancedSearch: {
            page: 1,
            limit: 10,
            typeIds: [],
            categoryIds: [],
        },
    })

    const { __handleToAdd, __handleToEdit } = usePageFlowHandlerHook({
        basePath: userPath,
        pathFromKey: 'user-main',
    })

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDUserRemove, false),
        },
    })

    const {
        __data: dataForPermission,
        __handleChooseAndNextStep: _handleChooseForPermission,
        __setData: _handleSetDataForPermission,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDSUserSettingPermission, false),
        },
    })

    const {
        __data: dataForRole,
        __handleChooseAndNextStep: _handleChooseForRole,
        __setData: _handleSetDataForRole,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDSUserSettingRole, false),
        },
    })

    const {
        __data: dataForUpdatePW,
        __handleChooseAndNextStep: _handleChooseForUpdatePW,
        __setData: _handleSetDataForUpdatePW,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDSUserUpdatePassword, false),
        },
    })

    const {
        __data: dataForUpdateActivation,
        __handleChooseAndNextStep: _handleChooseForUpdateActivation,
        __setData: _handleSetDataForUpdateActivation,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDUserUpdateActivation, false),
        },
    })

    const {
        __data: dataForUpdateSuperAdmin,
        __handleChooseAndNextStep: _handleChooseForUpdateSuperAdmin,
        __setData: _handleSetDataForUpdateSuperAdmin,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDUserUpdateSuperAdmin, false),
        },
    })

    return (
        <>
            <CardListData
                title="Staff"
                componentAction={
                    <BtnPrimary onClick={() => __handleToAdd()}>
                        Add New
                    </BtnPrimary>
                }>
                <FilterBarBasic
                    formRequest={__search}
                    searchTextPlaceholder="e.g Arbi TLT"
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
                                                                    _handleChooseForRole(
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
                                                                    _handleChooseForPermission(
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
                                                                    _handleChooseForUpdatePW(
                                                                        vm,
                                                                    )
                                                                }>
                                                                Update Password
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                className="dropdown-item btn-sm"
                                                                onClick={() =>
                                                                    _handleChooseForUpdateActivation(
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
                    id={MDUserRemove}
                    configHandle={{
                        urlAPI: () => apiStaff.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <UserModalUpdateActivation
                    dataDetail={dataForUpdateActivation}
                    actions={{
                        callBack: (passNewData) => __actionUpdate(passNewData),
                        clearSelected: () =>
                            _handleSetDataForUpdateActivation({}),
                    }}
                />

                <UserModalUpdateSuperAdmin
                    dataDetail={dataForUpdateSuperAdmin}
                    actions={{
                        callBack: (passNewData) => __actionUpdate(passNewData),
                        clearSelected: () =>
                            _handleSetDataForUpdateSuperAdmin({}),
                    }}
                />

                <UserModalSettingPermission
                    dataDetail={dataForPermission}
                    keyLabel="display"
                    actions={{
                        clearSelected: () => _handleSetDataForPermission({}),
                    }}
                />

                <UserModalSettingRole
                    dataDetail={dataForRole}
                    actions={{
                        clearSelected: () => _handleSetDataForRole({}),
                    }}
                />

                <UserModalUpdatePassword
                    dataDetail={dataForUpdatePW}
                    actions={{
                        clearSelected: () => _handleSetDataForUpdatePW({}),
                    }}
                />
            </CreatePortalLayout>
        </>
    )
}

export default UserPage
