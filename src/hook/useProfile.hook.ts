import { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { LS_ACCOUNT } from '@/config/localStrorage.config'
import { isSuccess } from '@/helper/base/condition.helper'
import {
    getLocalStorage,
    setLocalStorage,
} from '@/helper/base/localStorage.helper'
import { ProfileProps } from '@/hook/type/hook.type.ts'
import { apiAuthProfile } from '@/service/api/auth.api.ts'

const useProfileHook = () => {
    const [profile, setProfile] = useState<ProfileProps | null | object>({})
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const _getData = () => {
        setIsLoading(true)

        apiAuthProfile()
            .then((resData) => {
                setIsLoading(false)

                if (isSuccess(resData)) {
                    setProfile(resData.result)
                    setLocalStorage(LS_ACCOUNT, JSON.stringify(resData.result))
                }
            })
            .catch((err) => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        const defaultDataAccount = JSON.parse(getLocalStorage(LS_ACCOUNT)) || {}

        if (isEmpty(defaultDataAccount)) {
            _getData()
        } else {
            setProfile(defaultDataAccount)
        }
    }, [])

    return {
        __profile: profile,
        __isLoading: isLoading,
        __actionReloadProfile: () => _getData(),
    }
}

export default useProfileHook
