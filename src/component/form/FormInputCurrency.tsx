import { FC } from 'react'
import { NumericFormat } from 'react-number-format'
import _ from 'lodash'
import { useHookContextForm } from '@/context/Form.context.js'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import useComponentInputConfigHook from '@/hook/base/useComponentInputConfig.hook'
import LabelForm from './LabelForm'
import { FormInputCurrencyProps } from './type/componentForm.type'

const FormInputCurrency: FC<FormInputCurrencyProps> = (props) => {
    const ctx = useHookContextForm()

    const { dataValue } = useComponentInputConfigHook(
        ctx,
        props?.actions?.change || null,
        props.name,
        props.value,
    )

    const {
        id = '',
        className = '',
        required = false,
        disabled = false,
        classNameInput = '',
        autoComplete = 'off',
        placeholder = 'Rp 200.000',
        readOnly = false,
        icon = '',
        classNameIcon = '',
        handleIcon = () => {},
        min = '',
        max = '',

        isAllowNegative = false,

        isUseHook = true,
        nameOfChange = 'change',

        other = {},

        actions = {
            onChange: () => {},
        },

        prefix = 'Rp ',
    } = props

    const dataId: string = id || 'text-currency-' + props.name

    const _handleChange = (values, sourceInfo) => {
        const { value } = values

        if (isUseHook) {
            ctx.__actions[nameOfChange](props.name, value)
        } else {
            actions.onChange(props.name, value)
        }
    }

    return (
        <div className={joinClassNameHelper('form-group', className)}>
            <LabelForm {...props} dataId={dataId} />

            <NumericFormat
                id={dataId}
                value={dataValue || ''}
                name={props.name}
                thousandSeparator={true}
                prefix={prefix}
                placeholder={placeholder}
                onValueChange={_handleChange}
                isAllowed={(values) => {
                    const { formattedValue, floatValue } = values

                    let isAction = true
                    if (max && +max > -1) {
                        isAction = formattedValue === '' || floatValue <= +max
                    }

                    return isAction
                }}
                allowNegative={isAllowNegative}
                readOnly={readOnly}
                required={required}
                disabled={disabled}
                min={min}
                max={max}
                autoComplete={autoComplete || 'off'}
                className={joinClassNameHelper('form-control', classNameInput)}
                {...other}
            />

            {icon ? (
                <span className={classNameIcon} onClick={handleIcon}>
                    {icon}
                </span>
            ) : null}
        </div>
    )
}

export default FormInputCurrency
