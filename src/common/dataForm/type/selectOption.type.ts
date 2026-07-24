import { BaseSelectOptionWithHookProps } from '@/common/dataForm/type/dataForm.type.ts'

export interface SelectOptionGeneralProps extends BaseSelectOptionWithHookProps {
    valueKey?: string
    isOnlyChoose?: boolean
    isCreatable?: boolean
    ids?: any[]
}
