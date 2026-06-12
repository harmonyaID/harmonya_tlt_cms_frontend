import { notifySuccess, notifyError } from './base/notifyGeneral.helper'

export const copyTextToClipboard = (text: string) => {
    const id = 'clipboard-textarea-hidden-id'
    let existsTextarea: HTMLElement | null | any = document.getElementById(id)

    if (!existsTextarea) {
        const textarea: HTMLTextAreaElement | number | any =
            document.createElement('textarea')
        textarea.id = id
        // Place in top-left corner of screen regardless of scroll position.
        textarea.style.position = 'fixed'
        textarea.style.top = 0
        textarea.style.left = 0

        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textarea.style.width = '1px'
        textarea.style.height = '1px'

        // We don't need padding, reducing the size if it does flash render.
        textarea.style.padding = 0

        // Clean up any borders.
        textarea.style.border = 'none'
        textarea.style.outline = 'none'
        textarea.style.boxShadow = 'none'

        // Avoid flash of white box if rendered for any reason.
        textarea.style.background = 'transparent'
        document.querySelector('body').appendChild(textarea)

        existsTextarea = document.getElementById(id)
    } else {
        //
    }

    existsTextarea.value = text
    existsTextarea.select()

    try {
        document.execCommand('copy')
    } catch (err) {
        console.log('Unable to copy.')
    }

    document.body.removeChild(existsTextarea)
}

const dataCoordinate = (data: object | any) => {
    return `${data.latitude}, ${data.longitude}`
}

export const copyClipboard = (
    data: object | any,
    isCopyMap: boolean = false,
) => {
    if (data) {
        let clipBoardText = ''

        if (isCopyMap) {
            clipBoardText = dataCoordinate(data)
        } else {
            clipBoardText = data
        }

        copyTextToClipboard(clipBoardText)
        notifySuccess('Copied to clipboard!')
    } else {
        notifyError('Unable to copy data')
    }
}
