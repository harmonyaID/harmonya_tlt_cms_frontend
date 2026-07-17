import { useEffect, useId, useState } from 'react'
import { isArray, isEmpty } from 'lodash'
import { SelectOptionGeneralProps } from '@/common/dataForm/type/selectOption.type.ts'
import SelectOption from '@/component/form/SelectOption.tsx'
import { useHookContextForm } from '@/context/Form.context.tsx'
import useComponentInputConfigHook from '@/hook/base/useComponentInputConfig.hook'
import useExperienceCategoryStore from '@/store/useExperienceCategory.store.ts'

const SelectOptionExperienceCategory = (props: SelectOptionGeneralProps) => {
    const ctx = useHookContextForm()

    const { __list } = useExperienceCategoryStore({ isFormatList: false })

    const _configList = () => {
        return __list.map((vm) => ({
            ...vm,
            value: vm.id,
            label: vm.name,
        }))
    }

    const {
        id = 'select-experience-category',
        name = '',
        className = '',
        label = '',
        placeholder = 'Select Experience Category',

        nameOfChange = '',
        valueKey = 'value',

        isUseHook = false,

        required = false,
        disabled = false,
        isMulti = false,

        isOnlyChoose = false,
        ids = [],

        actions = {
            onChange: () => {},
        },

        others = {},
    } = props

    const myId = id || 'select-experience-category' + name + useId()

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
            others={{
                ...others,
                components: {
                    options: (dataOption) => (
                        <>
                            <p className="fs-16">
                                {dataOption.label || dataOption.name}
                            </p>
                            <p className="fs-12">
                                Type : <b>{dataOption?.type?.name || '-'}</b>
                            </p>
                        </>
                    ),
                },
            }}
        />
    )
}

export default SelectOptionExperienceCategory
