import { useEffect, useId, useState } from 'react'
import { isArray, isEmpty } from 'lodash'
import { SelectOptionGeneralProps } from '@/common/dataForm/type/selectOption.type.ts'
import SelectOption from '@/component/form/SelectOption.tsx'
import { useHookContextForm } from '@/context/Form.context.tsx'
import useComponentInputConfigHook from '@/hook/base/useComponentInputConfig.hook'
import useBoatTypeStore from '@/store/useBoatType.store.ts'
import useUserRoleStore from '@/store/useUserRole.store.ts'

const SelectOptionUserRole = (props: SelectOptionGeneralProps) => {
    const uniqueId = useId()
    const ctx = useHookContextForm()

    const { __list } = useUserRoleStore({ isFormatList: false })

    const _configList = () => {
        return __list.map((vm) => ({
            ...vm,
            value: vm.id,
            label: vm.display,
        }))
    }

    const {
        id = 'select-user-role',
        name = '',
        className = '',
        label = '',
        placeholder = 'Select Role',

        nameOfChange = '',
        valueKey = 'value',

        isUseHook = false,

        required = false,
        disabled = false,
        isMulti = false,

        isOnlyChoose = false,
        isCreatable = false,
        ids = [],

        actions = {
            onChange: () => {},
        },

        others = {},
    } = props

    const myId = id || 'select-user-role' + name + useId()

    const { dataValue } = useComponentInputConfigHook(
        ctx,
        props?.actions?.onChange || null,
        props.name,
        props.value,
    )

    const [selectedData, setSelectedData] = useState([])

    const [options, setOptions] = useState([])

    const _handleSelectData = (data: any = {}) => {
        if (isOnlyChoose && nameOfChange) {
            _handleOnlyChose(data)
        } else {
            if (!isEmpty(ctx.__value) && isUseHook) {
                if (nameOfChange) {
                    ctx.__actions[nameOfChange](
                        props.name,
                        !isEmpty(data) ? data[valueKey] : '',
                        data,
                    )
                } else {
                    ctx.__handleChange(
                        props.name,
                        !isEmpty(data) ? data[valueKey] : '',
                    )
                }
            } else {
                if (isMulti) {
                    actions.onChange(props.name, data[valueKey], data)
                } else {
                    actions.onChange(props.name, data[valueKey] || '')
                }
            }
        }
    }

    const _handleOnlyChose = (dataDetail: object | any = {}) => {
        const isCheckValue = !isEmpty(ctx.__value)

        if (isCheckValue && isUseHook) {
            ctx.__actions[nameOfChange](dataDetail)
        } else {
            props.actions[nameOfChange](dataDetail)
        }
    }

    useEffect(() => {
        if (!isOnlyChoose) {
            const findData = _configList().filter((vm) => {
                if (!isMulti && !isArray(dataValue)) {
                    return vm[valueKey] === dataValue
                } else {
                    return dataValue.includes(vm[valueKey])
                }
            })
            setSelectedData(!isEmpty(findData) ? findData : [])
        }
    }, [isOnlyChoose, dataValue])

    // handle only choose
    useEffect(() => {
        if (isOnlyChoose) {
            const filterOptions = _configList().filter(
                (vm) => !ids.includes(vm[valueKey]),
            )

            setOptions(filterOptions)
        }
    }, [isOnlyChoose, ...ids])

    useEffect(() => {
        const findData = _configList().filter((vm) => {
            if (!isMulti && !isArray(dataValue)) {
                return vm.value === dataValue
            } else {
                return isCreatable
                    ? dataValue.some((item) => item.value === vm.value)
                    : dataValue.includes(vm.value)
            }
        })

        setSelectedData(
            isCreatable && isArray(dataValue) ? dataValue : findData || [],
        )
    }, [dataValue, __list])

    return (
        <SelectOption
            className={className}
            label={label}
            id={myId}
            {...(!isOnlyChoose ? { value: selectedData } : {})}
            onChange={(data) => _handleSelectData(data)}
            options={isOnlyChoose ? options : _configList()}
            placeholder={placeholder}
            isClearable
            isMulti={isMulti}
            required={required}
            disabled={disabled}
            others={others}
        />
    )
}

export default SelectOptionUserRole
