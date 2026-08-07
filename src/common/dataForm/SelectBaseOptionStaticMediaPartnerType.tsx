import SelectBaseOption from '@/common/dataForm/SelectBaseOption.tsx'
import { SelectBaseOptionProps } from '@/common/dataForm/type/selectOption.type.ts'
import useStaticPropertyMediaPartnerTypeStore from '@/store/useStaticPropertyMediaPartnerType.store.ts'

const SelectBaseOptionStaticMediaPartnerType = (
    props: SelectBaseOptionProps,
) => {
    const { __list, __isLoading } = useStaticPropertyMediaPartnerTypeStore()

    return (
        <SelectBaseOption
            label="Media Partner Type"
            name="mediaPartnerTypeId"
            selectEmpty="- Select MediaPartnerType -"
            isRequired
            {...props}
            listStore={__list}
            isLoadingStore={__isLoading}
        />
    )
}

export default SelectBaseOptionStaticMediaPartnerType
