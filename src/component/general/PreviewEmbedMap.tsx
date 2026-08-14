import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'

const PreviewEmbedMap = ({
    src,
    className,
    isDefaultHeight = true,
}: {
    src?: string
    className?: string
    isDefaultHeight?: boolean
}) => {
    return (
        <div
            className={joinClassNameHelper(
                'w-100 position-relative',
                className,
                {
                    'max-h-148px': isDefaultHeight,
                },
            )}>
            <iframe
                // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d75255.57767416943!2d115.40225729051069!3d-8.692688057142671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd26d1fd9a2805d%3A0x53dd9b00e8e16da3!2sThe%20Lembongan%20Traveller!5e0!3m2!1sen!2sid!4v1783960380802!5m2!1sen!2sid"
                src={src}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
            />
        </div>
    )
}

export default PreviewEmbedMap
