import { useNavigate, useLocation } from 'react-router'
import { useEffect, useState } from 'react'
import {
    clearLocalStorage,
    getLocalStorage,
} from '@/helper/base/localStorage.helper'
import { LS_TOKEN, LS_WELCOME } from '@/config/localStrorage.config'
import contentHomePagePath from '@/path/contentHomePage.path.ts'
import authPath from '@/path/auth.path.ts'

const useIsLoginHook = () => {
    const navigate = useNavigate()

    const location = useLocation()

    const from = location.state?.from?.pathname || '/'

    const [isLogin, setIsLogin] = useState(false)

    const _handleStorageChange = (event: StorageEvent) => {
        if (event.storageArea !== localStorage) return

        if (event.key === LS_TOKEN) {
            const tokenNow = getLocalStorage(LS_TOKEN)

            if (tokenNow) {
                // Token baru masuk (login dari tab lain)
                if (window.location.pathname === authPath.login) {
                    navigate(from)
                }
            } else {
                // Token dihapus (logout dari tab lain)
                localStorage.clear()
                navigate(authPath.login)
            }
        }
    }

    useEffect(() => {
        const isAuth = getLocalStorage(LS_TOKEN)

        if (isAuth) {
            navigate(contentHomePagePath.main)
        } else {
            clearLocalStorage(LS_WELCOME)
        }

        setIsLogin(!!isAuth)

        window.addEventListener('storage', _handleStorageChange)

        return () => {
            window.removeEventListener('storage', _handleStorageChange)
        }
    }, [])

    return { isLogin }
}

export default useIsLoginHook
