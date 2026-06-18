import { FC } from 'react'
import { BtnPrimary } from '@/component/general/Button'
import { TextIconLoading } from '@/component/general/TextDefault'
import ModalMiddle from '@/component/modal//ModalMiddle'
import { MDGeneralConfirm } from '@/config/modal.config'
import { ModalConfirmProps } from './type/modal.type'


const ModalConfirm: FC<ModalConfirmProps> = ({
    id = MDGeneralConfirm,
    title = 'Are you sure to logout?',
    titleButton = 'Submit',
    isLoading = false,
    isOutlineCancel = false,
    isOutlineSubmit = true,
    isMDRemove = false,
    actions = {
        handleSubmit: () => {},
        handleCancel: () => {},
    },
    dataIcon = '',
    children = '',
}) => {
    return (
        <ModalMiddle id={id} width={500} isHideClose isCentered isRemoveConfirm>
            <div className={'row ' + (isMDRemove ? 'mb-2' : 'mb-3')}>
                <div className="col-md-12 text-center">
                    {dataIcon || ''}

                    {isMDRemove ? (
                        <h5 className="mb-2">{title}</h5>
                    ) : (
                        <h5 className="fw-400 mb-0">{title}</h5>
                    )}

                    {children}
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 text-center">
                    <BtnPrimary
                        isOutline={isOutlineCancel}
                        disabled={isLoading}
                        handle={actions.handleCancel}
                        className="btn-sm me-2">
                        Cancel
                    </BtnPrimary>

                    <BtnPrimary
                        isOutline={isOutlineSubmit}
                        disabled={isLoading}
                        handle={actions.handleSubmit}
                        className="btn-sm">
                        <TextIconLoading
                            name={titleButton}
                            isAction={isLoading}
                        />
                    </BtnPrimary>
                </div>
            </div>
        </ModalMiddle>
    )
}

export default ModalConfirm
