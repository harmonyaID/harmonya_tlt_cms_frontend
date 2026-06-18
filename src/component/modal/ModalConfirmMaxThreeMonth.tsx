import { FC } from 'react'
import * as Icon from 'iconsax-react'
import _ from 'lodash'
import { MDGeneralFilterMaxThreeMonth } from '@/config/modal.config'
import actionModal from '@/helper/base/actionModal.helper'
import ModalMiddle from './ModalMiddle'
import { ModalConfirmMaxThreeMonthProps } from './type/modal.type'


const ModalConfirmMaxThreeMonth: FC<ModalConfirmMaxThreeMonthProps> = ({
    idModal = MDGeneralFilterMaxThreeMonth,
    textMaxRange = 'Max 6 Month',

    isUseHandleClose = false,
    actions = {
        handleClose: () => {},
    },
}) => {
    return (
        <ModalMiddle id={idModal} isCentered isHideClose isCloseAnywhere>
            <div className="text-center">
                <div className="text-danger-200 w-100">
                    <Icon.CalendarRemove size="72" variant="Bulk" />
                </div>

                <h5 className="text-neutral-100 mt-4">
                    Filter Date Range{' '}
                    <span className="text-blue-300">{textMaxRange}</span>
                </h5>

                <p className="fs-14 text-neutral-200 mb-4">
                    To maximize the search, the system limits the data range
                </p>

                <button
                    className="btn btn-sm btn-primary"
                    type="button"
                    onClick={() => {
                        if (
                            _.isFunction(actions.handleClose) &&
                            isUseHandleClose
                        ) {
                            actions.handleClose()
                        } else {
                            actionModal(idModal, true)
                        }
                    }}>
                    Close
                </button>
            </div>
        </ModalMiddle>
    )
}

export default ModalConfirmMaxThreeMonth
