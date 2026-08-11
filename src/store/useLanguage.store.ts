import { apiLanguage } from '@/service/api/contentManageSetting.api.ts'
import { createStoreWithAPI } from '@/store/_coreStore/_create.store.ts'
import { DefaultConfigCreatStoreType } from '@/store/_coreStore/_store.type.ts'
import useHookFetchDataStore from '@/store/_coreStore/_useHookFetchData.store.ts'

const configUseStore = createStoreWithAPI(() => apiLanguage.list({ page: 0 }))

const useLanguageStore = (passConfig: DefaultConfigCreatStoreType = {}) => {
    return {
        ...useHookFetchDataStore({
            ...passConfig,
            configUseStore: configUseStore,
            isFormatList: true,
            formatBy: ['code', 'country'],
        }),
    }
}

export default useLanguageStore
