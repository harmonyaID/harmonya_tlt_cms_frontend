import { ReactNode, createContext, useContext } from 'react'

type ThemeContextType = any

const AppContext = createContext<ThemeContextType>(null)

type Props = {
    children: ReactNode
    values?: any
}

export const WrapBuildContext = ({ children, values = {} }: Props) => {
    return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export const useBuildContext = () => useContext(AppContext)
