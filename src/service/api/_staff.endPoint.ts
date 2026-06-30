import { objectPathEndPointAPI } from '@/config/base/objectPath.config'
import { SrvWithFeature } from '@/service/api/type/config.type.ts'

const baseAPI: any = String(import.meta.env.VITE_BASE_API) + '/staffs'

export const SrvStaffCRUD: SrvWithFeature = objectPathEndPointAPI(baseAPI)
