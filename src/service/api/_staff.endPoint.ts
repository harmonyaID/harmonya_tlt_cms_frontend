import { objectPathEndPointAPI } from '@/config/base/objectPath.config'
import { SrvWithFeature } from '@/service/api/type/config.type.ts'

const baseAPI: any = String(import.meta.env.VITE_BASE_API) + '/staffs'

export const SrvStaffCRUD = {
    ...objectPathEndPointAPI(baseAPI),
    trash: baseAPI + '/trash',
    trashWithId: (id: string|number) => baseAPI + '/trash/' + id,
    restore: (id: number|string) =>  baseAPI + '/trash/' + id,
}

export const SrvStaffUpdatePassword = (id: string | number = ''): string =>
    baseAPI + '/' + id + '/password'

export const SrvStaffAccessRoles = (id: string | number = ''): string =>
    baseAPI + '/' + id + '/accesses/roles'

export const SrvStaffAccessPermissions = (id: string | number = ''): string =>
    baseAPI + '/' + id + '/accesses/permissions'

export const SrvStaffUpdateActivation = (id: string | number = '') =>
    baseAPI + '/' + id + '/activation'

export const SrvStaffUpdateSuperAdmin = (id: string | number = '') =>
    baseAPI + '/' + id + '/superadmin'
