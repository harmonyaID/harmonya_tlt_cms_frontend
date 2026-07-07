import { createStoreWithAPI } from '@/store/_coreStore/_create.store.ts'
import useHookFetchDataStore from '@/store/_coreStore/_useHookFetchData.store.ts'
import { getCountries } from '@/service/api/setting.api.ts'
import { DefaultConfigCreatStoreType } from '@/store/_coreStore/_store.type.ts'

const configUseStore = createStoreWithAPI(getCountries)

const useCountryStore = (passConfig: DefaultConfigCreatStoreType = {}) => {
    return {
        ...useHookFetchDataStore({
            ...passConfig,
            configUseStore: configUseStore,
        }),
    }
}

export default useCountryStore
