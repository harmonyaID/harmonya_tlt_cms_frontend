import { MediaNotAvailable } from '@/component/general/TextDefault.tsx'

const ContentMedia = ({
    src = '',
    type = 'image',
}: {
    src?: string
    type: 'video' | 'image' | string
}) => {
    return (
        <div className="max-h-148px w-100 bg-neutral-600 position-relative">
            {src ? (
                type === 'video' ? (
                    <video width="auto" height="100%" controls>
                        <source src={src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <img src={src} className="w-100 h-100" alt="" />
                )
            ) : (
                <MediaNotAvailable />
            )}
        </div>
    )
}

export default ContentMedia
