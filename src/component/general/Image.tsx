import { FC } from 'react'
import { Image } from 'react-feather'
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
