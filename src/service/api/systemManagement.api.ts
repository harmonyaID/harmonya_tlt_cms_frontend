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
