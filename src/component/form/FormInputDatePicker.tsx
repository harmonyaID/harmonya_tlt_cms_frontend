import { useEffect, useId, FC, ChangeEvent } from 'react'
import * as Icon from 'react-feather'
import _ from 'lodash'
import { useHookContextForm } from '@/context/Form.context'
import { eventChange } from '@/helper/actionEvent.helper'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { FormInputDatePickerProps } from './type/componentForm.type'

const FormInputDatePicker: FC<FormInputDatePickerProps> = (props) => {
    const ctx = useHookContextForm()
    const defaultId = useId()

    const {
        id = '',
        className = '',
        classNameInput = '',
        label = '',
        required = false,
        disabled = false,
        clearButton = true,
        autoComplete = 'off',
        placeholder = '20/05/2023',
        format = 'dd/mm/yyyy',
        readOnly = true,
        actions = {
            onChange: () => {},
        },
        config = {},
        index = 0,
        other,
        isResetValue = true,
    } = props

    const idInput = id || 'text-datepicker-' + (props.name || '') + defaultId
    const idBtnClear = id + 'custom-clear' || 'custom-clear-btn' + defaultId

    const dataValue =
        (!_.isEmpty(ctx.__value) && ctx.__value[props.name]) ||
        props?.value ||
        ''

    const _handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = eventChange(event)

        _.isFunction(ctx.__handleChange) && !_.isEmpty(ctx.__value)
            ? ctx.__handleChange(name, value)
            : actions?.onChange(name, value, event)
    }

    const _configDatePicker = (
        element = null,
        Datepicker: object | any = {},
    ) => {
        return new Datepicker(element, {
            clearButton: true,
            buttonClass: 'btn',
            format: format,
            autohide: true,
            prevArrow: '‹',
            nextArrow: '›',
            ...config,
            // ... other config options
        })
    }

    useEffect(() => {
        // Dynamic import
        import('vanillajs-datepicker').then((module) => {
            const { Datepicker } = module.default || module

            const modals = document.querySelectorAll('.modal')
            const elem = document.getElementById(idInput)
            const customClearBtn = document.getElementById(idBtnClear)
            const datepicker = _configDatePicker(elem, Datepicker) || {}

            elem?.addEventListener(
                'changeDate',
                (e: ChangeEvent<HTMLInputElement> | any) => {
                    _handleChange(e || {})
                },
            )

            customClearBtn?.addEventListener('click', (e) => {
                datepicker.setDate({
                    clear: true,
                })
            })

            // Handle in modal
            if (modals.length && isResetValue) {
                modals?.forEach((modal) => {
                    modal?.addEventListener('shown.bs.modal', () => {
                        datepicker.update()
                    })

                    modal?.addEventListener('hidden.bs.modal', () => {
                        datepicker.setDate({
                            clear: true,
                        })
                    })
                })
            }
        })
    }, [index])

    return (
        <div className="wp-custom-datepicker">
            <div className={'form-group' + (className ? ` ${className}` : '')}>
                {label ? (
                    <label htmlFor={idInput} className="form-label">
                        {label}
                        <span className="text-danger-200 fs-16">
                            {required ? '*' : ''}
                        </span>
                    </label>
                ) : null}

                <div className="wp-input-group-append">
                    {required ? (
                        <input
                            value={dataValue}
                            onChange={(e) => _handleChange(e)}
                            required={required}
                            className="input-datepicker-ref"
                        />
                    ) : null}

                    <input
                        id={idInput}
                        type="text"
                        value={dataValue}
                        name={props.name}
                        onChange={(e) => _handleChange(e)}
                        className={joinClassNameHelper(
                            'form-control',
                            classNameInput,
                            {
                                'focus-required': required,
                            },
                        )}
                        disabled={disabled}
                        autoComplete={autoComplete}
                        placeholder={placeholder}
                        readOnly={readOnly}
                        {...other}
                    />

                    <button
                        id={idBtnClear}
                        className={
                            'custom-clear-btn bg-transparent border-0 text-danger-200 my-0 me-2 ' +
                            (clearButton && dataValue ? 'd-block' : 'd-none')
                        }
                        type="button">
                        <Icon.X size={14} strokeWidth={5} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FormInputDatePicker
