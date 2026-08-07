import SelectBaseOption from '@/common/dataForm/SelectBaseOption.tsx'
import { SelectBaseOptionProps } from '@/common/dataForm/type/selectOption.type.ts'
import useStaticPropertyGuestySyncStatusStore from '@/store/useStaticPropertyGuestySyncStatus.store.ts'

const SelectBaseOptionStaticGuestySyncStatus = (
    props: SelectBaseOptionProps,
) => {
    const { __list, __isLoading } = useStaticPropertyGuestySyncStatusStore()

    return (
        <SelectBaseOption
            label="Guesty Sync Status"
            name="guestySyncStatusId"
            selectEmpty="- Select Guesty Sync Status -"
            {...props}
            listStore={__list}
            isLoadingStore={__isLoading}
        />
    )
}

export default SelectBaseOptionStaticGuestySyncStatus
