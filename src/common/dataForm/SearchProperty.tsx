import { useState, useEffect, useId, FC } from 'react'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { isEmpty } from 'lodash'
import { useHookContextForm } from '@/context/Form.context'
import propertyPath from '@/path/property.path.ts'
import { apiProperty } from '@/service/api/property.api.ts'

const SearchProperty = (props: any) => {
    // @ts-ignore
    const ctx = useHookContextForm(props.name)

    const {
        id = '',
        label = '',
        className = '',
        classNameInput = '',
        nameOfChange = '',
        placeholder = 'Search by Property Name',
        tokenCancel = 'list',
        keyName = 'id',

        icon = null,

        disabled = false,

        dataProperty = {},
        isUseDataPropertyToHandle = false,

        isUseHook = false,
        required = false,
        isEdit = false,

        isOnlyChoose = false,
        propertyIds = [],

        actions = {
            onChange: () => {},
        },
    } = props

    const _handleChange = (
        passValue: string | any = '',
        dataDetail: object | any = {},
    ) => {
        if (isOnlyChoose && nameOfChange) {
            _handleOnlyChose(dataDetail)
        } else {
            if (!isEmpty(ctx.__value) && isUseHook) {
                if (nameOfChange) {
                    ctx.__actions[nameOfChange](
                        props.name,
                        passValue,
                        dataDetail,
                    )
                } else {
                    ctx.__handleChange(props.name, passValue)
                }
            } else {
                actions.onChange(props.name, passValue, dataDetail)
            }
        }
    }

    const _handleOnlyChose = (dataDetail: object = {}) => {
        const isCheckValue: boolean = !isEmpty(ctx.__value)

        if (isCheckValue && isUseHook) {
            ctx.__actions[nameOfChange](dataDetail)
        } else {
            props.actions[nameOfChange](dataDetail)
        }
    }

    // ****
    // =========  Setup For Searching ========

    const idInput = id || 'text-search-network-setting-' + props.name + useId()

    const [selectedData, setSelectedData] = useState<any[]>([])

    const [query, setQuery] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [options, setOptions] = useState<any[]>([])
    const [search, setSearch] = useState({
        search: '',
    })

    const latestSearch = search

    const _handleFilterOptions = (passOptions = []) => {
        const newOptions = []

        passOptions.forEach((vm) => {
            const index = propertyIds.findIndex(
                (dataId) => dataId === vm[keyName],
            )
            const checkIndex = index > -1 ? false : true

            if (checkIndex) {
                newOptions.push(vm)
            }
        })

        return newOptions
    }

    const _handleSelected = (newData: object | any = {}) => {
        setSelectedData([newData])
        _handleChange(newData[keyName] || '', newData)
    }

    const _handleFilter = (option: any) => {
        let found: number = 0
        const stringQuery: string = query.toLocaleLowerCase()

        const filteredBy: string[] = ['nickname']

        filteredBy.forEach((key) => {
            const search: string = option[key]

            if (search) {
                if (search.toLowerCase().includes(stringQuery)) {
                    found++
                }
            }
        })

        return !!found
    }

    const _handleSearch = (query: string = '') => {
        setSearch((prev) => ({
            search: query,
        }))

        _handleGet({
            search: query,
        })
    }

    const _handlePagination = () => {
        setSearch((prev) => ({
            ...prev,
        }))
    }

    const _handleGet = (newDataSearch: object | any = {}) => {
        const dataSearch: object | any = !isEmpty(newDataSearch)
            ? { ...newDataSearch }
            : { ...latestSearch }
        setIsLoading(true)

        apiProperty
            .list(dataSearch, props.name + tokenCancel)
            .then((resData) => {
                setIsLoading(false)

                if (resData) {
                    const newOptions: any[] = resData?.result || []

                    if (!isEmpty(dataProperty)) {
                        const index: number = newOptions.findIndex(
                            (e) => e[keyName] === dataProperty[keyName],
                        )

                        if (index > -1) {
                            setSelectedData([newOptions[index]])

                            if (isUseDataPropertyToHandle) {
                                _handleChange('', newOptions[index])
                            }
                        }
                    }

                    setOptions((prev) => [...newOptions])
                }
            })
    }

    useEffect(() => {
        if (!isEmpty(dataProperty)) {
            !isEmpty(dataProperty?.nickname) && isEdit
                ? _handleSearch(dataProperty?.nickname)
                : null
        } else {
            _handleSelected({})
        }
    }, [dataProperty?.nickname])

    return (
        <div className={'form-group ' + className}>
            {label ? (
                <label htmlFor={idInput} className="form-label">
                    {label}
                    <span className="text-danger-200 fs-16">
                        {required ? '*' : ''}
                    </span>
                </label>
            ) : null}

            <AsyncTypeahead
                id={idInput}
                className="custom-dropdown-employee"
                isLoading={isLoading}
                minLength={3}
                labelKey={(option: object | any) => `${option.nickname}`}
                onSearch={_handleSearch}
                onPaginate={_handlePagination}
                paginate
                options={isOnlyChoose ? _handleFilterOptions(options) : options}
                placeholder={placeholder}
                paginationText="More results..."
                caseSensitive={false}
                delay={350}
                useCache={false}
                selected={
                    !isLoading && !isOnlyChoose
                        ? !isEmpty(selectedData[0])
                            ? [selectedData[0]]
                            : []
                        : []
                }
                onChange={(selected) => {
                    isOnlyChoose && !isEmpty(selected[0])
                        ? _handleSelected(selected[0])
                        : !isOnlyChoose
                          ? _handleSelected(selected[0])
                          : null
                }}
                filterBy={(option, props) => {
                    return _handleFilter(option)
                }}
                renderMenuItemChildren={(option: object | any) => {
                    return (
                        <div className="wp-data" key={option[keyName]}>
                            <h5 className="fs-18 fw-500 text-neutral-100 mb-0 mt-1">
                                {option.nickname || '-'}
                            </h5>
                        </div>
                    )
                }}
                clearButton
                disabled={disabled || isLoading}
            />
        </div>
    )
}

export default SearchProperty
