import { FC } from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { SelectOptionProps } from '@/type/form.type'

const SelectOption: FC<SelectOptionProps> = (props) => {
    const {
        id = '',
        name = '',
        className,
        label = '',
        required = false,
        value = '',
        disabled = false,
        onChange = () => {},
        placeholder = '',
        options = [],
        isClearable = false,
        isMulti = false,
        otherConfigStyles = {},
        others,
        isCreatable = false,
    } = props

    const myId = id || 'select-option-search-' + name
    const colourStyles = {
        control: (styles, { isFocused }) => {
            return {
                ...styles,
                borderColor: !isFocused
                    ? 'var(--gx-input-border-color)'
                    : 'var(--gx-input-border-color)',
                borderWidth: '1px',
                boxShadow: !isFocused ? '' : '0 0 0 1px var(--bs-body-color)',
                ':hover': {
                    borderColor: !isFocused
                        ? 'var(--bs-tint-300)'
                        : 'var(--gx-input-border-color)',
                    borderWidth: '1px',
                },
                borderRadius: '8px',
            }
        },
        option: (styles, { isFocused }) => {
            return {
                ...styles,
                backgroundColor: isFocused
                    ? 'var(--bs-tint-300)'
                    : 'var(--bs-white-mood-theme)',
                color: isFocused ? 'var(--bs-black)' : 'var(--bs-neutral-100)',

                ':hover': {
                    backgroundColor: 'var(--bs-tint-300)',
                    color: 'var(--bs-black)',
                },
            }
        },
        singleValue: (styles, { data }) => {
            return {
                ...styles,
                color: 'var(--bs-neutral-200)',
            }
        },
        input: (styles) => {
            return {
                ...styles,
                color: 'var(--bs-neutral-200)',
            }
        },
        menu: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: 'var(--bs-white-mood-theme)',
            borderRadius: '8px',
            zIndex: '1055',
        }),
        ...otherConfigStyles,
    }

    return (
        <div className={'form-group ' + className}>
            {label ? (
                <label htmlFor={myId} className="form-label">
                    {label}
                    <span className="text-danger-200 fs-16">
                        {required ? '*' : ''}
                    </span>
                </label>
            ) : null}

            {isCreatable ? (
                <CreatableSelect
                    id={myId}
                    name={name || 'react-select'}
                    placeholder={placeholder || 'e.g: Example'}
                    value={value}
                    onChange={onChange}
                    required={required}
                    isDisabled={disabled}
                    options={options}
                    isMulti={isMulti}
                    classNamePrefix="slc-gx"
                    styles={colourStyles}
                    {...others}
                />
            ) : (
                <Select
                    id={myId}
                    name={name || 'react-select'}
                    placeholder={placeholder || 'e.g: Example'}
                    value={value}
                    onChange={onChange}
                    required={required}
                    isDisabled={disabled}
                    options={options}
                    isMulti={isMulti}
                    classNamePrefix="slc-gx"
                    styles={colourStyles}
                    isClearable={isClearable}
                    {...others}
                />
            )}
        </div>
    )
}

export default SelectOption
