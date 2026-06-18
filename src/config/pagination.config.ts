type PaginationLinksType = {
    next: string | number | any
    previous: string | number | any
}

type PaginationType = {
    count: number
    currentPage: number
    links: PaginationLinksType
    perPage: number
    total: number
    totalPages: number
    [key: string]: any
}

export const passDataPagination = (
    count: number = 0,
    currentPage: number = 0,
    next: string | number | any = '',
    previous: string | number | any = '',
    perPage: number = 0,
    total: number = 0,
    totalPages: number = 0,
): PaginationType => ({
    count,
    currentPage,
    links: {
        next,
        previous,
    },
    perPage,
    total,
    totalPages,
})

export const configDefaultPagination = (
    pagination: Partial<PaginationType> = {},
    keyPage: string = 'totalPages',
) => {
    return passDataPagination(
        pagination?.count || 0,
        pagination?.currentPage || 0,
        pagination?.links?.next || '',
        pagination?.links?.previous || '',
        pagination?.perPage || 0,
        pagination?.total || 0,
        pagination[keyPage] || 0,
    )
}
