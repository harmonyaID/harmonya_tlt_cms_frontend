import { createContext, useContext, ReactNode, FC } from 'react'
import { FormRequest } from '@/type/form.type'

interface Actions {
    change?: (name: string, value: any) => void
    [key: string]: any
}

interface FormContextType {
    change: (name: string, value: any, otherValue?: any) => void
    formRequest: FormRequest
    actions: Actions
}

// Tipe untuk properti WrapFormContext
interface WrapFormContextProps {
    children?: ReactNode
    formRequest?: FormRequest
    actions?: Actions
}

const FormContext = createContext<FormContextType | null>(null)

export const WrapFormContext: FC<WrapFormContextProps> = ({
    children,
    formRequest = {},
    actions = {
        change: () => {},
    },
}) => {
    const providerValues: FormContextType = {
        change: actions.change || (() => {}),
        formRequest: formRequest,
        actions: { ...actions },
    }

    return (
        <FormContext.Provider value={providerValues}>
            {children}
        </FormContext.Provider>
    )
}

export const useHookContextForm = () => {
    const context = useContext(FormContext)

    if (!context) {
        throw new Error(
            'useHookContextForm must be used within a WrapFormContext',
        )
    }

    const _handleChange = (name: string, value: any, otherValue?: any) => {
        if (context.change) {
            context.change(name, value, otherValue)
        }
    }

    return {
        __value: context.formRequest || {},
        __handleChange: _handleChange,
        __actions: context.actions || {},
    }
}
