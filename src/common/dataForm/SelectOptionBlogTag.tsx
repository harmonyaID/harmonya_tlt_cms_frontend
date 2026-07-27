'use client'
import { useEffect, useId, useState } from 'react'
import { isArray, isEmpty } from 'lodash'
import { SelectOptionGeneralProps } from '@/common/dataForm/type/selectOption.type.ts'
import SelectOption from '@/component/form/SelectOption.tsx'
import { BtnCircleRemove } from '@/component/general/Button.tsx'
import { useHookContextForm } from '@/context/Form.context.tsx'
import { isSuccess } from '@/helper/base/condition.helper.ts'
import useComponentInputConfigHook from '@/hook/base/useComponentInputConfig.hook'
import { apiBlogTag } from '@/service/api/contentManageSetting.api.ts'
import useBlogTagStore from '@/store/useBlogTag.store.ts'

interface ListDataProps {
    dataList?: any[]
    dataActions?: {
        remove?: (passData?: any) => void
    }
}

const shapeDataList = (passData: Record<string, any> = {}) => ({
    ...passData,
    value: passData.id,
    label: passData.name,
})

const SelectOptionBlogTag = (
    props: SelectOptionGeneralProps & ListDataProps,
) => {
    const ctx = useHookContextForm()

    const { __list, __handlePushDataStore } = useBlogTagStore({
        isFormatList: false,
    })

    const _configList = () => {
        return __list.map((vm) => ({
            // ...vm,
            // value: vm.id,
            // label: vm.name,
            ...shapeDataList(vm),
        }))
    }

    const {
        id = 'select-category-tag',
        name = '',
        className = '',
        label = '',
        placeholder = 'Select Blog Tags',

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

        isCreatable = true,

        others = {},

        // Layout Only Choose
        dataList = [],
        dataActions = {
            remove: () => {},
        },
    } = props

    const myId = id || 'select-blog-tags' + name + useId()

    const { dataValue } = useComponentInputConfigHook(
        ctx,
        props?.actions?.onChange || null,
        props.name,
        props.value,
    )

    const [selectedData, setSelectedData] = useState([])

    const [options, setOptions] = useState([])

    const _handleAddNewTag = (passData: any = {}) => {
        const formRequest = { name: passData.value || '' }

        console.log('formRequest: ', formRequest)

        apiBlogTag.add(formRequest).then((res) => {
            if (isSuccess(res)) {
                const configData = { ...shapeDataList(res.result) }

                __handlePushDataStore(configData)
                _handleSelectData([configData])
            }
        })
    }

    const _handleSelectData = (data: any = {}) => {
        if (isArray(data) && data[0]?.__isNew__) {
            // console.log('data: ', data[0])
            // __isNew__ respond default from creatable
            _handleAddNewTag(data[0])
        } else {
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
                    return dataValue.includes(vm[valueKey] ? vm[valueKey] : vm)
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
    }, [isOnlyChoose, ids, __list.length])

    return (
        <>
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
                isCreatable
                others={others}
            />

            {dataList?.length ? (
                <>
                    <p className="fs-12 mb-2 fw-600">
                        Total Tags : {dataList.length}
                    </p>
                    <div className="mb-4 max-h-240px bg-neutral-600 px-3 pb-3 rounded-2 overflow-auto">
                        {dataList.map((tag, index) => {
                            return (
                                <div
                                    key={index}
                                    className="border-dashed border-neutral-400 border-1 pb-2 pt-2 d-flex align-items-center">
                                    <div className="w-100">{tag.name}</div>
                                    <BtnCircleRemove
                                        className="ms-auto"
                                        actions={{
                                            remove: () =>
                                                dataActions.remove(tag),
                                        }}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </>
            ) : null}
        </>
    )
}

export default SelectOptionBlogTag
