import { FC } from 'react'
import { BtnInfo, BtnPrimary } from './Button'
import { TextIconLoading } from './TextDefault'
import { FooterSubmitProps } from './type/general.type'

const FooterSubmit: FC<FooterSubmitProps> = (props) => {
    const {
        nameSubmit = 'Submit',
        nameCancel = 'Cancel',
        isLoading = false,
        handleCancel = () => {},
        isHideSubmit = false,
        position = 'right',
        contentColumnLeft = null,
        columnRightClassName = 'col-md',

        // Dropdown
        isDropdown = false,
    } = props

    const classPosition = {
        left: ' text-start',
        right: ' text-end',
        center: ' text-center',
    }

    return (
        <div className="wp-bottom-footer">
            <div className="container-fluid w-100">
                <div className="row align-items-center">
                    {contentColumnLeft}
                    <div
                        className={
                            columnRightClassName + classPosition[position]
                        }>
                        <BtnInfo
                            handle={handleCancel}
                            isOutline
                            className="mt-0"
                            disabled={isLoading}>
                            {nameCancel}
                        </BtnInfo>

                        {!isHideSubmit ? (
                            <BtnPrimary
                                className="ms-3 mt-0"
                                type="submit"
                                disabled={isLoading}>
                                <TextIconLoading
                                    name={nameSubmit}
                                    isAction={isLoading}
                                />
                            </BtnPrimary>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterSubmit
