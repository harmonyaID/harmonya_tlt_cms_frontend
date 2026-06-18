import { FC } from 'react'
import { LabelProps } from './type/componentForm.type'

const LabelForm: FC<LabelProps> = ({ label, dataId, required }) => {
    return label ? (
        <label htmlFor={dataId} className="form-label">
            {label}
            <span className="text-danger-200 fs-16">{required ? '*' : ''}</span>
        </label>
    ) : null
}

export default LabelForm
