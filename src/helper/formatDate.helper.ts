export const formatDatePublish = (date = new Date()) => {
    const pad = (n) => String(n).padStart(2, '0')

    const year = date.getFullYear()
    const month = pad(date.getMonth() + 1)
    const day = pad(date.getDate())
    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())
    const seconds = pad(date.getSeconds())

    // Ex: 2026-07-10 09:00
    return `${year}-${month}-${day} ${hours}:${minutes}`
}
