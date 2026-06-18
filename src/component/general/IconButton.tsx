import { FC } from 'react'
import * as Icon from 'react-feather'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { IconButtonBaseProps } from './type/general.type'

export const IconButtonArrowRight: FC<IconButtonBaseProps> = ({
    className = '',
    actions = {
        add: () => {},
    },
    disabled = false,
}) => {
    return (
        <button
            className={joinClassNameHelper(
                'icon-btn icon-btn-info border-0 rounded-circle p-1',
                className,
            )}
            onClick={actions.add}
            disabled={disabled}>
            <Icon.ChevronRight size={16} />
        </button>
    )
}

export const IconButtonRemove: FC<IconButtonBaseProps> = ({
    className = '',
    type = 'button',
    actions = {
        remove: () => {},
    },
    disabled = false,
}) => {
    return (
        <button
            type={type}
            className={joinClassNameHelper(
                'icon-btn icon-btn-danger border-0 rounded-circle p-1',
                className,
            )}
            onClick={(e) => {
                e.stopPropagation()
                actions.remove()
            }}
            disabled={disabled}>
            <Icon.Trash2 size={16} />
        </button>
    )
}

export const IconButtonEdit: FC<IconButtonBaseProps> = ({
    className = '',
    actions = {
        edit: () => {},
    },
    disabled = false,
    isUseDefaultClassName = true,
    iconSize = 16,
}) => {
    return (
        <button
            className={joinClassNameHelper(
                'icon-btn-info border-0 rounded-circle',
                className,
                {
                    'icon-btn p-1': isUseDefaultClassName,
                },
            )}
            onClick={(e) => {
                e.stopPropagation()
                actions.edit()
            }}
            disabled={disabled}>
            <Icon.Edit size={iconSize} />
        </button>
    )
}

export const IconBtnCopy: FC<IconButtonBaseProps> = ({
    className = '',
    actions = { handle: () => {} },
}) => {
    return (
        <button
            className={joinClassNameHelper(
                'hover-opacity-75 ms-2 circular avatar-24 d-flex align-items-center justify-content-center bg-neutral-200 text-white border-0',
                className,
            )}
            title="Copy"
            onClick={actions.handle}>
            <Icon.Copy size={16} />
        </button>
    )
}
