import { BaseSelectOptionWithHookProps } from '@/common/dataForm/type/dataForm.type.ts'

export interface SelectOptionGeneralProps extends BaseSelectOptionWithHookProps {
    valueKey?: string
    isOnlyChoose?: boolean
    isCreatable?: boolean
    ids?: any[]
}

export interface SelectBaseOptionProps {
    name?: string
    label?: string
    isRequired?: boolean
    selectEmpty?: string
    [key: string]: any
}

export interface SelectBaseOptionStoreProps extends SelectBaseOptionProps {
    // List Data From Store
    listStore?: any[]
    isLoadingStore?: boolean
}
