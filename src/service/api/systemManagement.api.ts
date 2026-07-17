import {
    _shapeMethodGet,
    _shapeMethodPost,
    _shapeMethodPut,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvWebConfig,
    SrvWebConfigUpdate,
} from '@/service/api/_systemManagement.endPoint.ts'

export const getWebConfig = () =>
    _shapeMethodGet(SrvWebConfig, 'tcSrvWebConfig')

export const updateWebConfig = (id, formRequest: any) =>
    _shapeMethodPut(SrvWebConfigUpdate(id), formRequest)
