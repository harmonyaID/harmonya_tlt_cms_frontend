import { objectPathEndPointAPI } from '@/config/base/objectPath.config'
import { SrvWithFeature } from '@/service/api/type/config.type.ts'

const baseAPI: any = String(import.meta.env.VITE_BASE_API)

// Web Config
export const SrvWebConfig = baseAPI + '/configurations/website'

export const SrvWebConfigUpdate = (id) => SrvWebConfig + '/' + id + '/update'

// Log Activities
export const SrvLogActivity = baseAPI + '/activities'

export const SrvLogActivitySettingAction =
    baseAPI + '/activities/settings/action'

export const SrvLogActivitySettingType = baseAPI + '/activities/settings/type'
