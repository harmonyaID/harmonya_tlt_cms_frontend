import {
    _shapeMethodGet,
    _shapeMethodPost,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvStaffCRUD,
    SrvStaffAccessRoles,
    SrvStaffAccessPermissions,
} from '@/service/api/_staff.endPoint.ts'

export const apiStaff = { ..._shapeObjectMethodCRUD(SrvStaffCRUD) }

export const getPermissionStaff = (id: string | number) =>
    _shapeMethodGet(
        SrvStaffAccessPermissions(id),
        'tcSrvStaffAccessPermissions',
    )

export const updatePermissionStaff = (id: any, formRequest: any) =>
    _shapeMethodPost(SrvStaffAccessPermissions(id), formRequest)
