import SelectBaseOption from '@/common/dataForm/SelectBaseOption.tsx'
import { SelectBaseOptionProps } from '@/common/dataForm/type/selectOption.type.ts'
import useStaticMediaPartnerType from '@/store/useStaticMediaPartnerType.store.ts'

const SelectBaseOptionMediaPartnerType = (props: SelectBaseOptionProps) => {
    const { __list, __isLoading } = useStaticMediaPartnerType()

    return (
        <SelectBaseOption
            label="Type"
            name="typeId"
            selectEmpty="- Select Type -"
            isRequired
            {...props}
            listStore={__list}
            isLoadingStore={__isLoading}
        />
    )
}

export default SelectBaseOptionMediaPartnerType
