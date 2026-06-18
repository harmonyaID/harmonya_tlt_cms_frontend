import { FC } from 'react'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { PaginationProps } from './type/general.type'

const Pagination: FC<PaginationProps> = (props) => {
    const pages: any[] = []

    if (!props.pagination) {
        return null
    }

    if (props.pagination.totalPages > 1) {
        if (props.pagination.totalPages <= 6) {
            for (let i = 0; i < props.pagination.totalPages; i++) {
                pages.push(
                    <li
                        key={i}
                        onClick={() => props.onMove(i + 1)}
                        className={
                            props.pagination.currentPage === i + 1
                                ? 'active'
                                : ''
                        }>
                        <p className="mb-0">{i + 1}</p>
                    </li>,
                )
            }
        } else {
            // Check
            let checkEnd: number = 0
            if (props.pagination.totalPages > props.pagination.currentPage) {
                checkEnd =
                    props.pagination.totalPages - props.pagination.currentPage
            }

            // Start
            let startLoop: number = props.pagination.currentPage - 1
            if (props.pagination.totalPages === props.pagination.currentPage) {
                startLoop = props.pagination.currentPage - 6
            } else if (checkEnd < 6) {
                startLoop = props.pagination.totalPages - 6
            }

            // End
            let endLoop: number = 5
            if (props.pagination.totalPages === props.pagination.currentPage) {
                endLoop = props.pagination.currentPage - 1
            } else if (checkEnd < 6) {
                endLoop = props.pagination.totalPages - 1
            } else if (props.pagination.currentPage !== 1) {
                endLoop = 4 + props.pagination.currentPage
            }

            for (let i = startLoop; i <= endLoop; i++) {
                pages.push(
                    <li
                        key={i}
                        onClick={() => props.onMove(i + 1)}
                        className={
                            props.pagination.currentPage === i + 1
                                ? 'active'
                                : ''
                        }>
                        <p className="mb-0">{i + 1}</p>
                    </li>,
                )
            }
        }

        // Prev Button if exist
        if (props.pagination.links.previous) {
            pages.unshift(
                <li
                    key={'prev'}
                    onClick={() =>
                        props.onMove(props.pagination.currentPage - 1)
                    }>
                    <span className="mb-0">
                        <i className="bi bi-chevron-left" />
                    </span>
                </li>,
            )
        }

        // Next Button if exist
        if (props.pagination.links.next) {
            pages.push(
                <li
                    key={'next'}
                    onClick={() =>
                        props.onMove(props.pagination.currentPage + 1)
                    }>
                    <span className="mb-0">
                        <i className="bi bi-chevron-right" />
                    </span>
                </li>,
            )
        }

        // First Button and Last Button if > 6
        if (props.pagination.totalPages > 6) {
            if (props.pagination.currentPage !== 1) {
                pages.unshift(
                    <li key={'first'} onClick={() => props.onMove(1)}>
                        <span className="mb-0">
                            <i className="bi bi-chevron-double-left" />
                        </span>
                    </li>,
                )
            }

            pages.push(
                <li
                    key={'last'}
                    onClick={() => props.onMove(props.pagination.totalPages)}>
                    <span className="mb-0">
                        <i className="bi bi-chevron-double-right" />
                    </span>
                </li>,
            )
        }
    }

    return (
        <div className={joinClassNameHelper('row', props.className)}>
            <div className="col-md-12">
                <div className="float-md-start">
                    <p className="text-end mt-1">
                        Results {props.pagination.count} of{' '}
                        {props.pagination.total}
                    </p>
                </div>
                <div className="float-md-end">
                    <ul className={'pagination d-inline-block'}>{pages}</ul>
                </div>
            </div>
        </div>
    )
}

export default Pagination
