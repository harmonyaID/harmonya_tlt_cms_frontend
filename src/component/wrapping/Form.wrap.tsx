import { FC, FormEventHandler } from 'react'
import { FormWrapProps } from './type/wrapping.type'

const FormWrap: FC<FormWrapProps> = ({
    children,
    actions = {},
    className = '',
}) => {
    const { handleSubmit = () => {} } = actions

    const _handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        handleSubmit()
    }

    return (
        <form onSubmit={_handleSubmit} className={className}>
            {children}
        </form>
    )
}

export default FormWrap
