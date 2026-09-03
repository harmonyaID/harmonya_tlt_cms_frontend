import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useLocation } from 'react-router'
import { isNull, isEmpty, cloneDeep } from 'lodash'
import {
    RESTORE_COUNT,
    RESTORE_COUNT_ADVANCE,
    RESTORE_IS_USE_SEARCH,
    RESTORE_STATE,
} from '@/config/advanceSearch.config'
import { eventChange } from '@/helper/base/actionEvent.helper'
import { hideSidebar, showSidebar } from '@/helper/base/actionSidebar.helper'
import { isSuccess } from '@/helper/base/condition.helper'
import {
    ConfigList,
    DataConfigInFace,
    NewSearchList,
    PaginationInFace,
    SearchInFace,
} from '../type/hook.type'
import moment from 'moment'
import { actionFormatDateStrict } from '@/helper/actionFormatDate.helper.ts'

const defaultDataConfig: DataConfigInFace = {
    urlAPI: async () => ({}),
    advancedSearch: {},
    parameterByList: '',
    isClearAutoSearch: true,
    isHideSidebar: false,
    isAutoSearch: true, // or isFirstSearch

    paramRestoreState: RESTORE_STATE,
    paramRestoreCount: RESTORE_COUNT,
}

const useDataListHook = (passConfig: ConfigList = {}) => {
    const config = { ...defaultDataConfig, ...passConfig }

    const location = useLocation()

    const defaultSearch: SearchInFace = {
        search: '',
        page: 1,
        ...config.advancedSearch,
    }

    const [list, setList] = useState<any[]>([])
    const [search, setSearch] = useState<SearchInFace>(defaultSearch)
    const [pagination, setPagination] = useState<PaginationInFace>({})
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // Counter Advance Search Start
    const [isUseSearch, setIsUseSearch] = useState<boolean>(false)
    const [countAdvance, setCountAdvance] = useState<number>(0)

    const _handleSetUseSearch = (isUse: boolean = false) =>
        setIsUseSearch(isUse)

    const _handleSetCountAdvance = (count: number = 0) => setCountAdvance(count)

    const _handleClearCount = () => {
        _handleSetCountAdvance(0)
        _handleSetUseSearch()
    }
    // Counter Advance Search End

    const _handleSetList = (newList: any[] = []) => setList((prev) => newList)

    const _handleSetIsLoading = (newIsLoading: boolean = false) =>
        setIsLoading((prev) => newIsLoading)

    const _handleSetPagination = (newPagination: PaginationInFace = {}) =>
        setPagination((prev) => newPagination)

    const _getData = (newSearch: NewSearchList | any = {}) => {
        _handleSetIsLoading(true)

        config.urlAPI(newSearch).then((resData) => {
            _handleSetIsLoading(false)

            if (isSuccess(resData)) {
                const dataList = config.parameterByList
                    ? resData.result[config.parameterByList]
                    : resData.result || []
                _handleSetList(dataList)
                _handleSetPagination(resData.pagination || {})
            }
        })
    }

    const _change = (name: string = '', value: any) => {
        setSearch((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const _changeManual = (
        e: ChangeEvent<HTMLInputElement>,
        isBooleanChecked: boolean = false,
    ) => {
        const { name, value, isChecked } = eventChange(e, isBooleanChecked)
        _change(name, isNull(isChecked) ? value : isChecked)
    }

    const _pagination = (page: number = 1, newSearch: object = {}) => {
        const dataSearch = !isEmpty(newSearch) ? newSearch : search

        _change('page', page)
        _getData({ ...dataSearch, page })
    }

    const _submitSearch = (e: FormEvent) => {
        e.preventDefault()
        _pagination(1)
    }

    const _handleAdd = (
        newData: any,
        parameter: string = 'id',
        isFirst: boolean = false,
    ) => {
        setList((prev) => {
            const newPrev = [...prev]
            const index = newPrev.findIndex(
                (vm) => vm[parameter] === newData[parameter],
            )

            if (index > -1) {
                newPrev[index] = newData
            } else {
                if (isFirst) {
                    newPrev.unshift(newData)
                } else {
                    newPrev.push(newData)
                }
            }

            return newPrev
        })
    }

    const _handleUpdate = (
        newData: any,
        parameter: string = 'id',
        isUseOld: boolean = false,
    ) => {
        const newList = [...list]
        const index = newList.findIndex((data) => {
            const ofList = parameter ? data[parameter] : data
            const ofNewData = parameter ? newData[parameter] : newData

            return ofList === ofNewData
        })

        if (index > -1) {
            if (isUseOld) {
                newList[index] = {
                    ...newList[index],
                    ...newData,
                }
            } else {
                newList[index] = newData
            }

            setList(() => newList)
        }
    }

    const _handleUpdateAll = (passList: any = []) => {
        setList(passList)
    }

    const _handleRemove = (value: any, key: string = 'id') => {
        _handleSetList(list.filter((vm) => vm[key] !== value))
    }

    const _handleRemoveAll = () => {
        setList([])
        setSearch(cloneDeep(defaultSearch))
    }

    const _handleClear = () => {
        setSearch(cloneDeep(defaultSearch))

        if (config.isClearAutoSearch && config.isAutoSearch) {
            _getData(defaultSearch)
        }
    }

    useEffect(() => {
        if (config.isAutoSearch) {
            const paramState = config.paramRestoreState
            const paramCount = config.paramRestoreCount

            if (
                location.state &&
                location.state?.[paramState] &&
                !isEmpty(location.state?.[paramState])
            ) {
                if (!isEmpty(location.state?.[paramCount])) {
                    _handleSetCountAdvance(
                        location?.state[paramCount][RESTORE_COUNT_ADVANCE],
                    )
                    _handleSetUseSearch(
                        location?.state[paramCount][RESTORE_IS_USE_SEARCH],
                    )
                }

                _getData(location.state?.[paramState])
                setSearch(location.state?.[paramState])
                window.history.replaceState({}, '')
            } else {
                _getData(search)
            }
        } else {
            setIsLoading(false)
        }

        if (config.isHideSidebar) hideSidebar()

        return () => {
            if (config.isHideSidebar) showSidebar()
        }
    }, [])

    return {
        __list: list,
        __isLoading: isLoading,
        __search: search,
        __setSearch: setSearch,
        __pagination: pagination,
        __actionClear: _handleClear,
        __actionGetData: _getData,
        __actionChange: _change,
        __actionChangeManual: _changeManual,
        __actionPagination: _pagination,
        __actionSubmit: _submitSearch,
        __actionAdd: _handleAdd,
        __actionUpdate: _handleUpdate,
        __actionUpdateAll: _handleUpdateAll,
        __actionRemove: _handleRemove,
        __actionRemoveAll: _handleRemoveAll,

        // count advance filter
        __countAdvance: countAdvance,
        __isUseSearch: isUseSearch,
        __actionCountAdvance: _handleSetCountAdvance,
        __actionSetIsUseSearch: _handleSetUseSearch,
        __actionClearCount: _handleClearCount,
    }
}

export default useDataListHook
