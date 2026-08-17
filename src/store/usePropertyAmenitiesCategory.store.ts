import { apiPropertyTag } from '@/service/api/propertySettingGeneral.api.ts'
import { createStoreWithAPI } from '@/store/_coreStore/_create.store.ts'
import { DefaultConfigCreatStoreType } from '@/store/_coreStore/_store.type.ts'
import useHookFetchDataStore from '@/store/_coreStore/_useHookFetchData.store.ts'
import { apiAmenitiesCategoryCRUD } from '@/service/api/setting.api.ts'

const configUseStore = createStoreWithAPI(() =>
    apiAmenitiesCategoryCRUD.list({ page: 0 }),
)

const useAmenitiesCategoryStore = (
    passConfig: DefaultConfigCreatStoreType = {},
) => {
    return {
        ...useHookFetchDataStore({
            ...passConfig,
            configUseStore: configUseStore,
        }),
    }
}

export default useAmenitiesCategoryStore
