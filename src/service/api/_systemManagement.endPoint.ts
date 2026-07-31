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

// Platform Information
export const SrvSystemInfo = baseAPI + '/system/information'

// Platform Information Cache
export const SrvSystemInfoCacheClear = baseAPI + '/system/cache/clear'

export const SrvSystemInfoCacheConfigClear =
    baseAPI + '/system/cache/config-clear'

export const SrvSystemInfoCacheOptimize = baseAPI + '/system/cache/optimize'

export const SrvSystemInfoCacheOptimizeClear =
    baseAPI + '/system/cache/optimize-clear'

export const SrvSystemInfoCacheQueueRestart =
    baseAPI + '/system/cache/queue-restart'

export const SrvSystemInfoCacheRouteClear =
    baseAPI + '/system/cache/route-clear'

export const SrvSystemInfoCacheViewClear = baseAPI + '/system/cache/view-clear'

// Guesty Config
export const SrvSystemGuestyConfig =
    baseAPI + '/properties/guesty-configuration'

export const SrvSystemTestGuestyConfig = SrvSystemGuestyConfig + '/test'
