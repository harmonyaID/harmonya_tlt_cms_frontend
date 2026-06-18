import { FC, HTMLAttributes } from 'react'
import { isEmpty, isNull, isObject } from 'lodash'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { TableThemeLogicProps, TrTextLoadProps } from './type/table.type'



const TrTextLoad: FC<TrTextLoadProps> = ({
    isLoading = true,
    colSpan = 1,
    text = 'Loading',
    className = '',
}) => (
    <tr className="">
        <td colSpan={colSpan} className="py-4">
            <h4
                className={joinClassNameHelper(
                    'fs-20 fw-400 text-center text-neutral-300 mb-0',
                    className,
                )}>
                {text}{' '}
                {isLoading ? (
                    <div
                        className="spinner-border tbl-spinner-load"
                        role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : null}
            </h4>
        </td>
    </tr>
)

const TableThemeLogic: FC<TableThemeLogicProps> = ({
    ths = [],
    tds = [],
    isLoading = false,
    className = '',
    classNameBgHead = 'tbl-head-bg-neutral-500',
    isHover = true,
    children,
    isNoWrap = false,
    isWrapHeader = false,
    isSelected = false,
    selectedId = '',
    id = '',
    classNameNotAvailable = '',
    titleRow,
}) => {
    const thsLength = ths.length
    const classTblHover = isHover && !isEmpty(tds)

    return (
        <>
            <table
                id={id}
                className={joinClassNameHelper(
                    'table table-custom-dashed',
                    className,
                    classNameBgHead,
                    {
                        'table-hover': classTblHover,
                    },
                )}>
                <thead>
                    <tr
                        className={isWrapHeader ? 'wp-tr-nowrap' : ''}
                        title={titleRow}>
                        {ths.map((th, idx) => {
                            let content: any = th
                            let className = ''
                            let attribute: HTMLAttributes<HTMLTableCellElement> =
                                {}
                            if (isObject(th)) {
                                content = th.content
                                className = th.className || ''
                                attribute = isObject(th.attribute)
                                    ? th.attribute
                                    : {}
                            }

                            return !isNull(content) ? (
                                <th
                                    className={className}
                                    key={idx}
                                    {...attribute}>
                                    {content}
                                </th>
                            ) : null
                        })}
                    </tr>
                </thead>

                <tbody>
                    {isLoading ? (
                        <TrTextLoad colSpan={thsLength} />
                    ) : !isEmpty(children) ? (
                        children
                    ) : tds?.length && !isEmpty(tds) ? (
                        tds.map((dataTd, indexTd) => {
                            const conditionSelected =
                                isSelected && indexTd === selectedId

                            return (
                                <tr
                                    key={indexTd}
                                    className={joinClassNameHelper(
                                        {
                                            'wp-tr-nowrap': isNoWrap,
                                        },
                                        {
                                            'table-active': conditionSelected,
                                        },
                                    )}>
                                    {dataTd.map((list: any, index) => {
                                        const content = list?.content || list
                                        const className = list?.className || ''

                                        const attribute =
                                            !isEmpty(list) &&
                                            isObject(list.attribute)
                                                ? list.attribute
                                                : {}

                                        return (
                                            <td
                                                className={className}
                                                key={index}
                                                {...attribute}>
                                                {content}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })
                    ) : (
                        <TrTextLoad
                            isLoading={false}
                            text="Not Available"
                            className={classNameNotAvailable}
                            colSpan={thsLength}
                        />
                    )}
                </tbody>
            </table>
        </>
    )
}

export default TableThemeLogic
