import { useState } from 'react'

const useChooseData = <T extends Record<string, any>>({
    defaultData,
    action = {
        nextStep: () => {},
    },
}: {
    defaultData?: T
    action?: {
        nextStep?: () => void
    }
} = {}) => {
    const [data, setData] = useState<T>(defaultData ?? ({} as T))

    const _handleChooseData = (passData?: T) => {
        setData(passData ?? ({} as T))

        if (action?.nextStep) action.nextStep()
    }

    return {
        __data: data,
        __action: {
            setData,
            chooseData: _handleChooseData,
        },

        // @deprecated — akan dihapus, gunakan __action.setData
        get __setData() {
            console.warn(
                'useChooseData: __setData deprecated, gunakan __action.setData',
            )
            return setData
        },
        // @deprecated — akan dihapus, gunakan __action.chooseData
        get __handleChooseAndNextStep() {
            console.warn(
                'useChooseData: __handleChooseAndNextStep deprecated, gunakan __action.chooseData',
            )
            return _handleChooseData
        },
    }
}

export default useChooseData
