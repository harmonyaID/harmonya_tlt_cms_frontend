import { FC } from 'react'
import { Image } from 'react-feather'
import RCImage from 'rc-image'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
import { imgError } from '@/helper/actionURLPhoto'

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

export const BoxImage = ({ src = '' }: { src?: string }) => {
    return (
        <div className="wp-img-preview" onClick={() => {}}>
            <RCImage
                src={src}
                alt="Preview File"
                fallback={ImgGeneralDefault}
                className="data-img data-img-contain avatar-46"
            />
        </div>
    )
}
