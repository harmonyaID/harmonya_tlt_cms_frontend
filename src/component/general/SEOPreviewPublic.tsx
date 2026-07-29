import Image from 'rc-image'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
import CardTitle from '@/component/card/CardTitle.tsx'
import {
    TblLineFirst,
    TblLineFirstPrimary,
    TblLineSecond,
} from '@/component/general/TablePartial.tsx'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'

const placeholderTitle = 'Meta Title will be here'
const placeholderDesc =
    'Long meta description will be here. It will shows on Google Search.'

const SEOPreviewPublic = ({
    urlPhoto = '',
    sectionTitle = 'Preview',
    title = '',
    description = '',
    className = '',
}: {
    urlPhoto?: string
    sectionTitle?: string | null
    title?: string
    description?: string
    className?: string
}) => {
    return (
        <>
            {sectionTitle ? (
                <p className="mb-2 fs-13 fw-500">{sectionTitle}</p>
            ) : null}

            <div
                className={joinClassNameHelper(
                    'card card-body border border-neutral-500 bg-neutral-600',
                    className,
                )}>
                <div className="row gx-3">
                    {urlPhoto ? (
                        <div
                            className="col-auto"
                            onClick={(e) => e.stopPropagation()}>
                            <div className="position-relative float-end">
                                <div className="overflow-hidden rounded position-relative">
                                    <div
                                        className="wp-img-preview"
                                        onClick={() => {}}>
                                        <Image
                                            src={urlPhoto}
                                            alt="Preview File"
                                            fallback={ImgGeneralDefault}
                                            className="data-img data-img-contain avatar-46"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    <div className="col-lg">
                        <div className="vstack flex-wrap gap-1">
                            <TblLineFirstPrimary
                                value={title || placeholderTitle}
                                isUseDefaultMargin={false}
                                className="mb-0 fs-18 fw-400"
                            />

                            <p className="text-neutral-300 mb-0 fs-12 text-dots-base text-dots-base-line-2">
                                {description || placeholderDesc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SEOPreviewPublic
