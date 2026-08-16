import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import { BtnDanger, BtnPrimary } from '@/component/general/Button.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import {
    MDSUserSettingPermission,
    MDSUserSettingRole,
    MDSUserUpdatePassword,
    MDUserRemove,
    MDUserUpdateActivation,
    MDUserUpdateSuperAdmin,
} from '@/config/modal.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
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
import UserTable from '@/page/user/component/UserTable.tsx'
import moment from 'moment'
import UserFilter from '@/page/user/component/UserFilter.tsx'

const UserPage = () => {
    const {
        __list,
        __isLoading,
        __pagination,
        __search,
        __isUseSearch,
        __actionPagination,
        __setSearch,
        __actionSetIsUseSearch,
        __actionRemove,
        __actionUpdate,
        __actionChange,
        __actionClear,
    } = useDataListHook({
        urlAPI: apiStaff.list,
        advancedSearch: {
            fromDate: moment().subtract({ months: 1 }).format('DD/MM/YYYY'),
            toDate: moment().format('DD/MM/YYYY'),
            roleIds: [],
            limit: 50,
        },
    })

    const { __handleToAdd, __handleToEdit, __handleToTrash } =
        usePageFlowHandlerHook({
            basePath: userPath,
            pathFromKey: userPath.main,
            search: __search,
            isUseSearch: __isUseSearch,
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
                    <div className="hstack gap-2">
                        <BtnDanger isOutline handle={() => __handleToTrash()}>
                            Trash
                        </BtnDanger>
                        <BtnPrimary onClick={() => __handleToAdd()}>
                            Add New
                        </BtnPrimary>
                    </div>
                }>
                <UserFilter
                    __isLoading={__isLoading}
                    __search={__search}
                    actions={{
                        __setSearch,
                        __actionClear,
                        __actionSetIsUseSearch,
                        __actionChange,
                        __actionPagination,
                    }}
                />

                <UserTable
                    __list={__list}
                    __isLoading={__isLoading}
                    __pagination={__pagination}
                    actions={{
                        __actionPagination: __actionPagination,
                        __handleChooseForUpdateActivation:
                            _handleChooseForUpdateActivation,
                        __handleChooseForPermission: _handleChooseForPermission,
                        __handleChooseForRole: _handleChooseForRole,
                        __handleChooseForUpdatePW: _handleChooseForUpdatePW,
                        __handleToEdit: __handleToEdit,
                        __handleChooseRemove: _handleChooseRemove,
                    }}
                />
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
