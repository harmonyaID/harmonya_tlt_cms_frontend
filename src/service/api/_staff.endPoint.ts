import { objectPathEndPointAPI } from '@/config/base/objectPath.config'
import { SrvWithFeature } from '@/service/api/type/config.type.ts'

const baseAPI: any = String(import.meta.env.VITE_BASE_API) + '/staffs'

export const SrvStaffCRUD: SrvWithFeature = objectPathEndPointAPI(baseAPI)

export const SrvStaffUpdatePassword = (id: string | number = ''): string =>
    baseAPI + '/staffs/' + id + '/password'

export const SrvStaffAccessRoles = (id: string | number = ''): string =>
    baseAPI + '/staffs/' + id + '/accesses/roles'

export const SrvStaffAccessPermissions = (id: string | number = ''): string =>
    baseAPI + '/staffs/' + id + '/accesses/permissions'

export const SrvStaffUpdateActivation = (id: string | number = '') =>
    baseAPI + '/staffs/' + id + '/activation'
