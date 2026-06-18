import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { SearchFormRequestHook } from './type/hook.type'

const useSearchFormRequestHook = <
    T extends { id?: string | number; name?: string },
>({
    search = {},
    setSearch = () => {},
    actionGetData = () => {},
    keyName = 'productIds',
    isAutoSearch = true,
    isSearchAfterClear = true,
    initialData = [],
    advancedSearch = {},
    mapSelectedItem = (item: T) => ({
        id: item.id,
        name: item.name,
    }),
}: SearchFormRequestHook<T>) => {
    const [dataFormRequest, setDataFormRequest] = useState<T[]>([])

    const _handleAddFormRequest = (selected: T) => {
        if (!isEmpty(selected)) {
            const selectedItem = mapSelectedItem(selected)

            setSearch((prevState) => {
                const newSearch = { ...prevState }

                newSearch[keyName].push(selectedItem)

                return newSearch
            })

            setDataFormRequest((oldItems) => [...oldItems, selected])
        }
    }

    const _handleRemoveFormRequest = (index: number = -1) => {
        setSearch((prevState) => {
            if (index < 0) return prevState

            const newSearch = { ...prevState }

            newSearch[keyName] = [...prevState[keyName]]
            newSearch[keyName].splice(index, 1)

            return newSearch
        })

        setDataFormRequest((prevState) => {
            if (index < 0) return prevState

            const newPrevState = [...prevState]
            newPrevState.splice(index, 1)

            return newPrevState
        })
    }

    const _handleEmptyFormRequest = () => {
        setSearch((prevState) => {
            const newSearch = { ...prevState }

            newSearch[keyName] = []

            return newSearch
        })
        setDataFormRequest([])

        if (isSearchAfterClear) {
            actionGetData({ ...advancedSearch })
        }
    }

    useEffect(() => {
        if (isAutoSearch) {
            actionGetData(search)
        }
    }, [])

    useEffect(() => {
        if (!isEmpty(initialData)) {
            setDataFormRequest(initialData)
        }
    }, [initialData])

    return {
        __dataFormRequest: dataFormRequest,
        __actionAddFormRequest: _handleAddFormRequest,
        __actionRemoveFormRequest: _handleRemoveFormRequest,
        __actionEmptyFormRequest: _handleEmptyFormRequest,
    }
}

export default useSearchFormRequestHook
