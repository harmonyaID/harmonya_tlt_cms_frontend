import { useId, ChangeEvent, FC } from 'react'
import _ from 'lodash'
import { useHookContextForm } from '@/context/Form.context.jsx'
import { eventChange } from '@/helper/base/actionEvent.helper.js'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import useComponentInputConfigHook from '@/hook/base/useComponentInputConfig.hook.js'
import { FormRadioButtonProps } from './type/componentForm.type'

const FormRadioButton: FC<FormRadioButtonProps> = (props) => {
    const uniqueId = useId()
    const ctx = useHookContextForm()

    const {
        id = '',
        className = '',
        classNameRadio = '',
        label = '',
        required = false,
        disabled = false,
        readOnly = false,
        actions = {
            onChange: () => {},
        },
        nameOfChange = '',
        isUseHook = true,
    } = props

    const { dataValue } = useComponentInputConfigHook(
        ctx,
        props?.actions?.onChange || null,
        props.name,
        props.value,
    )

    const dataId = id || 'form-radio-btn-' + props.name + uniqueId

    const _handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!_.isEmpty(ctx.__value) && isUseHook) {
            const { name, value, isChecked } = eventChange(e)
            if (nameOfChange && _.isFunction(ctx.__actions[nameOfChange])) {
                ctx.__actions[nameOfChange](name, value, isChecked)
            } else {
                ctx.__handleChange(name, value, isChecked)
            }
        } else {
            actions.onChange(props.name, props.value, e)
        }
    }

    const isChecked = props.defaultValue == dataValue

    return (
        <div
            className={joinClassNameHelper(
                'form-check form-check-input-tint-300',
                className,
            )}>
            <input
                className={joinClassNameHelper(
                    'form-check-input',
                    classNameRadio,
                )}
                type="radio"
                name={props.aliasName || props.name}
                value={props.defaultValue}
                checked={isChecked}
                onChange={(e) => _handleChange(e)}
                id={dataId}
                required={required}
                disabled={disabled}
                readOnly={readOnly}
            />
            <label className="form-check-label" htmlFor={dataId}>
                {label}
            </label>
        </div>
    )
}

export default FormRadioButton
