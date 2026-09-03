import FormSelectOption from '@/component/form/FormSelectOption.tsx'

const PageSelectStatus = ({
    label,
    required = false,
    name = 'status',
    ...rest
}: {
    label?: string
    required?: boolean
    name?: string
    className?: string
}) => {
    return (
        <FormSelectOption
            label={label}
            required={required}
            name={name}
            {...rest}>
            <option value="">- Select Status -</option>
            <option value="publish">Publish</option>
            <option value="draft">Draft</option>
        </FormSelectOption>
    )
}

export default PageSelectStatus
