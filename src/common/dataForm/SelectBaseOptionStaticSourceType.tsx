import SelectBaseOption from '@/common/dataForm/SelectBaseOption.tsx'
import { SelectBaseOptionProps } from '@/common/dataForm/type/selectOption.type.ts'
import useStaticPropertySourceTypeStore from '@/store/useStaticPropertySourceType.store.ts'

const SelectBaseOptionStaticSourceType = (props: SelectBaseOptionProps) => {
    const { __list, __isLoading } = useStaticPropertySourceTypeStore()

    return (
        <SelectBaseOption
            label="SourceType"
            name="sourceTypeId"
            selectEmpty="- Select Source Type -"
            {...props}
            listStore={__list}
            isLoadingStore={__isLoading}
        />
    )
}

export default SelectBaseOptionStaticSourceType
