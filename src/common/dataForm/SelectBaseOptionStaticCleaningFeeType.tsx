import SelectBaseOption from '@/common/dataForm/SelectBaseOption.tsx'
import { SelectBaseOptionProps } from '@/common/dataForm/type/selectOption.type.ts'
import useStaticPropertyCleaningFeeTypeStore from '@/store/useStaticPropertyCleaningFeeType.store.ts'

const SelectBaseOptionStaticCleaningFeeType = (
    props: SelectBaseOptionProps,
) => {
    const { __list, __isLoading } = useStaticPropertyCleaningFeeTypeStore()

    return (
        <SelectBaseOption
            name="cleaningFeeTypeId"
            selectEmpty="- Select Cleaning Fee Type -"
            {...props}
            listStore={__list}
            isLoadingStore={__isLoading}
        />
    )
}

export default SelectBaseOptionStaticCleaningFeeType
