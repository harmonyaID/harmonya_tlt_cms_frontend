import SelectBaseOption from '@/common/dataForm/SelectBaseOption.tsx'
import { SelectBaseOptionProps } from '@/common/dataForm/type/selectOption.type.ts'
import useStaticUnitTypeStore from '@/store/useStaticUnitType.store.ts'

const SelectBaseOptionStaticUnitType = (props: SelectBaseOptionProps) => {
    const { __list, __isLoading } = useStaticUnitTypeStore()

    return (
        <SelectBaseOption
            {...props}
            listStore={__list}
            isLoadingStore={__isLoading}
        />
    )
}

export default SelectBaseOptionStaticUnitType
