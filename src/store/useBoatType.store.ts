import { createStoreWithAPI } from '@/store/_coreStore/_create.store.ts'
import useHookFetchDataStore from '@/store/_coreStore/_useHookFetchData.store.ts'
import { DefaultConfigCreatStoreType } from '@/store/_coreStore/_store.type.ts'
import { apiBoatType } from '@/service/api/boatManage.api.ts'

const configUseStore = createStoreWithAPI(() => apiBoatType.list({ page: 0 }))

const useBoatTypeStore = (passConfig: DefaultConfigCreatStoreType = {}) => {
    return {
        ...useHookFetchDataStore({
            ...passConfig,
            configUseStore: configUseStore,
        }),
    }
}

export default useBoatTypeStore
