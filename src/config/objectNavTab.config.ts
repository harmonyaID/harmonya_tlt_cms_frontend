import { ReactNode } from 'react'

export const objectTab = (name: string, id: string, count: number = 0) => ({
    name,
    id,
    count,
})

export const objectTabContent = (
    title: string | undefined,
    content: ReactNode,
) => ({
    title,
    content,
})
