import { FC, useRef } from 'react'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
import { defaultURLAvatarText } from '@/helper/base/generateAvatar.helper'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import {
    AvatarCardBoxNoImageProps,
    AvatarInTableProps,
    ConfigAvatarGeneralProps,
    UseCheckErrorLinkReturn,
} from './type/general.type'

const useCheckErrorLink = (
    srcDefault: string = '',
): UseCheckErrorLinkReturn => {
    const imageRef = useRef<HTMLImageElement>(null)

    const _handleCheckError = () => {
        if (imageRef.current) {
            imageRef.current.src = srcDefault || ImgGeneralDefault
        }
    }

    return {
        ref: imageRef,
        _handleCheck: _handleCheckError,
    }
}

// ============================= Config

const handleGeneralPositionCenter = (isCenter: boolean = true): string => {
    return isCenter ? 'align-items-center' : 'align-items-start'
}

const GeneralAvatarBadge: FC<ConfigAvatarGeneralProps> = ({
    badge,
    classNameBadge,
}) => {
    return badge ? (
        <span
            className={joinClassNameHelper(
                'badge float-right',
                classNameBadge,
            )}>
            {badge}
        </span>
    ) : null
}

export const AvatarCardCircle: FC<ConfigAvatarGeneralProps> = ({
    content = '',
    isCenter = false,
    srcDefault = '',
    classNameImg = '',
    className = '',
    src = '',
    alt = '',
    classNameBadge = '',
    title = '',
    classNameTitle = '',
    badge = '',
    subTitle = '',
}) => {
    const imgCheck = useCheckErrorLink(srcDefault)

    return (
        <div
            className={joinClassNameHelper(
                'd-flex',
                handleGeneralPositionCenter(isCenter),
                className,
            )}>
            <img
                ref={imgCheck.ref}
                onError={imgCheck._handleCheck}
                src={src}
                alt={alt}
                className={joinClassNameHelper(
                    'circular me-2 avatar-46',
                    classNameImg,
                )}
            />

            <div className="w-100 overflow-hidden">
                <GeneralAvatarBadge
                    badge={badge}
                    classNameBadge={classNameBadge}
                />

                {content}

                {title ? (
                    <p
                        className={joinClassNameHelper(
                            'mt-0 mb-1',
                            classNameTitle,
                        )}>
                        {title}
                    </p>
                ) : null}

                {subTitle ? (
                    <p className="fs-12 text-neutral-300 mb-0">{subTitle}</p>
                ) : null}
            </div>
        </div>
    )
}

export const AvatarCardBox: FC<ConfigAvatarGeneralProps> = ({
    isCenter = true,
    className = '',
    src = '',
    alt = '',
    classNameBadge = '',
    classNameImg = '',
    classNameTitle = '',
    badge = '',
    content = '',
    title = '',
    subTitle = '',
}) => {
    const imgCheck = useCheckErrorLink()

    return (
        <div
            className={joinClassNameHelper(
                'd-flex',
                handleGeneralPositionCenter(isCenter),
                className,
            )}>
            <img
                ref={imgCheck.ref}
                onError={imgCheck._handleCheck}
                src={src}
                alt={alt}
                className={joinClassNameHelper(
                    'b-rad-4 me-2 avatar-46',
                    classNameImg,
                )}
            />

            <div className="w-100 overflow-hidden">
                <GeneralAvatarBadge
                    badge={badge}
                    classNameBadge={classNameBadge}
                />

                {content}

                {title ? (
                    <p className={joinClassNameHelper('my-0', classNameTitle)}>
                        {title}
                    </p>
                ) : null}

                {subTitle ? (
                    <p className="fs-12 text-neutral-300 mb-0">{subTitle}</p>
                ) : null}
            </div>
        </div>
    )
}

export const AvatarCardBoxNoImage: FC<AvatarCardBoxNoImageProps> = ({
    isCenter,
    className = '',
    badge = '',
    classNameBadge = '',
    content = '',
    title = '',
    subTitle = '',
    classNameTitle = '',
}) => {
    return (
        <div
            className={joinClassNameHelper(
                'd-flex',
                handleGeneralPositionCenter(isCenter),
                className,
            )}>
            <div className="w-100 overflow-hidden">
                <GeneralAvatarBadge
                    badge={badge}
                    classNameBadge={classNameBadge}
                />

                {content}

                {title ? (
                    <p className={joinClassNameHelper('my-0', classNameTitle)}>
                        {title}
                    </p>
                ) : null}

                {subTitle ? (
                    <p className="fs-12 text-neutral-300 mb-0">{subTitle}</p>
                ) : null}
            </div>
        </div>
    )
}

export const AvatarInTable: FC<AvatarInTableProps> = ({
    title = 'By System',
    subTitle = '',
    src = '',
    content = '',
    classNameImg = 'avatar-32',
    classNameTitle = '',
    isSmall = false,
    isUseDefaultTitle = true,
    ...other
}) => (
    <AvatarCardCircle
        src={src || defaultURLAvatarText(title)}
        classNameImg={isSmall ? ' avatar-28 ' : classNameImg}
        isCenter
        content={
            <>
                <p
                    className={joinClassNameHelper(
                        'text-neutral-100 mb-0 text-ellipsis-line-1',
                        classNameTitle,
                        {
                            'fs-13': isSmall,
                        },
                    )}>
                    {isUseDefaultTitle ? title : false}
                </p>
                {content}
                {subTitle ? (
                    <p className={'small text-neutral-400 mb-0 fs-12'}>
                        {subTitle}
                    </p>
                ) : null}
            </>
        }
        {...other}
    />
)
