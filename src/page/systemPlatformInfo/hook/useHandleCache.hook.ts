import { useEffect, useState } from 'react'

const useHandleCache = ({ dataAPI }: { dataAPI?: () => {} }) => {
    const [isLoading, setIsLoading] = useState(false)

    const _handleSubmit = () => {
        setIsLoading(true)
        dataAPI()
            //@ts-ignore
            .then((res) => {
                setIsLoading(false)
            })
            .catch((err) => {
                setIsLoading(false)
            })
    }

    return {
        __isLoading: isLoading,
        __handleSubmit: _handleSubmit,
    }
}

export default useHandleCache
