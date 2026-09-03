import { ChangeEvent, FC } from 'react'
import LabelForm from '@/component/form/LabelForm.tsx'
import { useHookContextForm } from '@/context/Form.context'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import useComponentInputConfigHook from '@/hook/base/useComponentInputConfig.hook.ts'
import { FormInputProps } from './type/componentForm.type'

const FormRange: FC<FormInputProps> = (props) => {
    const ctx = useHookContextForm()

    const { dataValue, handleChange } = useComponentInputConfigHook(
        ctx,
        props?.actions?.onChange || null,
        props.name,
        props.value,
    )

    const {
        id = '',
        className = '',
        classNameInput = '',
        type = 'text',
        autoComplete = 'off',
        placeholder = '',
        icon = '',
        classNameIcon = '',

        required = false,
        disabled = false,
        readOnly = false,

        isNumberOnly = false,
        isCheckMinInput = false,
        isCheckMaxInput = false,

        handleIcon = () => {},

        min = '',
        max = '',
        other,
    } = props

    const dataId: string = id || 'text-input-' + props.name

    const handleOnInput = (event: ChangeEvent<HTMLInputElement>) => {
        if (isNumberOnly) {
            event.target.value = event.target.value.replace(/[^0-9]/g, '')
        }

        if (isCheckMinInput) {
            if (
                event.target.value.length > 1 &&
                event.target.value.startsWith('00')
            ) {
                event.target.value = event.target.value.replace(/^0+/, '0')
            }
        }

        if (isCheckMaxInput) {
            if (+event.target.value > +max) {
                event.target.value = event.target.value.slice(0, -1)
            }
        }
    }

    return (
        <div
            className={joinClassNameHelper('form-group w-100 px-3', className)}>
            <LabelForm {...props} dataId={dataId} />

            <div className="hstack gap-3 w-100 py-1">
                <input
                    id={dataId}
                    type={type}
                    value={Number(dataValue || 0)}
                    name={props.name}
                    onInput={handleOnInput}
                    onChange={handleChange}
                    className={joinClassNameHelper(
                        'form-range',
                        classNameInput,
                    )}
                    disabled={disabled}
                    min={min !== '' ? min : ''}
                    max={max !== '' ? max : ''}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    required={required}
                    {...other}
                />

                <span className={classNameIcon}>{dataValue || 0}</span>
            </div>
        </div>
    )
}

export default FormRange
