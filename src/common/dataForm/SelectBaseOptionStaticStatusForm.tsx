import SelectBaseOption from '@/common/dataForm/SelectBaseOption.tsx'
import { SelectBaseOptionProps } from '@/common/dataForm/type/selectOption.type.ts'
import useStaticPropertyStatusStore from '@/store/useStaticPropertyStatus.store.ts'
import useStaticPropertyStatusFormStore from '@/store/useStaticPropertyStatusForm.store.ts'

const SelectBaseOptionStaticStatusForm = (props: SelectBaseOptionProps) => {
    const { __list, __isLoading } = useStaticPropertyStatusFormStore()

    return (
        <SelectBaseOption
            label="Status Form"
            name="statusFormId"
            selectEmpty="- Select Status Form -"
            {...props}
            listStore={__list}
            isLoadingStore={__isLoading}
        />
    )
}

export default SelectBaseOptionStaticStatusForm
