import SelectBaseOption from '@/common/dataForm/SelectBaseOption.tsx'
import { SelectBaseOptionProps } from '@/common/dataForm/type/selectOption.type.ts'
import useStaticPropertyListingTypeStore from '@/store/useStaticPropertyListingType.store.ts'

const SelectBaseOptionStaticListingType = (props: SelectBaseOptionProps) => {
    const { __list, __isLoading } = useStaticPropertyListingTypeStore()

    return (
        <SelectBaseOption
            name="listingTypeId"
            selectEmpty="- Select Listing -"
            {...props}
            listStore={__list}
            isLoadingStore={__isLoading}
        />
    )
}

export default SelectBaseOptionStaticListingType
