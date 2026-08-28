import { apiPropertyTag } from '@/service/api/propertySettingGeneral.api.ts'
import { createStoreWithAPI } from '@/store/_coreStore/_create.store.ts'
import { DefaultConfigCreatStoreType } from '@/store/_coreStore/_store.type.ts'
import useHookFetchDataStore from '@/store/_coreStore/_useHookFetchData.store.ts'
import { apiProperty } from '@/service/api/property.api.ts'

const configUseStore = createStoreWithAPI(() =>
    apiProperty.list({ page: 0 }, 'tcPropertyStore'),
)

const usePropertyStore = (passConfig: DefaultConfigCreatStoreType = {}) => {
    return {
        ...useHookFetchDataStore({
            ...passConfig,
            configUseStore: configUseStore,
        }),
    }
}

export default usePropertyStore
