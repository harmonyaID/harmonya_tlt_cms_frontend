import { useState, useEffect, FC } from 'react'
import { ErrorBoundaryProps } from './type/wrapping.type'

const ErrorBoundary: FC<ErrorBoundaryProps> = ({ children }) => {
    const [hasError, setHasError] = useState(false)

    const componentDidCatch = (error: any, info: any): void => {
        setHasError(true)
        console.log('Error Boundary')
        console.log(error, info)
    }

    useEffect(() => {
        const handleError = (error: ErrorEvent) => {
            componentDidCatch(error.error, { componentStack: '' })
        }

        window.addEventListener('error', handleError)

        return () => {
            window.removeEventListener('error', handleError)
        }
    }, [])

    if (hasError) {
        return <h4 className="text-center">Oops. Something went wrong.</h4>
    }

    return <>{children}</>
}

export default ErrorBoundary
