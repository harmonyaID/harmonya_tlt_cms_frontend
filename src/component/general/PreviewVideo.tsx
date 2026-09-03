import { ReactNode } from 'react'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'

export const WrapPreviewFileMedia = ({
    children,
    className = 'ratio-21x9 max-h-240px',
}: {
    children?: ReactNode
    className?: string
}) => {
    return (
        <div className={joinClassNameHelper('ratio', className)}>
            {children}
        </div>
    )
}

export const RenderPreviewVideo = ({
    src,
    type = 'video/mp4',
    width = '100%',
    height = '100%',
    classNameVideo = '',
}: {
    src?: string
    type?: string
    width?: string | number
    height?: string | number
    classNameVideo?: string
}) => {
    return (
        <>
            <video
                className={classNameVideo}
                width={width}
                height={height}
                controls>
                <source src={src} type={type} />
                Your browser does not support to play video.
            </video>
        </>
    )
}
