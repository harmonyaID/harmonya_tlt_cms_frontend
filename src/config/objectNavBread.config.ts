import { ReactNode } from 'react'

type ActionsType = {
    url?: string
    state?: object | {}
}

type NavBreadType = {
    name: string
    actions?: ActionsType
}

export const objectNavBread = (
    name: string = '',
    actions?: ActionsType,
): NavBreadType => {
    return {
        name,
        ...(actions && { actions }),
    }
}
