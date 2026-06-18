import { FC } from 'react'
import RowForm from './RowForm'
import { RowFormProps } from './type/componentForm.type'

const GeneralRowForm: FC<RowFormProps> = ({
    children,
    label = '',
    isRequired = false,
    ...otherProps
}) => {
    return (
        <RowForm
            label={label}
            isRequired={isRequired}
            classNameColumnLabel="col-md-3 col-lg-3"
            classNameColumnChild="col-md-9"
            {...otherProps}>
            {children}
        </RowForm>
    )
}

export default GeneralRowForm
