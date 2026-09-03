import { FC } from 'react'
import { Image } from 'iconsax-react'
import Card from '@/component/card/Card.tsx'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'
import {
    BadgeRequiredProps,
    ContentTitleProps,
    NotAvailableInTableProps,
    NotAvailableProps,
    NotAvailableWithLinkProps,
    TextIconLoadingProps,
    TextInTableProps,
    TextRequiredProps,
    TitleOfTabProps,
} from './type/general.type'

export const NotAvailable: FC<NotAvailableProps> = ({
    text = 'Not Available',
    className = '',
    classNameContent = '',
    isCard = false,
    isUseDefaultMargin = true,
}) => {
    const UIMessage = () => (
        <h5
            className={joinClassNameHelper(
                'fw-400 text-neutral-300',
                classNameContent,
                {
                    'my-4': isUseDefaultMargin,
                },
            )}>
            {text}
        </h5>
    )

    return (
        <div className={joinClassNameHelper('row', className)}>
            <div className="col-md-12 text-center">
                {isCard ? (
                    <Card>
                        <UIMessage />
                    </Card>
                ) : (
                    <UIMessage />
                )}
            </div>
        </div>
    )
}

export const Loading: FC<NotAvailableProps> = (props) => (
    <NotAvailable text="Loading..." {...props} />
)

export const TitleOfTab: FC<TitleOfTabProps> = ({
    title = '',
    className = '',
}) => <h5 className={joinClassNameHelper('fw-500', className)}>{title}</h5>

export const TextIconLoading: FC<TextIconLoadingProps> = ({
    name,
    isAction,
}) => {
    return isAction ? (
        <>
            <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>{' '}
            {name}
        </>
    ) : (
        name
    )
}

export const ContentTitle: FC<ContentTitleProps> = ({
    className = '',
    id,
    children,
}) => (
    <h2 className={joinClassNameHelper('h3 fw-600', className)} id={id}>
        {children}
    </h2>
)

export const BadgeRequired: FC<BadgeRequiredProps> = ({ className = '' }) => (
    <span className={joinClassNameHelper('badge badge-required', className)}>
        Required
    </span>
)

export const NotAvailableWithLink: FC<NotAvailableWithLinkProps> = ({
    action = {
        handleAdd: () => {},
    },
    classNameBtn = 'btn-primary',
    isAdd = true,
}) => (
    <div className="w-100 text-center py-4">
        <h5 className="text-neutral200 fw-400 mb-1">Not Available</h5>
        <p className="text-neutral-400 fw-300 mb-4">Please create new</p>

        {isAdd ? (
            <button
                type="button"
                className={joinClassNameHelper('btn btn-sm', classNameBtn)}
                onClick={action.handleAdd}>
                Add New
            </button>
        ) : null}
    </div>
)

export const TextInTable: FC<TextInTableProps> = ({
    colSpan,
    classNameTd = '',
    classNameText = '',
    text = 'Loading..',
}) => (
    <tr>
        <td colSpan={colSpan} className={classNameTd}>
            <h5
                className={joinClassNameHelper(
                    'fw-400 text-center text-neutral-200 pt-2',
                    classNameText,
                )}>
                {text}
            </h5>
        </td>
    </tr>
)

export const NotAvailableInTable: FC<NotAvailableInTableProps> = ({
    colSpan,
}) => <TextInTable colSpan={colSpan} text="Not Available" />

export const TextRequired: FC<TextRequiredProps> = ({
    title = '',
    className = '',
    isRequired = true,
}) => (
    <p className={className}>
        {title}
        {isRequired ? <span className="text-danger-200">*</span> : null}
    </p>
)

export const TextComingSoon = ({ className = '' }: { className?: string }) => (
    <h5
        className={joinClassNameHelper(
            'fw-400 text-center text-neutral-200',
            className,
        )}>
        Coming Soon
    </h5>
)

export const MediaNotAvailable = () => {
    return (
        <div className="hstack gap-3 justify-content-center fw-normal text-neutral-200 py-5">
            <div className="">
                <Image size="32" variant="Bulk" />
            </div>
            <div className="">
                <p className="mb-0 fs-20">Media Not Available</p>
            </div>
        </div>
    )
}
