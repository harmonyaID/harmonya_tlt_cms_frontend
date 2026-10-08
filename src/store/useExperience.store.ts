import { apiExperienceArea } from '@/service/api/contentManageSetting.api.ts'
import { createStoreWithAPI } from '@/store/_coreStore/_create.store.ts'
import { DefaultConfigCreatStoreType } from '@/store/_coreStore/_store.type.ts'
import useHookFetchDataStore from '@/store/_coreStore/_useHookFetchData.store.ts'
import { apiExperienceContent } from '@/service/api/contentManage.api.ts'

const configUseStore = createStoreWithAPI(() =>
    apiExperienceContent.list({ page: 0 }),
)

const useExperienceStore = (passConfig: DefaultConfigCreatStoreType = {}) => {
    return {
        ...useHookFetchDataStore({
            ...passConfig,
            configUseStore: configUseStore,
        }),
    }
}

export default useExperienceStore
