import { DataListItem } from '@/type/dataList.type'

export interface UseStoreState {
    __list: DataListItem[]
    __isLoading?: boolean
    __handleGet?: () => void
}

export interface DefaultConfigStore {
    isRunByDefault?: boolean
    isFormatList?: boolean
    formatBy?: string[]
}
