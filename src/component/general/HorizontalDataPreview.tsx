import { FC } from 'react'
import { HorizontalDataPreviewProps } from './type/general.type'

const HorizontalDataPreview: FC<HorizontalDataPreviewProps> = ({
    title = '',
    content = '',
    isLayoutContentDefault = true,
    isLayoutTitleDefault = true,
    subTitle = '',
    classNameTitleColumn = 'col-md-3',
    classNameContentColumn = 'col-md-8',
}) => {
    return (
        <div className="row pb-md-3 pb-4">
            <div className={'mb-2 mb-md-0 ' + classNameTitleColumn}>
                {isLayoutTitleDefault ? (
                    <div className="text-neutral-300 fs-14P fs-13">{title}</div>
                ) : (
                    title
                )}

                {subTitle ? (
                    <div className="text-neutral-400 fs-12">{subTitle}</div>
                ) : null}
            </div>

            <div className={classNameContentColumn}>
                {isLayoutContentDefault ? (
                    <div className="text-neutral-100 fw-400 fs-16P fs-14">
                        {content}
                    </div>
                ) : (
                    content
                )}
            </div>
        </div>
    )
}

export default HorizontalDataPreview
