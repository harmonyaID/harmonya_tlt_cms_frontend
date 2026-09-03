import { apiPropertyType } from '@/service/api/propertySettingGeneral.api.ts'
import { createStoreWithAPI } from '@/store/_coreStore/_create.store.ts'
import { DefaultConfigCreatStoreType } from '@/store/_coreStore/_store.type.ts'
import useHookFetchDataStore from '@/store/_coreStore/_useHookFetchData.store.ts'

const configUseStore = createStoreWithAPI(() =>
    apiPropertyType.list({ page: 0 }),
)

const usePropertyTypeStore = (passConfig: DefaultConfigCreatStoreType = {}) => {
    return {
        ...useHookFetchDataStore({
            ...passConfig,
            configUseStore: configUseStore,
        }),
    }
}

export default usePropertyTypeStore
