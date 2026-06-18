import { FC, ReactNode, MouseEvent } from 'react'
import { Edit } from 'react-feather'
import { Printer, Send2, Trash } from 'iconsax-react'
import LoadingSpinner from '@/component/loading/LoadingSpinner.tsx'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { BtnBaseProps } from './type/general.type'


export const BtnBase = ({
    type,
    className,
    isDisabled,
    isLoading,
    handle,
    children,
    ...rest
}: BtnBaseProps) => (
    <button
        type={type}
        className={joinClassNameHelper('btn', className)}
        disabled={isDisabled}
        onClick={handle}
        {...rest}>
        {children} {isLoading ? <LoadingSpinner /> : null}
    </button>
)

export const BtnPrimary = ({
    type = 'button',
    className,
    isDisabled,
    isLoading,
    handle,
    children,
    isOutline,
    ...rest
}: BtnBaseProps) => {
    const configBtnClass: string = isOutline
        ? 'btn-outline-primary '
        : 'btn-primary '

    return (
        <BtnBase
            type={type}
            className={configBtnClass + className}
            isDisabled={isDisabled}
            isLoading={isLoading}
            onClick={handle}
            {...rest}>
            {children}
        </BtnBase>
    )
}

export const BtnInfo: FC<BtnBaseProps> = ({
    type = 'button',
    className,
    isDisabled,
    isLoading,
    handle,
    children,
    isOutline,
    ...rest
}) => {
    const configBtnClass: string = isOutline
        ? 'btn-outline-neutral-300 '
        : 'btn-neutral-300 '
    return (
        <BtnBase
            type={type}
            className={configBtnClass + className}
            isDisabled={isDisabled}
            isLoading={isLoading}
            onClick={handle}
            {...rest}>
            {children}
        </BtnBase>
    )
}

export const BtnDanger: FC<BtnBaseProps> = ({
    type = 'button',
    className,
    isDisabled,
    isLoading,
    handle,
    children,
    isOutline,
    ...rest
}) => {
    const configBtnClass: string = isOutline
        ? 'btn-outline-danger '
        : 'btn-danger '
    return (
        <BtnBase
            type={type}
            className={configBtnClass + className}
            isDisabled={isDisabled}
            isLoading={isLoading}
            onClick={handle}
            {...rest}>
            {children}
        </BtnBase>
    )
}

export const BtnCircle = ({
    icon,
    children,
    className,
    type = 'button',
    isDisabled = false,
    action,
}: {
    children?: ReactNode
    icon?: ReactNode
    className?: string
    isDisabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    action?: {
        onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    }
}) => (
    <button
        type={type}
        disabled={isDisabled}
        className={joinClassNameHelper('btn btn-circle-icon', className)}
        onClick={(e) => action?.onClick?.(e)}>
        {icon || children}
    </button>
)

export const BtnCircleRemove: FC<BtnBaseProps> = ({
    actions = { remove: () => {} },
    className = '',
}) => (
    <BtnBase
        onClick={actions.remove}
        className={joinClassNameHelper(
            'btn-danger-300 text-danger-100 btn-sm mt-0 btn-circle-icon',
            className,
        )}
        type="button">
        <Trash variant="Bold" size="16" />
    </BtnBase>
)

export const BtnCircleEdit: FC<BtnBaseProps> = ({
    actions = { edit: () => {} },
    className = '',
}) => (
    <BtnBase
        onClick={actions.edit}
        className={joinClassNameHelper(
            'btn-gray-300 text-black btn-sm mt-0 btn-circle-icon',
            className,
        )}
        type="button">
        <Edit size={16} strokeWidth={2.4} />
    </BtnBase>
)

export const BtnCirclePrint: FC<BtnBaseProps> = ({
    actions = { click: () => {} },
    className = '',
}) => (
    <BtnBase
        onClick={actions.click}
        className={joinClassNameHelper(
            'btn-neutral-500 text-black-100 btn-sm mt-0 btn-circle-icon',
            className,
        )}
        type="button">
        <Printer variant="Bold" size="16" />
    </BtnBase>
)

export const BtnCircleSend: FC<BtnBaseProps> = ({
    actions = { click: () => {} },
    className = '',
}) => (
    <BtnBase
        onClick={actions.click}
        className={joinClassNameHelper(
            'btn-neutral-500 text-black-100 btn-sm mt-0 btn-circle-icon',
            className,
        )}
        type="button">
        <Send2 variant="Bold" size="16" />
    </BtnBase>
)
