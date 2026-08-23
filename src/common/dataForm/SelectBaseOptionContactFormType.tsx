import SelectBaseOption from '@/common/dataForm/SelectBaseOption.tsx'
import { SelectBaseOptionProps } from '@/common/dataForm/type/selectOption.type.ts'
import useContactFormTypeStore from '@/store/useContactFormType.store.ts'

const SelectBaseOptionContactFormType = (props: SelectBaseOptionProps) => {
    const { __list, __isLoading } = useContactFormTypeStore()

    return (
        <SelectBaseOption
            {...props}
            listStore={__list}
            disabled={__isLoading}
            isLoadingStore={__isLoading}
        />
    )
}

export default SelectBaseOptionContactFormType
