import { useState } from 'react'

const useChooseMultiData = <T>() => {
    const [list, setList] = useState<T[]>([])

    const _handleAdd = (passData: T | any, isFirst: boolean = false) => {
        setList((prevState) => {
            const newState = [...prevState]
            if (isFirst) {
                newState.unshift(passData)
            } else {
                newState.push(passData)
            }
            return newState
        })
    }

    const _handleUpdate = (newData: T | any = {}, parameter: string = 'id') => {
        setList((prevState) => {
            const newState = { ...prevState }

            const index = newState.findIndex((data) => {
                const ofList = parameter ? data[parameter] : data
                const ofNewData = parameter ? newData[parameter] : newData

                return ofList === ofNewData
            })

            if (index > -1) {
                newState[index] = newData
            }

            return newState
        })
    }

    const _handleRemove = (passIndex: number) => {
        setList(list.filter((vm, index) => index !== passIndex))
    }

    return {
        __list: list,
        __setList: setList,
        __handleAdd: _handleAdd,
        __handleUpdate: _handleUpdate,
        __handleRemove: _handleRemove,
    }
}

export default useChooseMultiData
