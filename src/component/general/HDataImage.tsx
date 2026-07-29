import { ReactNode } from 'react'
import Image from 'rc-image'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
import { TblLineFirstPrimary } from '@/component/general/TablePartial.tsx'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'

const HDataImage = ({
    src,
    children,
    title = '',
    className = '',
    gap = '3',
}: {
    src?: string
    children?: ReactNode
    title?: string
    className?: string
    gap?: number | string | 1 | 2 | 3 | 4 | 5
}) => {
    const sizeGap = 'gap-' + gap
    return (
        <div className={joinClassNameHelper('hstack', sizeGap, className)}>
            <div className="position-relative">
                <div className="overflow-hidden rounded position-relative">
                    <div className="wp-img-preview" onClick={() => {}}>
                        <Image
                            src={src}
                            alt="Preview File"
                            fallback={ImgGeneralDefault}
                            className="data-img data-img-contain avatar-46"
                        />
                    </div>
                </div>
            </div>
            <div className="">
                {title ? (
                    <TblLineFirstPrimary
                        value={title}
                        isUseDefaultMargin={false}
                        className="mb-0 fw-600"
                    />
                ) : (
                    children
                )}
            </div>
        </div>
    )
}

export default HDataImage
