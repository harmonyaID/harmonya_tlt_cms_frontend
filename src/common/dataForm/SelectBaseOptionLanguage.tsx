import SelectBaseOption from '@/common/dataForm/SelectBaseOption.tsx'
import { SelectBaseOptionProps } from '@/common/dataForm/type/selectOption.type.ts'
import useLanguageStore from '@/store/useLanguage.store.ts'

const SelectBaseOptionLanguage = (props: SelectBaseOptionProps) => {
    const { __list, __isLoading } = useLanguageStore()

    return (
        <SelectBaseOption
            // label="Language"
            name="language"
            selectEmpty="- Select Language -"
            isRequired
            {...props}
            listStore={__list}
            isLoadingStore={__isLoading}
        />
    )
}

export default SelectBaseOptionLanguage
