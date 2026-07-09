import { cloneDeep, isEmpty } from 'lodash'
import { FormRequest, SetFormRequest } from '@/type/form.type'

const useNestedFormHook = (
    formRequest: FormRequest,
    setFormRequest: SetFormRequest,
) => {
    const _handleChange = (name: string, value: any) => {
        setFormRequest((prevState) => {
            const newPrevState = { ...prevState }
            newPrevState[name] = value
            return newPrevState
        })
    }

    const _handleChangeWithParent = (
        name: string = '',
        value: any = '',
        parent: string = '',
    ) => {
        setFormRequest((prevState) => {
            const newPrevState = { ...prevState }
            newPrevState[parent][name] = value
            return newPrevState
        })
    }

    const _handleArrToggle = (
        index: number = -1,
        parent: string = '',
        newDataForm: any = null,
    ) => {
        setFormRequest((prevState) => {
            const newPrevState = { ...prevState }

            if (index > -1) {
                parent
                    ? newPrevState[parent].splice(index, 1)
                    : newPrevState.splice(index, 1)
            } else if (newDataForm !== null) {
                parent
                    ? newPrevState[parent].push(newDataForm)
                    : newPrevState.push(newDataForm)
            }

            return newPrevState
        })
    }

    const _handleArrAddMulti = (
        parent: string = '',
        newDataForms: any[] = [],
    ) => {
        const newFormRequest = cloneDeep(formRequest)

        if (!isEmpty(newDataForms)) {
            newDataForms.forEach((newDataForm) => {
                parent
                    ? newFormRequest[parent].push(newDataForm)
                    : newFormRequest.push(newDataForm)
            })
        }
        setFormRequest(newFormRequest)
    }

    const _handleArrChange = (
        index: number,
        name: string,
        value: any,
        parent: string = '',
    ) => {
        setFormRequest((prevState) => {
            const newPrevState = { ...prevState }

            parent
                ? (newPrevState[parent][index][name] = value)
                : (newPrevState[index][name] = value)

            return newPrevState
        })
    }

    const _handleArrChangeWithParent = (
        index: number,
        name: string,
        value: any,
        parent: string = '',
        parentData: string = '',
    ) => {
        setFormRequest((prevState) => {
            const newPrevState = { ...prevState }

            parent
                ? (newPrevState[parent][index][parentData][name] = value)
                : (newPrevState[index][parentData][name] = value)

            return newPrevState
        })
    }

    const _handleReset = () => {
        // setFormRequest(initialState)
    }

    return {
        formRequest,
        setFormRequest,
        _handleChange,
        _handleChangeWithParent,
        _handleArrToggle,
        _handleArrAddMulti,
        _handleArrChange,
        _handleArrChangeWithParent,
        _handleReset,

        __formRequest: formRequest,
        __setFormRequest: setFormRequest,
        __handleChange: _handleChange,
        __handleChangeWithParent: _handleChangeWithParent,
        __handleArrToggle: _handleArrToggle,
        __handleArrAddMulti: _handleArrAddMulti,
        __handleArrChange: _handleArrChange,
        __handleArrChangeWithParent: _handleArrChangeWithParent,
        __handleReset: _handleReset,
    }
}

export default useNestedFormHook
