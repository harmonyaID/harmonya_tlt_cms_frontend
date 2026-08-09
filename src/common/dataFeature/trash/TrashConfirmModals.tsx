import ModalConfirm from '@/component/modal/ModalConfirm.tsx'
import {
    MDGeneralPermanentRemove,
    MDGeneralRestore,
} from '@/config/modal.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'

const TrashConfirmModals = ({actions, isLoading, name}:{
    name: string,
    isLoading: boolean,
    actions?: {
        handleRestore: () => void,
        handlePermanentRemove: () => void,
    }
}) => {
    return (
        <>
            <ModalConfirm
                isMDRemove
                id={MDGeneralRestore}
                title={`Restore: ${name}`}
                actions={{
                    handleSubmit: actions?.handleRestore,
                    handleCancel: () => {
                        actionModal(MDGeneralRestore, true)
                    },
                }}
                titleButton="Restore"
                isLoading={isLoading}>
                <p className="text-neutral-400 mt-2 fs-16">
                    This will restore the deleted data
                </p>
            </ModalConfirm>

            <ModalConfirm
                isMDRemove
                id={MDGeneralPermanentRemove}
                title={`Permanently Delete: ${name}`}
                actions={{
                    handleSubmit: actions?.handlePermanentRemove,
                    handleCancel: () => {
                        actionModal(MDGeneralPermanentRemove, true)
                    },
                }}
                titleButton="Delete"
                isLoading={isLoading}>
                <p className="text-neutral-400 mt-2 fs-16">
                    This will permanently delete the data
                </p>
            </ModalConfirm>
        </>
    )
}

export default TrashConfirmModals