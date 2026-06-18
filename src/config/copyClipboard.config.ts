export const EXAMPLE_COPY_TYPE: string = 'example-copy-clipboard'

export const configCopyClipboard = {
    [EXAMPLE_COPY_TYPE]: (data) => virtualAccNumCopyClipboard(data),
}

export const virtualAccNumCopyClipboard = (data): string => {
    let notes = ``

    notes += `*BANK:* \n`
    notes += `*NUMBER:* \n`

    return notes
}
