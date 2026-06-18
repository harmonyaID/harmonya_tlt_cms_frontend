import { ReactNode } from 'react'

// Loading Not Available
export interface LoadingNotAvailableProps {
    isLoading: boolean
    className?: string
    isCard?: boolean
}

// Loading Suspense
export interface LoadingSuspenseProps {
    children: ReactNode
}
