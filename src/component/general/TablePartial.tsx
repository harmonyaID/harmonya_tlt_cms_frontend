import { FC } from 'react'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import {
    TblLineDefaultProps,
    TblLineFirstPrimaryProps,
    TblPointDataProps,
    TextOnTableProps,
} from './type/general.type'

export const TblLineFirst: FC<TblLineDefaultProps> = ({
    children,
    value = '',
    className = '',
    isUseDefaultMargin = true,
}) => (
    <p
        className={joinClassNameHelper('text-neutral-100', className, {
            'mb-1': isUseDefaultMargin,
        })}>
        {value || children}
    </p>
)

export const TblLineFirstPrimary: FC<TblLineFirstPrimaryProps> = ({
    children,
    value = '',
    className = '',
    isUseDefaultMargin = true,
}) => (
    <p
        className={joinClassNameHelper('text-primary', className, {
            'mb-1': isUseDefaultMargin,
        })}>
        {value || children}
    </p>
)

export const TblLineSecond: FC<TblLineDefaultProps> = ({
    children,
    value = '',
    className = 'mb-2',
}) => (
    <p className={joinClassNameHelper('fs-13 text-neutral-300', className)}>
        {value || children}
    </p>
)

export const TextOnTable: FC<TextOnTableProps> = ({
    colSpan = 1,
    text = 'Loading..',
    className = '',
}) => (
    <tr>
        <td colSpan={colSpan} className="py-4">
            <h4
                className={joinClassNameHelper(
                    'fs-20 fw-400 text-center text-neutral-300 mb-0',
                    className,
                )}>
                {text}
            </h4>
        </td>
    </tr>
)

export const TblPointData: FC<TblPointDataProps> = ({
    title = '',
    children,
    value = '',
    className = '',
    classNameValue = '',
    isTextSmall = true,
    isUseDefaultValueTextColor = true,
    isUseDefaultMargin = true,
    isRequiredText = false,
}) => (
    <div
        className={joinClassNameHelper('text-neutral-400', className, {
            'mb-2': isUseDefaultMargin,
        })}>
        {title ? (
            <p className={(isTextSmall ? 'fs-12' : 'fs-13') + ' mb-1'}>
                {title}
                {isRequiredText ? (
                    <span className="text-danger-200">*</span>
                ) : null}
            </p>
        ) : null}

        <div
            className={joinClassNameHelper(
                isTextSmall ? 'fs-12' : 'fs-14',
                'fw-500 d-block',
                isUseDefaultValueTextColor && 'text-neutral-200',
                classNameValue,
            )}>
            {value || children}
        </div>
    </div>
)
