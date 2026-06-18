import { FC } from 'react'
import LabelForm from '@/component/form/LabelForm.tsx'
import { useHookContextForm } from '@/context/Form.context.tsx'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import useComponentInputConfigHook from '@/hook/base/useComponentInputConfig.hook.ts'
import { FormTextAreaProps } from './type/componentForm.type'


const FormTextArea: FC<FormTextAreaProps> = (props) => {
    const ctx = useHookContextForm()

    const { dataValue, handleChange } = useComponentInputConfigHook(
        ctx,
        props.actions?.onChange || null,
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
        placeholder = '',
        readOnly = false,
        rows = 3,
        cols = 4,
        other,
    } = props

    const dataId: string = id || 'text-area-' + props.name

    return (
        <div className={joinClassNameHelper('form-group', className)}>
            <LabelForm {...props} dataId={dataId} />

            <textarea
                value={dataValue || ''}
                onChange={handleChange}
                name={props.name}
                className={joinClassNameHelper('form-control', classNameInput)}
                id={dataId}
                autoComplete={autoComplete}
                placeholder={placeholder}
                rows={rows}
                cols={cols}
                readOnly={readOnly}
                required={required}
                disabled={disabled}
                {...other}
            />
        </div>
    )
}

export default FormTextArea
