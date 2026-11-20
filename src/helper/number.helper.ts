export const compactNumber = (value) =>
    Intl.NumberFormat('en', {
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 1,
    }).format(value)
