import { FC, useState } from 'react'
import * as Icon from 'iconsax-react'
import ModalConfirmRemove from '@/component/modal/ModalConfirmRemove'
import { MDGeneralRemove } from '@/config/modal.config'
import actionModal from '@/helper/base/actionModal.helper'
import { isSuccess } from '@/helper/base/condition.helper'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { ConfirmRemoveListLogicProps } from './type/misc.type'


const defaultDataConfig = {
    urlAPI: () => new Promise<any>(() => {}),
    callBack: () => {},
    emptySelect: () => {},
}

const ConfirmRemoveListLogic: FC<ConfirmRemoveListLogicProps> = ({
    id = MDGeneralRemove,
    message = 'The data will be removed from the system forever and you will not be able to retrieve it later.',
    messageClassName = 'text-center',
    configHandle = { ...defaultDataConfig },
}) => {
    const passConfigHandle = { ...defaultDataConfig, ...configHandle }

    const [isLoading, setIsLoading] = useState(false)

    const _handleCloseModal = () => {
        actionModal(id, true)
        passConfigHandle.emptySelect()
    }

    const _handleRemove = () => {
        setIsLoading(true)

        configHandle
            .urlAPI()
            .then((resData) => {
                setIsLoading(false)

                if (isSuccess(resData)) {
                    passConfigHandle.callBack(resData.result)
                }

                _handleCloseModal()
            })
            .catch((err) => {
                console.log('err', err)
                setIsLoading(false)
            })
    }

    return (
        <ModalConfirmRemove
            id={id}
            isLoading={isLoading}
            handleDelete={_handleRemove}
            closeModal={_handleCloseModal}
            dataIcon={
                <div className="text-danger-200 text-center w-100 mb-3">
                    <Icon.Trash variant="Bulk" size="72" />
                </div>
            }>
            <div className="px-2 mb-4">
                <p
                    className={joinClassNameHelper(
                        'mb-0 small fs-14 text-danger-200P text-neutral-300',
                        messageClassName,
                    )}>
                    {message}
                </p>
            </div>
        </ModalConfirmRemove>
    )
}

export default ConfirmRemoveListLogic
