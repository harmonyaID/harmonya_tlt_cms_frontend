import {
    _shapeMethodGet,
    _shapeMethodPatch,
    _shapeMethodPost,
} from '@/service/api/_coreAPI/_config.api.ts'
import * as endPoint from '@/service/api/_auth.endPoint.ts'

export const apiAuthLogin = (formRequest: object = {}) =>
    _shapeMethodPost(endPoint.SrvLogin, formRequest, false, '', false)

export const apiAuthForgotPassword = (formRequest: object = {}) =>
    _shapeMethodPost(endPoint.SrvForgotPassword, formRequest, false)

export const apiAuthResetPassword = (formRequest: object = {}) =>
    _shapeMethodPost(endPoint.SrvResetPassword, formRequest, false)

export const apiAuthLogout = (formRequest: object = {}) =>
    _shapeMethodPost(endPoint.SrvLogout, formRequest, false)

export const apiAuthChangePassword = (formRequest: object = {}) =>
    _shapeMethodPatch(endPoint.SrvChangePassword, formRequest, false)

export const apiAuthProfile = () => _shapeMethodGet(endPoint.SrvProfile)

export const refreshAccess = () =>
    _shapeMethodPost(endPoint.SrvAuthRefreshAccess)
