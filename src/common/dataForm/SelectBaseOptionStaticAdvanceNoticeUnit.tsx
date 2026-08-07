import SelectBaseOption from '@/common/dataForm/SelectBaseOption.tsx'
import { SelectBaseOptionProps } from '@/common/dataForm/type/selectOption.type.ts'
import useStaticPropertyAddressTypeStore from '@/store/useStaticPropertyAddressType.store.ts'
import useStaticPropertyAdvanceNoticeUnitStore from '@/store/useStaticPropertyAdvanceNoticeUnit.store.ts'
import useStaticPropertyStatusStore from '@/store/useStaticPropertyStatus.store.ts'

const SelectBaseOptionStaticAdvanceNoticeUnit = (
    props: SelectBaseOptionProps,
) => {
    const { __list, __isLoading } = useStaticPropertyAdvanceNoticeUnitStore()

    return (
        <SelectBaseOption
            label="Advance Notice Unit"
            name="advanceNoticeUnitId"
            selectEmpty="- Select Option -"
            {...props}
            listStore={__list}
            isLoadingStore={__isLoading}
        />
    )
}

export default SelectBaseOptionStaticAdvanceNoticeUnit
