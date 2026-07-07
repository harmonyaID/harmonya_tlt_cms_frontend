import {
    _shapeMethodGet,
    _shapeMethodPatch,
    _shapeMethodPost,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvStaffCRUD,
    SrvStaffAccessRoles,
    SrvStaffAccessPermissions,
    SrvStaffUpdatePassword,
    SrvStaffUpdateActivation,
    SrvStaffUpdateSuperAdmin,
} from '@/service/api/_staff.endPoint.ts'

export const apiStaff = { ..._shapeObjectMethodCRUD(SrvStaffCRUD) }

export const getPermissionStaff = (id: string | number) =>
    _shapeMethodGet(
        SrvStaffAccessPermissions(id),
        'tcSrvStaffAccessPermissions',
    )

export const updatePermissionStaff = (id: any, formRequest: any) =>
    _shapeMethodPost(SrvStaffAccessPermissions(id), formRequest)

export const updatePasswordStaff = (id: any, formRequest: any) =>
    _shapeMethodPatch(SrvStaffUpdatePassword(id), formRequest)

export const getRoleStaff = (
    id: any,
    passTC: string = 'tcSrvStaffAccessRoles',
) => _shapeMethodGet(SrvStaffAccessRoles(id), passTC)

export const updateRoleStaff = (id: any, formRequest: any) =>
    _shapeMethodPatch(SrvStaffUpdatePassword(id), formRequest)

export const updateActivationStaff = (id: any, formRequest: any) =>
    _shapeMethodPatch(SrvStaffUpdateActivation(id), formRequest)

export const updateSuperAdminStaff = (id: any, formRequest: any) =>
    _shapeMethodPatch(SrvStaffUpdateSuperAdmin(id), formRequest)
