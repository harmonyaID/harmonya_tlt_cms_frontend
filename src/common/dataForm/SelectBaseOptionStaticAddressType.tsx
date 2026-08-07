import SelectBaseOption from '@/common/dataForm/SelectBaseOption.tsx'
import { SelectBaseOptionProps } from '@/common/dataForm/type/selectOption.type.ts'
import useStaticPropertyAddressTypeStore from '@/store/useStaticPropertyAddressType.store.ts'
import useStaticPropertyStatusStore from '@/store/useStaticPropertyStatus.store.ts'

const SelectBaseOptionStaticStatus = (props: SelectBaseOptionProps) => {
    const { __list, __isLoading } = useStaticPropertyAddressTypeStore()

    return (
        <SelectBaseOption
            name="typeId"
            selectEmpty="- Select Type -"
            {...props}
            listStore={__list}
            isLoadingStore={__isLoading}
        />
    )
}

export default SelectBaseOptionStaticStatus
