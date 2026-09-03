import Image from 'rc-image'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
import HoverZoom from '@/component/general/HoverZoom.tsx'
import { MediaNotAvailable } from '@/component/general/TextDefault.tsx'

const ContentMedia = ({
    src = '',
    type = 'image',
}: {
    src?: string
    type: 'video' | 'image' | string
}) => {
    return (
        <div className="relative max-h-148pxP ratio ratio-21x9 max-h-240px w-full overflow-hidden bg-neutral-600 border border-neutral-500 rounded-2">
            {src ? (
                type === 'video' ? (
                    <video
                        controls
                        width="100%"
                        height="100%"
                        className="block w-full h-full object-fit-contain">
                        <source src={src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <>
                        {/*<img*/}
                        {/*    src={src}*/}
                        {/*    className="block object-fit-contain mw-100 mh-100"*/}
                        {/*    alt=""*/}
                        {/*/>*/}

                        <HoverZoom />

                        <Image
                            src={src}
                            alt={src || ''}
                            fallback={ImgGeneralDefault}
                            prefixCls="d-flex justify-content-center"
                            className="data-img data-img-contain h-100 object-fit-contain"
                        />
                    </>
                )
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <MediaNotAvailable />
                </div>
            )}
        </div>
    )
}

export default ContentMedia
