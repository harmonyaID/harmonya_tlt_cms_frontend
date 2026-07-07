import ModalConfirm from '@/component/modal/ModalConfirm.tsx'
import { ReactNode, useState } from 'react'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { isSuccess } from '@/helper/base/condition.helper.ts'
import { BaseModalActionConfig } from '@/common/misc/type/misc.type.ts'
import { MDGeneralConfirm } from '@/config/modal.config.ts'

interface Props {
    children?: ReactNode
    id?: string
    message?: string
    title?: string
    titleButton?: string
    messageClassName?: string
    configHandle?: BaseModalActionConfig
}

const defaultDataConfig = {
    urlAPI: () => new Promise<any>(() => {}),
    callBack: () => {},
    emptySelect: () => {},
}

const ModalConfirmGeneral = ({
    id = MDGeneralConfirm,
    children = '',
    title,
    titleButton,
    configHandle = { ...defaultDataConfig },
}: Props) => {
    const passConfigHandle = { ...defaultDataConfig, ...configHandle }

    const [isLoading, setIsLoading] = useState(false)

    const _handleCloseModal = () => {
        actionModal(id, true)
        passConfigHandle.emptySelect()
    }

    const _handleSubmit = () => {
        setIsLoading(true)

        configHandle
            .urlAPI()
            .then((resData) => {
                setIsLoading(false)

                if (isSuccess(resData)) {
                    passConfigHandle.callBack(resData?.result)
                }

                _handleCloseModal()
            })
            .catch((err) => {
                setIsLoading(false)
            })
    }

    return (
        <ModalConfirm
            id={MDGeneralConfirm}
            title={title}
            titleButton={titleButton || 'Continue'}
            isLoading={isLoading}
            isMDRemove
            actions={{
                handleSubmit: _handleSubmit,
                handleCancel: _handleCloseModal,
            }}>
            {children}
        </ModalConfirm>
    )
}

export default ModalConfirmGeneral
