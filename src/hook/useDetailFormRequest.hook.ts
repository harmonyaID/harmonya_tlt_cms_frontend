import { useState, useEffect } from 'react'
import { hideSidebar, showSidebar } from '@/helper/base/actionSidebar.helper'
import { isSuccess } from '@/helper/base/condition.helper'
import { ConfigDetailForm, DataConfigDetailForm } from './type/hook.type'

const defaultDataConfig: DataConfigDetailForm = {
    urlAPI: async () => ({}),
    isHideSidebar: false,
    formRequest: {},
    setFormRequest: () => {},
    isManualSetFormRequest: false,
    handleSetFormRequest: () => {},
    isAutoGet: true,
}

const useDetailFormRequestHook = (config: ConfigDetailForm = {}) => {
    const mergedConfig: DataConfigDetailForm = {
        ...defaultDataConfig,
        ...config,
    }

    const [detail, setDetail] = useState<Record<string, any>>({})

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const _handleIsLoading = (newIsLoading: boolean = false) => {
        setIsLoading(newIsLoading)
    }

    const _handleSetDetail = (result: object | any = {}) => {
        mergedConfig.setFormRequest((prevState) => {
            const newFormRequest = { ...prevState }

            if (mergedConfig.isManualSetFormRequest) {
                mergedConfig.handleSetFormRequest(result)
            } else {
                Object.keys(result).forEach((keyFormRequest) => {
                    newFormRequest[keyFormRequest] = result[keyFormRequest]
                })
            }

            return newFormRequest
        })

        setDetail({ ...result })
    }

    const _getData = async () => {
        _handleIsLoading(true)

        mergedConfig
            .urlAPI()
            .then((resData) => {
                _handleIsLoading(false)

                if (isSuccess(resData)) {
                    _handleSetDetail(resData.result)
                }
            })
            .catch((err) => {
                _handleIsLoading(false)
            })
    }

    useEffect(() => {
        if (config.isAutoGet) _getData()

        if (mergedConfig.isHideSidebar) hideSidebar()

        return () => {
            if (mergedConfig.isHideSidebar) showSidebar()
        }
    }, [config.isAutoGet])

    return {
        __detailFormRequest: detail,
        __isLoadingDetailFormRequest: isLoading,
        __actionReloadFormRequest: () => _getData(),
    }
}

export default useDetailFormRequestHook
