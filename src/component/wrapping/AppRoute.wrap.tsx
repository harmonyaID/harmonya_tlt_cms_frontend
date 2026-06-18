import { Routes, Route } from 'react-router'
import ErrorBoundary from './ErrorBoundary'
import { AppRouteProps } from './type/wrapping.type'

const AppRouteWrap = (props: AppRouteProps) => {
    return (
        <ErrorBoundary>
            <Routes>
                {props.children ? props.children : null}
                {props.dataRoutes.map((data, index) => (
                    <Route
                        key={index}
                        path={data.path}
                        element={data.element}
                    />
                ))}
            </Routes>
        </ErrorBoundary>
    )
}

export default AppRouteWrap
