import { SelectBaseOptionStoreProps } from '@/common/dataForm/type/selectOption.type.ts'
import FormSelectOption from '@/component/form/FormSelectOption.tsx'

const SelectBaseOption = ({
    name = '',
    label = '',
    isRequired = false,
    selectEmpty = '- Select Option -',
    listStore = [],
    isLoadingStore,
    value = '',
    ...other
}: SelectBaseOptionStoreProps) => {
    return (
        <>
            <FormSelectOption
                label={label}
                name={name}
                required={isRequired}
                value={value}
                {...other}>
                {isLoadingStore ? (
                    <option value="">Loading..</option>
                ) : (
                    <option value="">
                        {selectEmpty || '- Select ' + label + ' -'}
                    </option>
                )}

                {listStore.map((vm, index) => (
                    <option key={index} value={vm.id || vm.value}>
                        {vm.name || vm.label}
                    </option>
                ))}
            </FormSelectOption>
        </>
    )
}

export default SelectBaseOption
