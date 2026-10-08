import { apiPropertyTag } from '@/service/api/propertySettingGeneral.api.ts'
import { createStoreWithAPI } from '@/store/_coreStore/_create.store.ts'
import {
    DefaultConfigCreatStoreType,
    StoreStateType,
} from '@/store/_coreStore/_store.type.ts'
import useHookFetchDataStore from '@/store/_coreStore/_useHookFetchData.store.ts'
import { apiProperty } from '@/service/api/property.api.ts'
import { apiBlogContent } from '@/service/api/contentManage.api.ts'
import { useStore } from 'zustand'
import { useLayoutEffect } from 'react'
import { isEmpty } from 'lodash'

// const configUseStore = createStoreWithAPI(apiBlogContent.list)
//
// const useBlogStore = (config: DefaultConfigCreatStoreType = {}) => {
//     const { __list, __isLoading, __handleGet, __handlePush, __handleReload } =
//         useStore(configUseStore, (state: StoreStateType) => state)
//
//     const configList = () => {
//         if (config.isFormatList) {
//             return __list.map((vm) => ({
//                 value: vm[config.formatBy[0]],
//                 label: vm[config.formatBy[1]],
//             }))
//         }
//
//         return __list
//     }
//
//     useLayoutEffect(() => {
//         if (!__isLoading && isEmpty(__list)) {
//             if (config.isRunByDefault) {
//                 __handleGet()
//             }
//         }
//     }, [])
//
//     return {
//         __list: configList(),
//         __isLoading,
//         __handleGetDataStore: __handleReload,
//         __handlePushDataStore: __handlePush,
//     }
// }

const configUseStore = createStoreWithAPI(() =>
    apiBlogContent.list({ page: 0 }, 'tcBlogStore'),
)

const useBlogStore = (passConfig: DefaultConfigCreatStoreType = {}) => {
    return {
        ...useHookFetchDataStore({
            ...passConfig,
            configUseStore: configUseStore,
        }),
    }
}

export default useBlogStore
