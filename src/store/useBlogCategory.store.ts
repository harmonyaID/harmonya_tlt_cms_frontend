import { createStoreWithAPI } from '@/store/_coreStore/_create.store.ts'
import useHookFetchDataStore from '@/store/_coreStore/_useHookFetchData.store.ts'
import { DefaultConfigCreatStoreType } from '@/store/_coreStore/_store.type.ts'
import { apiBlogCategory } from '@/service/api/contentManageSetting.api.ts'

const configUseStore = createStoreWithAPI(() =>
    apiBlogCategory.list({ page: 0 }),
)

const useBlogCategoryStore = (passConfig: DefaultConfigCreatStoreType = {}) => {
    return {
        ...useHookFetchDataStore({
            ...passConfig,
            configUseStore: configUseStore,
        }),
    }
}

export default useBlogCategoryStore
