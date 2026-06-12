export const sortDataByKey = <T>(
    data: T[],
    key: keyof T,
    order: 'asc' | 'desc' = 'asc',
): T[] => {
    return [...data].sort((a, b) => {
        const valA = a[key]
        const valB = b[key]

        if (valA === valB) return 0

        if (order === 'asc') {
            return valA > valB ? 1 : -1
        } else {
            return valA < valB ? 1 : -1
        }
    })
}
