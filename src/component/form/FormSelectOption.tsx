import { FC } from 'react'
import LabelForm from '@/component/form/LabelForm.tsx'
import { useHookContextForm } from '@/context/Form.context'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import useComponentInputConfigHook from '@/hook/base/useComponentInputConfig.hook'
import { FormSelectOptionProps } from './type/componentForm.type'

const FormSelectOption: FC<FormSelectOptionProps> = (props) => {
    const {
        id = '',
        children = '',
        className = '',
        classNameSelect = '',
        required = false,
        disabled = false,
        isUseHook = true,
        other,
    } = props

    const ctx = isUseHook ? useHookContextForm() : {}

    const { dataValue, handleChange } = useComponentInputConfigHook(
        ctx,
        props?.actions?.onChange || null,
        props.name,
        props.value,
    )

    const dataId = id || 'select-option-' + props.name

    return (
        <div className={joinClassNameHelper('form-group', className)}>
            <LabelForm {...props} dataId={dataId} />

            <select
                id={dataId}
                value={dataValue || ''}
                name={props.name}
                onChange={(e) => handleChange(e)}
                className={joinClassNameHelper('form-select', classNameSelect)}
                disabled={disabled}
                required={required}
                {...other}>
                {children}
            </select>
        </div>
    )
}

export default FormSelectOption
