import { useMemo } from 'react'
import { getNames } from 'country-list'
import FormSelectOption from '@/component/form/FormSelectOption.tsx'

// Value stored is the country name (string)
const SelectOptionCountryList = ({ label = '', ...rest }: any) => {
    const countries = useMemo(() => getNames().sort(), [])

    return (
        <FormSelectOption label={label} {...rest}>
            <option value="">- Select Country -</option>
            {countries.map((name) => (
                <option key={name} value={name}>
                    {name}
                </option>
            ))}
        </FormSelectOption>
    )
}

export default SelectOptionCountryList
