import {
    _shapeMethodGet,
    _shapeMethodGetSearch,
    _shapeMethodPost,
    _shapeMethodPut,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvLogActivity,
    SrvLogActivitySettingAction,
    SrvLogActivitySettingType,
    SrvSystemGuestyConfig,
    SrvSystemInfo,
    SrvSystemInfoCacheClear,
    SrvSystemInfoCacheConfigClear,
    SrvSystemInfoCacheOptimize,
    SrvSystemInfoCacheOptimizeClear,
    SrvSystemInfoCacheQueueRestart,
    SrvSystemInfoCacheRouteClear,
    SrvSystemInfoCacheViewClear,
    SrvSystemTestGuestyConfig,
    SrvWebConfig,
    SrvWebConfigUpdate,
} from '@/service/api/_systemManagement.endPoint.ts'

export const getWebConfig = () =>
    _shapeMethodGet(SrvWebConfig, 'tcSrvWebConfig')

export const updateWebConfig = (id, formRequest: any) =>
    _shapeMethodPut(SrvWebConfigUpdate(id), formRequest)

// Log Activity
export const getLogActivity = (formRequest) =>
    _shapeMethodGetSearch(SrvLogActivity, formRequest, 'tcSrvLogActivity')

export const getLogActivitySettingAction = (formRequest) =>
    _shapeMethodGetSearch(
        SrvLogActivitySettingAction,
        formRequest,
        'tcSrvLogActivitySettingAction',
    )

export const getLogActivitySettingType = (formRequest) =>
    _shapeMethodGetSearch(
        SrvLogActivitySettingType,
        formRequest,
        'tcSrvLogActivitySettingType',
    )

// System Info
export const getLogActivitySetting = () => _shapeMethodGet(SrvSystemInfo)

// System Clear
export const runCacheClearSI = () => _shapeMethodPost(SrvSystemInfoCacheClear)

export const runCacheInfoClearSI = () =>
    _shapeMethodPost(SrvSystemInfoCacheConfigClear)

export const runCacheOptimizeSI = () =>
    _shapeMethodPost(SrvSystemInfoCacheOptimize)

export const runCacheOptimizeClearSI = () =>
    _shapeMethodPost(SrvSystemInfoCacheOptimizeClear)

export const runCacheQueueRestartSI = () =>
    _shapeMethodPost(SrvSystemInfoCacheQueueRestart)

export const runCacheRouteClearSI = () =>
    _shapeMethodPost(SrvSystemInfoCacheRouteClear)

export const runCacheViewClearSI = () =>
    _shapeMethodPost(SrvSystemInfoCacheViewClear)

// System Guesty
export const getGuestyConfig = () =>
    _shapeMethodGet(SrvSystemGuestyConfig, 'tcSrvSystemGuestyConfig')

export const updateGuestyConfig = (formRequest) =>
    _shapeMethodPut(SrvSystemGuestyConfig, formRequest)

export const testGuestyConfig = (formRequest = {}) =>
    _shapeMethodPost(SrvSystemTestGuestyConfig, formRequest)
