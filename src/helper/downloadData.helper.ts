export const downloadBlob = (blob = new Blob(), filename = '') => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
}

export const downloadFromUrl = async (url = '', filename = 'gx-data') => {
    const res = await fetch(url)
    const blob = await res.blob()

    const blobUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.href = blobUrl
    a.download = filename
    a.click()

    setTimeout(() => URL.revokeObjectURL(blobUrl), 100)
}

// On Development
export const getFileSize = async (url: string): Promise<number> => {
    const controller = new AbortController()

    const response: Response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
    })

    const length: string | null = response.headers.get('content-length')

    controller.abort() // download

    return length ? Number(length) : 0
}

export const formatBytes = (bytes: number): string => {
    if (!bytes) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}

export const getFileSizeFormatted = async (url: string): Promise<string> => {
    const size = await getFileSize(url)
    return size ? formatBytes(size) : null
}
