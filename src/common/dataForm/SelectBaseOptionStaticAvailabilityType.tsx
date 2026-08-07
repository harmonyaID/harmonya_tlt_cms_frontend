import SelectBaseOption from '@/common/dataForm/SelectBaseOption.tsx'
import { SelectBaseOptionProps } from '@/common/dataForm/type/selectOption.type.ts'
import useStaticPropertyAvailabilityTypeStore from '@/store/useStaticPropertyAvailabilityType.store.ts'
import useStaticPropertyStatusStore from '@/store/useStaticPropertyStatus.store.ts'

const SelectBaseOptionStaticAvailabilityType = (
    props: SelectBaseOptionProps,
) => {
    const { __list, __isLoading } = useStaticPropertyAvailabilityTypeStore()

    return (
        <SelectBaseOption
            label="Availability Type"
            name="availabilityId"
            selectEmpty="- Select Availability -"
            {...props}
            listStore={__list}
            isLoadingStore={__isLoading}
        />
    )
}

export default SelectBaseOptionStaticAvailabilityType
