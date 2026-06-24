import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import {
    clearLocalStorage,
    getLocalStorage,
} from '@/helper/base/localStorage.helper'
import { LS_TOKEN, LS_WELCOME } from '@/config/localStrorage.config'
import homePath from '@/path/home.path.ts'

const useIsLoginHook = () => {
    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        const isAuth = getLocalStorage(LS_TOKEN)

        if (isAuth) {
            navigate(homePath.main)
        } else {
            clearLocalStorage(LS_WELCOME)
        }

        setIsLogin(!!isAuth)
    }, [])

    return { isLogin }
}

export default useIsLoginHook
