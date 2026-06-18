import { FC } from 'react'
import { Navigate, Outlet } from 'react-router'
import * as _ from 'lodash'
import { LS_TOKEN } from '@/config/localStrorage.config'
import { getLocalStorage } from '@/helper/base/localStorage.helper'

const ProtectedRoot: FC = () => {
    const isAuth = getLocalStorage(LS_TOKEN)

    return _.isEmpty(isAuth) ? (
        <Navigate to="/login" replace />
    ) : (
        <>
            <Outlet />
        </>
    )
}

export default ProtectedRoot
