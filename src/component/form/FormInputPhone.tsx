import PhoneInputWithCountrySelect from 'react-phone-number-input'
import LabelForm from '@/component/form/LabelForm.tsx'

const FormInputPhone = ({
    defaultCountry = 'AU',
    value,
    label,
    actions,
}: {
    defaultCountry?: any
    value: any
    label?: string
    actions: { onChange: (value) => void }
}) => {
    const BootstrapInput = (props: React.ComponentProps<'input'>) => (
        <input {...props} className="form-control" />
    )

    return (
        <>
            <LabelForm label={label} dataId="phoneInput" />

            <div className="form-group">
                <PhoneInputWithCountrySelect
                    id="phoneInput"
                    inputComponent={BootstrapInput}
                    defaultCountry={defaultCountry}
                    international
                    placeholder="Enter phone number"
                    value={value}
                    onChange={actions.onChange}
                />
            </div>
        </>
    )
}

export default FormInputPhone
