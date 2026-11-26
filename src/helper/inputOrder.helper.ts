import { ChangeEvent } from 'react'

// Order input accepts digits, a single "-" (no order), or an empty string
export const handleOrderInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    event.target.value = value.startsWith('-')
        ? '-'
        : value.replace(/[^0-9]/g, '')
}
