import { useEffect, useState, useId } from 'react'
import { TreeSelect } from 'antd'
import { isEmpty } from 'lodash'
import { objectTreeStatus } from '@/config/objectData.config'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { SelectTreeOptionProps } from '@/type/form.type'

const { SHOW_ALL } = TreeSelect

const SelectTreeOption = (props: SelectTreeOptionProps) => {
    const uniqueId = useId()

    const {
        id = '',
        label = '',
        dataValue = '',
        placeholder = 'Select Option',
        className = '',
        dataValues = [],
        options = [],
        treeCheckable = false,
        required = false,
        disabled = false,
        handleChoose = () => {},
        isRender = true,
    } = props

    const [value, setValue] = useState<string>('')
    const [values, setValues] = useState<string[]>([])

    const onChange = (newValue: any) => {
        handleChoose(newValue)
    }

    const myId = id || 'select-tree-' + uniqueId

    const tProps = {
        value: treeCheckable ? values : value,
        onChange,
        showCheckedStrategy: SHOW_ALL,
        placeholder,
        style: {
            width: '100%',
        },
    }

    const _configList = (list: any[] = []) => {
        return list.map((vm) => ({
            value: vm.id,
            label: vm.name,
            ...vm,
        }))
    }

    const _handleLoopChildren = (subs: any[] = []) => {
        let newChildren: any[] = []
        const configSub = _configList(subs)

        if (!isEmpty(subs)) {
            newChildren = configSub.map((sub) => {
                const data = objectTreeStatus(
                    sub.value,
                    sub.label,
                    sub.value,
                    sub.value,
                )

                if (!isEmpty(sub.subs)) {
                    data.children = _handleLoopChildren(sub.subs)
                }

                return data
            })
        }

        return newChildren
    }

    useEffect(() => {
        if (isRender) {
            treeCheckable ? setValues(dataValues) : setValue(dataValue)
        }
    }, [dataValues, dataValue, isRender, treeCheckable])

    return (
        <div className={joinClassNameHelper('form-group', className)}>
            {label ? (
                <label htmlFor={myId} className="form-label">
                    {label}
                    <span className="text-danger-200 fs-16">
                        {required ? '*' : ''}
                    </span>
                </label>
            ) : null}

            <TreeSelect
                {...tProps}
                id={myId}
                className="custom-tree-select"
                treeData={options?.map((status) => {
                    const dataParents: any[] = []

                    const data = objectTreeStatus(
                        status.value,
                        status.label,
                        status.value,
                        status.value,
                    )

                    if (!isEmpty(status?.subs)) {
                        data.children = _handleLoopChildren(status?.subs || [])
                    }

                    dataParents.push(data)

                    return data
                })}
                popupClassName="z-index-9999"
                treeCheckable={treeCheckable}
                filterTreeNode={(search, item) => {
                    const convertToString = String(item.title)

                    return (
                        convertToString
                            .toLowerCase()
                            .indexOf(search.toLowerCase()) >= 0
                    )
                }}
                suffixIcon={null}
                allowClear
                showSearch
                disabled={disabled}
            />
        </div>
    )
}

export default SelectTreeOption
