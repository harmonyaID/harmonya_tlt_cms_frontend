import { createStoreWithAPI } from '@/store/_coreStore/_create.store.ts'
import useHookFetchDataStore from '@/store/_coreStore/_useHookFetchData.store.ts'
import { DefaultConfigCreatStoreType } from '@/store/_coreStore/_store.type.ts'
import { apiBlogCategory } from '@/service/api/contentManageSetting.api.ts'
import { getRoles } from '@/service/api/access.api.ts'

const configUseStore = createStoreWithAPI(() => getRoles)

const useUserRoleStore = (passConfig: DefaultConfigCreatStoreType = {}) => {
    return {
        ...useHookFetchDataStore({
            ...passConfig,
            configUseStore: configUseStore,
        }),
    }
}

export default useUserRoleStore
