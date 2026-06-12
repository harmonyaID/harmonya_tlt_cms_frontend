import {
    FILE_GENERAL,
    listFormatFileImage,
    listFormatFileRenderInElementObject,
    listFormatFiles,
} from '@/config/file.config.ts'

const getExtensionFromUrl = (url: string): string => {
    const match = url.match(/\.([a-zA-Z0-9]+)(?:\?.*)?$/)
    return match ? match[1].toLowerCase() : ''
}

export const findFormatFile = (url: string) => {
    if (!url) return FILE_GENERAL

    const ext = getExtensionFromUrl(url)
    const found = listFormatFiles.find((file) => file.format === ext)
    return found ? found.icon : FILE_GENERAL
}

export const iconFormatFile = (url: string) => {
    if (!url) return FILE_GENERAL.icon

    const ext = getExtensionFromUrl(url)
    const found = listFormatFiles.find((file) => file.format === ext)
    return found ? found.icon : FILE_GENERAL.icon
}

export const isFileImage = (url: string) => {
    if (!url) return false

    const ext = getExtensionFromUrl(url)
    const found = listFormatFileImage.find((file) => file.format === ext)
    return found ? true : false
}

export const isFileRenderInElementObject = (url: string) => {
    if (!url) return false

    const ext = getExtensionFromUrl(url)
    const found = listFormatFileRenderInElementObject.find(
        (file) => file.format === ext,
    )
    return found ? true : false
}
