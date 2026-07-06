'use client'
import { useEffect, useId, FC, ChangeEvent } from 'react'
import flatpickr from 'flatpickr'
import _, { isEmpty, isFunction } from 'lodash'
import 'flatpickr/dist/flatpickr.min.css'
import { useHookContextForm } from '@/context/Form.context'
import { eventChange } from '@/helper/actionEvent.helper'
import { FormInputTimePickerProps } from './type/componentForm.type'

const FormInputTimePicker: FC<FormInputTimePickerProps> = (props) => {
    const ctx = useHookContextForm()
    const defaultId = useId()

    const {
        id = '',
        className = '',
        classInput = '',
        label = '',
        required = false,
        disabled = false,
        autoComplete = 'off',
        placeholder = '00:00',
        format = 'H:i',
        readOnly = true,
        actions = {
            onChange: () => {},
        },
        config = {},
        other,

        isTimeRange = false,
        isResetValue = true,

        isHook = true,
    } = props

    const idInput = id || 'text-timepicker-' + (props.name || '') + defaultId

    const dataValue =
        (isHook && !isEmpty(ctx.__value) && ctx.__value[props.name]) ||
        props.value ||
        ''

    const _handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = eventChange(event)

        isFunction(ctx.__handleChange) && isEmpty(ctx.__value) && isHook
            ? ctx.__handleChange(name, value)
            : actions.onChange(name, value, event)
    }

    const _configTimePicker = (element = null) => {
        const has12HourFormat = /[hHgG]/.test(format) && /K/i.test(format)

        return flatpickr(element, {
            enableTime: true,
            altFormat: format,
            // altInput: true,
            allowInput: true,
            noCalendar: true,
            dateFormat: format,
            // time_24hr: true,
            static: true,
            time_24hr: !has12HourFormat,
            onReady: _handleClearBtn,
            ...config,
        })
    }

    const _handleClearBtn = (
        dateObj: object | any,
        dateStr: string | any,
        instance: any,
    ) => {
        const container = instance.calendarContainer

        if (container.querySelector('.btn-flatpickr-clear') === null) {
            const clearButton = document.createElement('div')
            clearButton.classList.add(
                'btn-flatpickr-clear',
                'btn',
                'btn-sm',
                'btn-gray-400',
                'd-block',
                'm-2',
            )
            clearButton.textContent = 'Clear'

            clearButton.addEventListener('click', function () {
                instance.clear()
                instance.close()
            })

            container.appendChild(clearButton)
        }
    }

    useEffect(() => {
        const modals = document.querySelectorAll('.modal')
        const elem = document.getElementById(idInput)
        const timePicker = _configTimePicker(elem)

        elem.addEventListener(
            'change',
            (e: ChangeEvent<HTMLInputElement> | any) => {
                _handleChange(e || {})
            },
        )

        // Handle in modal
        if (modals.length && isResetValue) {
            modals?.forEach((modal) => {
                modal?.addEventListener('shown.bs.modal', () => {
                    timePicker.setDate(timePicker.input.value || '', true)
                })

                modal?.addEventListener('hidden.bs.modal', () => {
                    timePicker.clear()
                })
            })
        }

        return () => {
            timePicker.destroy()
        }
    }, [])

    return (
        <>
            {!isTimeRange ? (
                <div className="wp-custom-timepicker">
                    <div
                        className={
                            'form-group' + (className ? ` ${className}` : '')
                        }>
                        {label ? (
                            <label htmlFor={idInput} className="form-label">
                                {label}
                                <span className="text-danger-200 fs-16">
                                    {required ? '*' : ''}
                                </span>
                            </label>
                        ) : null}

                        <input
                            id={idInput}
                            type="text"
                            value={dataValue}
                            name={props.name}
                            onChange={(e) => _handleChange(e)}
                            className={
                                'form-control' +
                                (classInput ? ` ${classInput}` : '')
                            }
                            disabled={disabled}
                            autoComplete={autoComplete}
                            placeholder={placeholder}
                            readOnly={readOnly}
                            required={required}
                            {...other}
                        />
                    </div>
                </div>
            ) : (
                <input
                    id={idInput}
                    type="text"
                    value={dataValue}
                    name={props.name}
                    onChange={(e) => _handleChange(e)}
                    className={
                        'form-control' + (classInput ? ` ${classInput}` : '')
                    }
                    disabled={disabled}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    required={required}
                    {...other}
                />
            )}
        </>
    )
}

export default FormInputTimePicker
