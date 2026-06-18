import { FC, ChangeEvent } from 'react'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { FormCheckboxProps } from './type/componentForm.type'

const FormCheckbox: FC<FormCheckboxProps> = (props) => {
    const id = 'checkbox-' + (props.id || '')

    const _handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (props.change) {
            props.change(e)
        }
    }

    return (
        <div
            className={joinClassNameHelper(
                'checkbox d-flex',
                props.className,
                !props.isDefault && 'theme-checkbox check-success',
                props.isCircle && 'checkbox-circle',
            )}>
            <input
                type="checkbox"
                name={props.name}
                onChange={_handleChange}
                value={props.value}
                checked={props.defaultChecked}
                className={
                    'form-check-input custom-control-input' +
                    (props.classNameInput ? ` ${props.classNameInput}` : '')
                }
                id={id}
                {...(props.other || {})}
            />
            <label
                className={
                    'form-check-label custom-control-label ps-2 text-break-all' +
                    (props.classNameLabel ? ` ${props.classNameLabel}` : '')
                }
                htmlFor={id}>
                {props.label}
            </label>
        </div>
    )
}

export default FormCheckbox
