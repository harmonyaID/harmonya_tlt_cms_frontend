import { ReactNode } from 'react'
import { MoreVertical } from 'react-feather'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { DropdownBtnPrimaryProps } from './type/general.type'

export const DropdownBtnPrimary = ({
    isOutline = false,
    classNameBtn = '',
    className = '',
    classNameDropdownMenu = '',
    isIcon = false,
    disabled = false,
    type = 'button',
    handle = () => {},
    title = '',
    icon,
    children,
}: DropdownBtnPrimaryProps) => (
    <div className={joinClassNameHelper('dropdown', className)}>
        <button
            className={joinClassNameHelper(
                'btn dropdown-toggle',
                isOutline ? 'btn-outline-primary' : 'btn-primary',
                classNameBtn,
                isIcon && 'd-flex align-items-center',
            )}
            disabled={disabled}
            type={type}
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={handle}>
            {title}
            {isIcon ? icon : null}
        </button>

        <ul
            className={
                'dropdown-menu' +
                (classNameDropdownMenu ? ` ${classNameDropdownMenu}` : '')
            }>
            {children}
        </ul>
    </div>
)

export const DropdownIconMore = ({
    // id = 'dw-more',
    children = null,
    classNameBtn = '',
    sizeIcon = 18,
}: {
    id?: string
    classNameBtn?: string
    children?: ReactNode
    sizeIcon?: string | number
}) => {
    return (
        <div className="dropdown dropdown-action text-end">
            <button
                className={joinClassNameHelper(
                    'btn border-0 dropdown-toggle btn-sm dropdown-toggle-icon',
                    classNameBtn,
                )}
                data-bs-toggle="dropdown"
                aria-expanded="false"
                type="button">
                <MoreVertical size={sizeIcon} />
            </button>

            <div className="dropdown-menu">{children}</div>
        </div>
    )
}
