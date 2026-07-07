import { ChangeEvent } from 'react'
import _ from 'lodash'
import { eventChange } from '@/helper/base/actionEvent.helper.ts'
import { ChangeEventCallbackInput, ContextInput } from '../type/hook.type'

const useComponentInputConfigHook = (
    ctx: ContextInput,
    onChange: ChangeEventCallbackInput | null,
    propsName: string,
    propsValue: any,
) => {
    const dataValue =
        !_.isEmpty(ctx.__value) && ctx.__value[propsName] && _.isNull(onChange)
            ? ctx.__value[propsName]
            : propsValue

    const _handleChange: any = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = eventChange(event)

        _.isFunction(ctx.__handleChange) &&
        !_.isEmpty(ctx.__value) &&
        _.isNull(onChange)
            ? ctx.__handleChange(name, value, event)
            : !_.isNull(onChange)
              ? onChange(name, value, event)
              : null
    }

    return {
        dataValue,
        handleChange: _handleChange,
    }
}

export default useComponentInputConfigHook
