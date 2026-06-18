import { FC } from 'react'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { BadgeStatusGeneralProps, BadgeYesOrNoProps } from './type/general.type'

export const BadgeYesOrNo: FC<BadgeYesOrNoProps> = ({ value = null }) => {
    return (
        <span
            className={
                'badge ' + (value ? 'bg-status-green-500' : 'bg-status-red-400')
            }>
            {value ? 'Yes' : 'No'}
        </span>
    )
}

export const BadgeActiveOrInactive: FC<BadgeYesOrNoProps> = ({
    value = null,
}) => {
    return (
        <span
            className={
                'badge ' + (value ? 'bg-status-green-500' : 'bg-status-red-400')
            }>
            {value ? 'Active' : 'Inactive'}
        </span>
    )
}

export const BadgeStatusGeneral: FC<BadgeStatusGeneralProps> = ({
    value = '',
    className = '',
    inTable = false,
    isRounded = true,
}) => {
    return (
        <span
            className={joinClassNameHelper('badge', className, {
                'rounded-pill': isRounded,
                'fs-12': inTable,
            })}>
            {value}
        </span>
    )
}
