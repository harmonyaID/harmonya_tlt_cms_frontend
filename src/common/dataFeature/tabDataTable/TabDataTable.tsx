import { ReactNode } from 'react'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'

const TabDataTable = ({
    title,
    ths = [],
    api = {
        list: () => {},
    },

    content = {
        tr: (data = {}) => null,
    },

    placeholder = 'e.g Hotel',
    isPagination = true,
    isSearchBar = false,
}: {
    title?: string
    ths: any[]
    api: any
    content?: {
        tr?: (data: any) => ReactNode
    }
    placeholder?: string
    isPagination?: boolean
    isSearchBar?: boolean
}) => {
    const {
        __list,
        __isLoading,
        __search,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
        __actionChange,
        __actionClear,
    } = useDataListHook({
        urlAPI: (passData) => api.list(passData),
        advancedSearch: {
            page: isPagination ? 1 : 0,
        },
    })

    return (
        <>
            {title ? <h5 className="fs-18 fw-500 mb-3">{title}</h5> : null}

            {isSearchBar ? (
                <FilterBarBasic
                    formRequest={__search}
                    searchTextPlaceholder={placeholder}
                    isDateRange={false}
                    actions={{
                        change: __actionChange,
                        pagination: __actionPagination,
                        clear: __actionClear,
                    }}
                />
            ) : null}

            <div className="row overflow-y-auto position-relative">
                <div className="col-md-12">
                    <TableThemeLogic
                        isLoading={__isLoading}
                        isNoWrap
                        ths={ths}
                        tds={__list}>
                        {__list.map((vm, index) =>
                            content.tr({
                                key: index,
                                ...vm,
                            }),
                        )}
                    </TableThemeLogic>
                </div>
            </div>

            {isShowPagination(__isLoading, __list, __pagination) &&
            isPagination ? (
                <Pagination
                    onMove={(step) => __actionPagination(step)}
                    className="mt-2"
                    pagination={configDefaultPagination(
                        __pagination,
                        'totalPage',
                    )}
                />
            ) : null}
        </>
    )
}

export default TabDataTable
