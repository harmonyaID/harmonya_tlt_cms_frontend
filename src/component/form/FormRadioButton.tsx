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
        isGetDefaultValue = true,
    } = props

    const { dataValue } = useComponentInputConfigHook(
        ctx,
        props?.actions?.onChange || null,
        props.name,
        props.value,
    )

    const dataId = id || 'form-radio-btn-' + props.name + uniqueId

    const _handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, isChecked } = eventChange(e)
        const exactValue = isGetDefaultValue ? props.defaultValue : value

        if (!_.isEmpty(ctx.__value) && isUseHook) {
            if (nameOfChange && _.isFunction(ctx.__actions[nameOfChange])) {
                ctx.__actions[nameOfChange](name, exactValue, isChecked)
            } else {
                ctx.__handleChange(name, exactValue, isChecked)
            }
        } else {
            actions.onChange(name, exactValue, e)
        }
    }

    const _handleNormalizeBool = (val) => {
        if (val === null || val === undefined) return '0'

        if (typeof val === 'boolean'){
            return String(Number(val))
        }

        return String(val)
    }

    const isChecked =
        _handleNormalizeBool(props.defaultValue) ===
        _handleNormalizeBool(dataValue)

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
