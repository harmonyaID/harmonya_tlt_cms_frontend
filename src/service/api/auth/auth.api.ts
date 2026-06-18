import {
    _shapeMethodGet,
    _shapeMethodPost,
} from '@/service/api/_coreAPI/_config.api.ts'
import * as endPoint from '@/service/api/auth/_auth.endPoint'

export const apiAuthLogin = (formRequest: object = {}) =>
    _shapeMethodPost(endPoint.SrvLogin, formRequest, false, '', false)
export const apiAuthLogout = (formRequest: object = {}) =>
    _shapeMethodPost(endPoint.SrvLogout, formRequest, false)
export const apiAuthProfile = () => _shapeMethodGet(endPoint.SrvProfile)
export const refreshAccess = () =>
    _shapeMethodPost(endPoint.SrvAuthRefreshAccess)
