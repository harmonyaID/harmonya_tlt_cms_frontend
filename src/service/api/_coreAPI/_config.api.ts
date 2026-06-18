import { isEmpty } from 'lodash'
import { LS_TOKEN } from '@/config/localStrorage.config'
import {
    get,
    del,
    put,
    post,
    patch,
    queryFilter,
    argCatchMsg,
    renderCancelToken,
    argCancelToken,
} from '@/helper/base/api.helper'
import { isSuccess } from '@/helper/base/condition.helper'
import { getLocalStorage } from '@/helper/base/localStorage.helper'
import { manageHandleTokenExpired } from '@/helper/base/manageAuth.helper'
import {
    notifyAPIError,
    notifyError,
    notifySuccess,
} from '@/helper/base/notifyGeneral.helper'
import { UrlCRUDType } from '@/service/api/type/config.type'
import { APIResponse } from '@/type/resultAPI'

export const _configHeadBody = () => ({
    Authorization: `Bearer ${getLocalStorage(LS_TOKEN) || ''}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    web_access_token: getLocalStorage(LS_TOKEN) || '',
    Token: getLocalStorage(LS_TOKEN) || '',
})

export const _shapeMethodGet = (
    url: string,
    tokenCancel: string = '',
    isMsgCatch: boolean = true,
) => {
    const others = tokenCancel ? { ...renderCancelToken(tokenCancel) } : {}

    return get(url, others, _configHeadBody())
        .then((res: any) => {
            if (isSuccess(res.data)) {
                return res.data
            } else {
                return null
            }
        })
        .catch((err: any) => {
            if (err && err.response && err.response.status === 401) {
                manageHandleTokenExpired()
            } else {
                if (isMsgCatch) {
                    if (isEmpty(tokenCancel) || argCatchMsg(err)) {
                        //
                    } else {
                        //
                    }
                }
            }
        })
}

export const _shapeMethodPost = (
    url: string,
    payload: any = {},
    isMsgSuccess: boolean = true,
    tokenCancel: string = '',
    isFormData: boolean = false,
) => {
    const others: any = tokenCancel ? {} : {}
    others['validateStatus'] = (status: number) => {
        return true
    }

    const newConfigHeads: any = {}
    if (isFormData) {
        newConfigHeads['Content-Type'] = 'multipart/form-data'
    }

    return post(url, payload, others, {
        ..._configHeadBody(),
        ...newConfigHeads,
    })
        .then((res: any) => {
            if (isSuccess(res.data)) {
                if (isMsgSuccess) {
                    notifySuccess(res.data.status.message || 'Success')
                }
            } else {
                notifyAPIError(res.data.status, true)
            }

            return res.data
        })
        .catch((err: any) => {
            if (err && err.response && err.response.status === 401) {
                manageHandleTokenExpired()
            } else {
                if (tokenCancel && argCatchMsg(err)) {
                    notifyError(err.message)
                } else {
                    //
                }
            }
        })
}

export const _shapeMethodPut = (
    url: string,
    payload: any = {},
    isMsgSuccess: boolean = true,
    tokenCancel: string = '',
    isFormData: boolean = false,
) => {
    const others: any = tokenCancel ? {} : {}
    others.validateStatus = (status: number) => {
        return true
    }

    const newConfigHeads: any = {}
    if (isFormData) {
        newConfigHeads['Content-Type'] = 'multipart/form-data'
    }

    return put(url, payload, others, {
        ..._configHeadBody(),
        ...newConfigHeads,
    })
        .then((res: any) => {
            if (isSuccess(res.data)) {
                if (isMsgSuccess) {
                    notifySuccess(res.data.status.message || 'Success')
                }
            } else {
                notifyAPIError(res.data.status, true)
            }

            return res.data
        })
        .catch((err: any) => {
            if (err && err.response && err.response.status === 401) {
                manageHandleTokenExpired()
            } else {
                if (tokenCancel && argCatchMsg(err)) {
                    notifyError(err.message)
                } else {
                    //
                }
            }
        })
}

export const _shapeMethodPatch = (
    url: string,
    payload: any = {},
    isMsgSuccess: boolean = true,
    tokenCancel: string = '',
    isFormData: boolean = false,
) => {
    const others: any = tokenCancel ? {} : {}
    others.validateStatus = (status: number) => {
        return true
    }

    const newConfigHeads: any = {}
    if (isFormData) {
        newConfigHeads['Content-Type'] = 'multipart/form-data'
    }

    return patch(url, payload, others, {
        ..._configHeadBody(),
        ...newConfigHeads,
    })
        .then((res: any) => {
            if (isSuccess(res.data)) {
                if (isMsgSuccess) {
                    notifySuccess(res.data.status.message || 'Success')
                }
            } else {
                notifyAPIError(res.data.status, true)
            }

            return res.data
        })
        .catch((err: any) => {
            if (err && err.response && err.response.status === 401) {
                manageHandleTokenExpired()
            } else {
                if (tokenCancel && argCatchMsg(err)) {
                    notifyError(err.message)
                } else {
                    //
                }
            }
        })
}

export const _shapeMethodDel = (
    url: string,
    tokenCancel: string = '',
    isMsgSuccess: boolean = true,
) => {
    const others: any = tokenCancel ? {} : {}
    return del(url, others, _configHeadBody())
        .then((res: any) => {
            if (isSuccess(res.data)) {
                if (isMsgSuccess) {
                    notifySuccess(res.data.status.message || 'Success')
                }
            } else {
                //
            }

            return res.data
        })
        .catch((err: any) => {
            if (err && err.response && err.response.status === 401) {
                manageHandleTokenExpired()
            } else {
                if (tokenCancel && argCatchMsg(err)) {
                    if (
                        err &&
                        err.response &&
                        err.response.data?.status?.code === 400 &&
                        err.response.data?.status?.internalMsg
                    ) {
                        notifyError(err.response.data?.status?.internalMsg)
                    }
                } else {
                    return argCancelToken(err)
                }
            }
        })
}

export const _shapeMethodGetSearch = (
    url: string,
    search: any = {},
    tokenCancel: string = '',
    isMsgSuccess: boolean = true,
) => {
    return _shapeMethodGet(url + queryFilter(search), tokenCancel)
}

export const _shapeMethodGetDownload = (
    url: string,
    search: any = {},
    fileName: string = 'file-download',
    tokenCancel: string = '',
    isMsgSuccess: boolean = true,
) => {
    const others: any = {}
    others['responseType'] = 'blob'
    return get(url + queryFilter(search), others, {
        Accept: '*/*',
        ..._configHeadBody(),
    })
        .then((res: any) => {
            if (res.data) {
                const url = window.URL.createObjectURL(new Blob([res.data]))

                const tagA = document.createElement('a')
                tagA.href = url
                tagA.download = fileName
                tagA.click()
                window.URL.revokeObjectURL(url)
            }

            return res.data
        })
        .catch((err: any) => {
            if (isEmpty(tokenCancel) || argCatchMsg(err)) {
                //
            } else {
                return argCancelToken(err)
            }
        })
}

export const _shapeObjectMethodCRUD = (
    urlCURD: UrlCRUDType,
    tokenCancel: string = 'tc',
) => {
    return {
        list: (
            search: any = {},
            optionalTCFeature: string = '',
        ): Promise<APIResponse> =>
            _shapeMethodGetSearch(
                urlCURD.main,
                search,
                tokenCancel + 'list' + urlCURD.main + optionalTCFeature,
            ),
        detail: (id: string | number): Promise<APIResponse> =>
            _shapeMethodGet(
                urlCURD.detail(id),
                tokenCancel + 'detail' + urlCURD.main,
            ),
        add: (formRequest: any = {}): Promise<APIResponse> =>
            _shapeMethodPost(urlCURD.main, formRequest),
        addWithData: (formRequest: any = {}): Promise<APIResponse> =>
            _shapeMethodPost(urlCURD.main, formRequest, true, '', true),
        update: (
            id: string | number,
            formRequest: any = {},
        ): Promise<APIResponse> =>
            _shapeMethodPut(urlCURD.update(id), formRequest),
        patch: (
            id: string | number,
            formRequest: any = {},
        ): Promise<APIResponse> =>
            _shapeMethodPatch(urlCURD.update(id), formRequest),
        updateWithData: (
            id: string | number,
            formRequest: any = {},
            isSlasUpdate: boolean = false,
        ): Promise<APIResponse> =>
            _shapeMethodPost(
                urlCURD.update(id, isSlasUpdate),
                formRequest,
                true,
                '',
                true,
            ),
        delete: (
            id: string | number,
            optionalTCFeature: string = '',
        ): Promise<APIResponse> =>
            _shapeMethodDel(
                urlCURD.delete(id),
                optionalTCFeature ? tokenCancel + 'delete' + urlCURD.main : '',
            ),
    }
}
