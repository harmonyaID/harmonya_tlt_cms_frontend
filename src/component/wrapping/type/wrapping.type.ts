import { ReactNode } from 'react'

// App Route
export type AppRouteProps = {
    children: any
    baseURL: string
    dataRoutes: any[]
}

// Error Boundary
export type ErrorBoundaryProps = {
    children: ReactNode
}

// Form Wrap
export interface FormWrapProps {
    children: ReactNode
    actions?: {
        handleSubmit?: () => void
    }
    className?: string
}

// Main Layout
export interface MainLayoutProps {
    children?: any
}

// Private Page Wrap
export interface PrivatePageProps {
    children?: any
}
