import { useLocation } from 'react-router'
import _ from 'lodash'
import { RESTORE_COUNT, RESTORE_STATE } from '@/config/advanceSearch.config'
import { objDataSearchOther } from '@/config/objectPassState.config'
import { LocationState } from './type/hook.type'

const useLocationStateHook = (
    params: string[] = [],
    isDataSearch: boolean = true,
) => {
    const location = useLocation()
    const dataState = (location.state || {}) as LocationState

    const newParams: Record<string, any> = {}

    if (params && _.isArray(params)) {
        params.forEach((vm) => {
            if (!_.isEmpty(dataState[vm])) {
                newParams[vm] = dataState[vm]
            }
        })
    }

    return {
        ...Object.assign(
            newParams,
            isDataSearch
                ? {
                      ...objDataSearchOther(dataState?.[RESTORE_STATE] || {}, {
                          [RESTORE_COUNT]: dataState?.[RESTORE_COUNT] || {},
                      }),
                      ...dataState,
                  }
                : { ...dataState },
        ),
    }
}

export default useLocationStateHook
