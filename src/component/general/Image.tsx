import { FC } from 'react'
import { Image } from 'react-feather'
import RCImage from 'rc-image'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
import { imgError } from '@/helper/actionURLPhoto'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'

interface ImgInTableProps {
    src: string
    alt: string
    extraClass?: string
    extraClassImg?: string
}

export const ImgInTable: FC<ImgInTableProps> = ({
    src = '',
    extraClass = '',
    extraClassImg = '',
    alt = '',
}) => (
    <div className={'pv-image-tbl ' + extraClass + (!src ? ' is-empty ' : '')}>
        {src ? (
            <img
                src={src}
                className={extraClassImg}
                onError={imgError}
                alt={alt}
            />
        ) : (
            <>
                <Image />
                <p className="text-center fw-500 mb-0 mt-1">No Image</p>
            </>
        )}
    </div>
)

export const BoxImage = ({
    src = '',
    isSizeDefault,
    classNameImg = '',
}: {
    src?: string
    isSizeDefault?: boolean
    classNameImg?: string
}) => {
    return (
        <div className="wp-img-preview" onClick={() => {}}>
            <RCImage
                src={src}
                alt="Preview File"
                fallback={ImgGeneralDefault}
                className={joinClassNameHelper(
                    'data-img data-img-contain',
                    classNameImg,
                    {
                        'avatar-46': isSizeDefault,
                    },
                )}
            />
        </div>
    )
}
