import {
    _shapeMethodDel,
    _shapeMethodGet, _shapeMethodGetSearch,
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
    SrvStaffTrash,
    SrvStaffTrashWithId,
    SrvStaffRestore,
} from '@/service/api/_staff.endPoint.ts'

export const apiStaff = { ..._shapeObjectMethodCRUD(SrvStaffCRUD) }

export const getStaffTrash = (search: any) =>
    _shapeMethodGetSearch(SrvStaffTrash, search)

export const permanentDeleteStaff = (id: string | number) =>
    _shapeMethodDel(SrvStaffTrashWithId(id))

export const restoreStaff = (id: string | number) =>
    _shapeMethodPost(SrvStaffRestore(id))

export const updatePasswordStaff = (id: any, formRequest: any) =>
    _shapeMethodPatch(SrvStaffUpdatePassword(id), formRequest)

export const getPermissionStaff = (id: string | number) =>
    _shapeMethodGet(
        SrvStaffAccessPermissions(id),
        'tcSrvStaffAccessPermissions',
    )

export const updatePermissionStaff = (id: any, formRequest: any) =>
    _shapeMethodPost(SrvStaffAccessPermissions(id), formRequest)

export const getRoleStaff = (
    id: any,
    passTC: string = 'tcSrvStaffAccessRoles',
) => _shapeMethodGet(SrvStaffAccessRoles(id), passTC)

export const updateRoleStaff = (id: any, formRequest: any) =>
    _shapeMethodPost(SrvStaffAccessRoles(id), formRequest)

export const updateActivationStaff = (id: any, formRequest: any) =>
    _shapeMethodPatch(SrvStaffUpdateActivation(id), formRequest)

export const updateSuperAdminStaff = (id: any, formRequest: any) =>
    _shapeMethodPatch(SrvStaffUpdateSuperAdmin(id), formRequest)
