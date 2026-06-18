import { FC } from 'react'
import FormRadioButton from '@/component/form/FormRadioButton'
import LabelForm from '@/component/form/LabelForm.tsx'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { FormRadioButtonMultiProps } from './type/componentForm.type'

const FormRadioButtonMulti: FC<FormRadioButtonMultiProps> = (props) => {
    const {
        id = '',
        className = '',
        classNameRow = '',
        checkBoxs = [],
        required = false,
        disabled = false,
        readOnly = false,
        actions = {
            onChange: null,
        },
        isUseHook = true,
    } = props

    const dataId: string = id || 'radio-btn-multi-' + props.name

    return (
        <>
            <div className={joinClassNameHelper('form-group', className)}>
                <LabelForm {...props} dataId={dataId} />

                <div className={joinClassNameHelper('row', classNameRow)}>
                    {checkBoxs?.map((data, index) => (
                        <div className="col-auto" key={index}>
                            <FormRadioButton
                                value={props.value}
                                name={props.name}
                                actions={{ ...actions }}
                                defaultValue={data.defaultValue}
                                label={data.label}
                                required={required}
                                disabled={disabled}
                                readOnly={readOnly}
                                aliasName={props.aliasName}
                                nameOfChange={
                                    props.nameOfChange || '_handleChange'
                                }
                                isUseHook={isUseHook}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default FormRadioButtonMulti
