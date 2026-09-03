import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { LS_TOKEN } from '@/config/localStrorage.config'
import { getLocalStorage } from '@/helper/base/localStorage.helper.ts'
import authPath from '@/path/auth.path.ts'
import { PrivatePageProps } from './type/wrapping.type'

const PrivatePageWrap = ({ children }: PrivatePageProps) => {
    const isAuth = getLocalStorage(LS_TOKEN)
    const navigate = useNavigate()

    useEffect(() => {
        // document.title = props.title

        if (!isAuth) {
            navigate(authPath.login)
        }
    }, [])

    return isAuth ? children : null
}

export default PrivatePageWrap
