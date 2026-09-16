import FormSelectOption from '@/component/form/FormSelectOption.tsx'
import { listTemplatePages } from '@/config/pageTemplate.config.ts'

const PageSelectTemplate = ({
    label = '',
    required = false,
    name = 'template',
    ...rest
}: {
    label?: string
    required?: boolean
    name?: string
    className?: string
    [key: string]: any
}) => {
    return (
        <FormSelectOption
            label={label}
            required={required}
            name={name}
            {...rest}>
            <option value="">- Select Template -</option>
            {listTemplatePages.map((vm, index) => (
                <option value={vm.value} key={index}>
                    {vm.label}
                </option>
            ))}
        </FormSelectOption>
    )
}

export default PageSelectTemplate
