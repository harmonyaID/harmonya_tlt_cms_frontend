import { FC } from 'react'
import { VerticalDataPreviewProps } from './type/general.type'

const VerticalDataPreview: FC<VerticalDataPreviewProps> = ({
    title = '',
    content = '',
    className = 'pb-3',
    isLayoutContentDefault = true,
    subTitle = '',
    isTitle = true,
    classNameTitleColumn = '',
    classNameContentColumn = '',
}) => {
    return (
        <div className={className}>
            {isTitle ? (
                <div className={'mb-2 w-100 ' + classNameTitleColumn}>
                    <div className="text-neutral-300 fs-13">{title}</div>
                    {subTitle ? (
                        <div className="text-neutral-400 fs-12">{subTitle}</div>
                    ) : null}
                </div>
            ) : null}
            <div className={'w-100 ' + classNameContentColumn}>
                {isLayoutContentDefault ? (
                    <div className="text-neutral-100 fw-400 fs-14">
                        {content}
                    </div>
                ) : (
                    content
                )}
            </div>
        </div>
    )
}

export default VerticalDataPreview
