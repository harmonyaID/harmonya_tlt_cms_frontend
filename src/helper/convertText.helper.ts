import { ReactNode } from 'react'

export const textSlug = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // hapus aksen
        .replace(/[^a-z0-9\s-]/g, '') // hapus karakter selain huruf/angka/spasi/strip
        .replace(/\s+/g, '-') // spasi jadi strip
        .replace(/-+/g, '-')
}

export const textToId = (text?: string, format = '') => {
    const words = text.trim().toLowerCase().split(/\s+/)

    if (format === 'camel') {
        return words
            .map((word, index) =>
                index === 0
                    ? word
                    : word.charAt(0).toUpperCase() + word.slice(1),
            )
            .join('')
    }

    return words.join('-')
}
