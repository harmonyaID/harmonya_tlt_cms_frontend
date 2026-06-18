import { FC, useState } from 'react'
import * as Icon from 'react-feather'
import FormInput from '@/component/form/FormInput'
import { FormInputPasswordProps } from './type/componentForm.type'

const FormInputPassword: FC<FormInputPasswordProps> = ({
    name = 'password',
    label,
    id = '',
    required = false,
    readOnly = false,
    actions,
}) => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

    const _handleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    return (
        <FormInput
            id={id}
            name={name}
            label={label}
            className="fm-with-icon"
            classNameIcon="text-neutral-300 icon-input cursor-pointer"
            type={isShowPassword ? 'text' : 'password'}
            icon={
                isShowPassword ? (
                    <Icon.Eye size="18" />
                ) : (
                    <Icon.EyeOff size="18" />
                )
            }
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            handleIcon={_handleShowPassword}
            required={required}
            readOnly={readOnly}
            actions={actions}
        />
    )
}

export default FormInputPassword
