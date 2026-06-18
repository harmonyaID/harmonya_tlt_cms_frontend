import { useState, useEffect } from 'react'
import { hideSidebar, showSidebar } from '@/helper/base/actionSidebar.helper'
import { ConfigDetail, DataConfigDetail } from '../type/hook.type'

const defaultDataConfig: DataConfigDetail = {
    urlAPI: async () => ({}),
    isCallAPI: true,
    isHideSidebar: false,
    triggerBy: '',
    isAutoGet: true,
}

const useDataDetailHook = <TDetail = any>(config: ConfigDetail = {}) => {
    const mergedConfig: DataConfigDetail = {
        ...defaultDataConfig,
        ...config,
    }

    // const [detail, setDetail] = useState<Record<string, any>>({})
    const [detail, setDetail] = useState<TDetail>({} as TDetail)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const _handleSetDetail = (value: Record<string, any> = {}) => {
        setDetail((prevState) => {
            return {
                ...prevState,
                ...value,
            }
        })
    }

    const _handleIsLoading = (newIsLoading: boolean = false) => {
        setIsLoading(newIsLoading)
    }

    const _getData = () => {
        _handleIsLoading(true)

        if (mergedConfig.isCallAPI) {
            mergedConfig.urlAPI().then((resData) => {
                setIsLoading(false)
                if (resData && resData.result) {
                    _handleSetDetail(resData.result)
                }
            })
        } else {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        mergedConfig.isAutoGet ? _getData() : null

        if (mergedConfig.isHideSidebar) hideSidebar()

        return () => {
            if (mergedConfig.isHideSidebar) showSidebar()
        }
    }, [mergedConfig.triggerBy])

    return {
        __detail: detail,
        __isLoading: isLoading,
        __actionUpdate: (newDetail: Record<string, any>) =>
            _handleSetDetail(newDetail),
        __actionReload: () => _getData(),
    }
}

export default useDataDetailHook
