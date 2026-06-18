import { useState } from 'react'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'

const useFormRequestHook = <T extends Record<string, any>>(
    initialValue?: T,
) => {
    const [formRequest, setFormRequest] = useState<T>(initialValue ?? ({} as T))

    const nestedFormHook = useNestedFormHook(formRequest, setFormRequest)

    return {
        ...nestedFormHook,

        __formRequest: formRequest,
        __setFormRequest: setFormRequest,
    }
}

export default useFormRequestHook
