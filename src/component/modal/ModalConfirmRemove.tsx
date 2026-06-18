import { FC } from 'react'
import { MDGeneralRemove } from '@/config/modal.config'
import ModalConfirm from './ModalConfirm'
import { ModalConfirmRemoveProps } from './type/modal.type'

const ModalConfirmRemove: FC<ModalConfirmRemoveProps> = (props) => {
    return (
        <ModalConfirm
            id={props.id || MDGeneralRemove}
            title="Are you sure to remove?"
            titleButton={props.titleButton || 'Continue'}
            isLoading={props.isLoading}
            isMDRemove
            actions={{
                handleSubmit: props.handleDelete,
                handleCancel: props.closeModal,
            }}
            dataIcon={props.dataIcon || ''}
            children={props.children}
        />
    )
}

export default ModalConfirmRemove
