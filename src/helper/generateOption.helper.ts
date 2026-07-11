export const generateOptionByLength = (length: number) => {
    const max = length ? length : length || 1

    return Array.from({ length: max }, (_, i) => i + 1)
}
