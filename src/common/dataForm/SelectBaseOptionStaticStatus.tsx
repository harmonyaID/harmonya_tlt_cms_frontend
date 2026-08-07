import SelectBaseOption from '@/common/dataForm/SelectBaseOption.tsx'
import { SelectBaseOptionProps } from '@/common/dataForm/type/selectOption.type.ts'
import useStaticPropertyStatusStore from '@/store/useStaticPropertyStatus.store.ts'

const SelectBaseOptionStaticStatus = (props: SelectBaseOptionProps) => {
    const { __list, __isLoading } = useStaticPropertyStatusStore()

    return (
        <SelectBaseOption
            label="Status"
            name="statusId"
            selectEmpty="- Select Status -"
            {...props}
            listStore={__list}
            isLoadingStore={__isLoading}
        />
    )
}

export default SelectBaseOptionStaticStatus
