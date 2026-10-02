import FormInput from '@/component/form/FormInput.tsx'
import PhoneInputWithCountrySelect from 'react-phone-number-input'

const FormInputPhone = ({
    defaultCountry = 'AU',
    value,
    actions,
}: {
    defaultCountry?: any
    value: any
    actions: { onChange: (value) => void }
}) => {
    const BootstrapInput = (props: React.ComponentProps<'input'>) => (
        <input {...props} className="form-control" />
    )

    return (
        <div className="form-group">
            <PhoneInputWithCountrySelect
                inputComponent={BootstrapInput}
                defaultCountry={defaultCountry}
                international
                placeholder="Enter phone number"
                value={value}
                onChange={actions.onChange}
            />
        </div>
    )
}

export default FormInputPhone
