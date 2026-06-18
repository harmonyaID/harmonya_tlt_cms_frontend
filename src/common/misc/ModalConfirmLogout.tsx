import { FC, useState } from 'react'
import { useNavigate } from 'react-router'
import { BtnPrimary } from '@/component/general/Button'
import ModalMiddle from '@/component/modal/ModalMiddle'
import { MDLogout } from '@/config/modal.config'
import actionModal from '@/helper/base/actionModal.helper'
import { isSuccess } from '@/helper/base/condition.helper'
import { manageClearTokenAuth } from '@/helper/base/manageAuth.helper'
import { ModalConfirmLogoutProps } from './type/misc.type'

const dataConfig = {
    urlAPI: async () => ({}),
}

const ModalConfirmLogout: FC<ModalConfirmLogoutProps> = ({
    configHandle = { ...dataConfig },
}) => {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    const _handleConfirmLogout = (isClose = false) => {
        actionModal(MDLogout, isClose)
    }

    const _handleActionLogout = () => {
        setIsLoading(true)

        configHandle
            .urlAPI()
            .then((resData) => {
                setIsLoading(false)

                if (isSuccess(resData)) {
                    manageClearTokenAuth()
                    navigate('/login')
                }
            })
            .catch((error) => {
                setIsLoading(false)
            })
            .finally(() => {
                _handleConfirmLogout(true)
            })
    }

    return (
        <ModalMiddle id={MDLogout} width={500} isHideClose>
            <div className="row mb-2">
                <div className="col-md-12">
                    <h5 className="text-center fw-400 mb-0">
                        Are you sure to logout? <br />
                        <span className="fs-14 text-neutral-400 d-block mt-2">
                            Select &ldquo;Continue&rdquo; below if you are ready
                            to end your current session.
                        </span>
                    </h5>
                </div>
            </div>

            <div className="row justify-content-end mt-4">
                <div className="col-12 text-center">
                    <BtnPrimary
                        disabled={isLoading}
                        handle={() => _handleConfirmLogout(true)}
                        className="btn-sm me-2">
                        Cancel
                    </BtnPrimary>

                    <BtnPrimary
                        isOutline
                        disabled={isLoading}
                        className="btn-sm"
                        handle={_handleActionLogout}>
                        Continue
                        {isLoading ? (
                            <div
                                className="spinner-border spinner-border-sm"
                                role="status">
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        ) : (
                            ''
                        )}
                    </BtnPrimary>
                </div>
            </div>
        </ModalMiddle>
    )
}

export default ModalConfirmLogout
