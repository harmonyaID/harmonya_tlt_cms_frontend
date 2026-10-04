import { apiBoat, apiBoatType } from '@/service/api/boatManage.api.ts'
import { createStoreWithAPI } from '@/store/_coreStore/_create.store.ts'
import { DefaultConfigCreatStoreType } from '@/store/_coreStore/_store.type.ts'
import useHookFetchDataStore from '@/store/_coreStore/_useHookFetchData.store.ts'
import { apiPageContent } from '@/service/api/contentManage.api.ts'

const configUseStore = createStoreWithAPI(() =>
    apiPageContent.list({ page: 0 }),
)

const usePageStore = (passConfig: DefaultConfigCreatStoreType = {}) => {
    return {
        ...useHookFetchDataStore({
            ...passConfig,
            configUseStore: configUseStore,
        }),
    }
}

export default usePageStore
