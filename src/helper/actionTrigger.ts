export const triggerDeepObject = (dataObject = {}) => {
    const dataArray: any[] =
        Object.keys(dataObject).map((vm) => {
            return dataObject[vm]
        }) || []

    return dataArray
}

export const triggerOnBtoa = (data) => {
    const jsonString = JSON.stringify(data)
    const encodedString = encodeURIComponent(jsonString)
    return window.btoa(JSON.stringify(encodedString))
}
