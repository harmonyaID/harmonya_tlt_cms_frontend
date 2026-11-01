import {
    apiExperienceArea,
    apiExperienceType,
    apiIslandGuideType,
} from '@/service/api/contentManageSetting.api.ts'
import { createStoreWithAPI } from '@/store/_coreStore/_create.store.ts'
import { DefaultConfigCreatStoreType } from '@/store/_coreStore/_store.type.ts'
import useHookFetchDataStore from '@/store/_coreStore/_useHookFetchData.store.ts'

const configUseStore = createStoreWithAPI(() =>
    apiIslandGuideType.list({ page: 0 }),
)

const useIslandGuideTypeStore = (
    passConfig: DefaultConfigCreatStoreType = {},
) => {
    return {
        ...useHookFetchDataStore({
            ...passConfig,
            configUseStore: configUseStore,
        }),
    }
}

export default useIslandGuideTypeStore
