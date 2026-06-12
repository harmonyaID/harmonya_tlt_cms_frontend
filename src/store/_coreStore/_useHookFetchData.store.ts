import { useLayoutEffect } from 'react'
import { isEmpty } from 'lodash'
import { useStore } from 'zustand'
import { defaultConfigParam } from '@/store/_coreStore/_dataConfig.store.ts'
import {
    DefaultConfigCreatStoreType,
    DefaultConfigStoreType,
    StoreStateType,
} from '@/store/_coreStore/_store.type.ts'

const useHookFetchDataStore = (
    passConfig: DefaultConfigCreatStoreType = {},
) => {
    const config: DefaultConfigStoreType = {
        ...defaultConfigParam,
        ...passConfig,
    }

    const { __list, __isLoading, __handleGet } = useStore(
        passConfig.configUseStore,
        // configUseStore,
        (state: StoreStateType) => state,
    )

    const configList = () => {
        if (config.isFormatList) {
            return __list.map((vm) => ({
                value: vm[config.formatBy[0]],
                label: vm[config.formatBy[1]],
            }))
        }

        return __list
    }

    useLayoutEffect(() => {
        if (!__isLoading && isEmpty(__list)) {
            if (config.isRunByDefault) {
                __handleGet()
            }
        }
    }, [])

    return {
        __list: configList(),
        __isLoading,
        __handleGetDataStore: __handleGet,
    }
}

export default useHookFetchDataStore
