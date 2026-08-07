import SelectBaseOption from '@/common/dataForm/SelectBaseOption.tsx'
import { SelectBaseOptionProps } from '@/common/dataForm/type/selectOption.type.ts'
import useStaticPropertyCleaningStatusStore from '@/store/useStaticPropertyCleaningStatus.store.ts'

const SelectBaseOptionStaticCleaningStatus = (props: SelectBaseOptionProps) => {
    const { __list, __isLoading } = useStaticPropertyCleaningStatusStore()

    return (
        <SelectBaseOption
            label="Cleaning Status"
            name="cleaningStatusId"
            selectEmpty="- Select Cleaning Status -"
            {...props}
            listStore={__list}
            isLoadingStore={__isLoading}
        />
    )
}

export default SelectBaseOptionStaticCleaningStatus
