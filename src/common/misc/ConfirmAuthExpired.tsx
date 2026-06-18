import * as Icon from 'iconsax-react'
import ModalMiddle from '@/component/modal/ModalMiddle'
import { MDTokenExpired } from '@/config/modal.config'

const ConfirmAuthExpired = () => {
    return (
        <>
            <ModalMiddle id={MDTokenExpired} width="300" isCentered isHideClose>
                <div className="text-center">
                    <div className="text-danger-200 w-100">
                        <Icon.CloudCross size="72" variant="Bulk" />
                    </div>

                    <h5 className="text-danger-200 mt-3">Expired Tokens</h5>

                    <p className="fs-14 text-neutral-200 mb-0">
                        This page will automatically redirect to the login page
                    </p>
                </div>
            </ModalMiddle>
        </>
    )
}

export default ConfirmAuthExpired
