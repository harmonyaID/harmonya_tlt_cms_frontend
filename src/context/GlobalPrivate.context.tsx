import {
    createContext,
    useContext,
    useEffect,
    useState,
    useLayoutEffect,
    ReactNode,
} from 'react'
import { isEmpty, isNull } from 'lodash'
import {
    LS_MODE_THEME,
    LS_PERMISSION,
    LS_ROLES,
    LS_TOKEN,
} from '@/config/localStrorage.config'
import {
    clearSettingBodyLayout,
    settingBodyLayout,
} from '@/helper/base/actionSettingLayout.helper.ts'
import {
    getPreferredTheme,
    settingThemeMode,
} from '@/helper/base/actionThemeMode.helper.ts'
import { isSuccess } from '@/helper/base/condition.helper.ts'
import generateFaviconHelper from '@/helper/base/generateFavicon.helper.ts'
import {
    dataProfileFromLS,
    getLocalStorage,
    setLocalStorage,
} from '@/helper/base/localStorage.helper.ts'
import { useNavigate, useLocation } from 'react-router'
import useProfileHook from '@/hook/useProfile.hook'
import authPath from '@/path/auth.path.ts'
// import { getBusinessRoleAndPermission } from '@/service/api/access/access.api'

type GlobalPrivateContextType = any
type GlobalPrivateCtxProps = {
    children: ReactNode
}

const GlobalPrivateContext = createContext<GlobalPrivateContextType>(null)

export const WrapGlobalPrivateContext = ({
    children,
}: GlobalPrivateCtxProps) => {
    const navigate = useNavigate()
    const location = useLocation()
    const useProfile = useProfileHook()

    const [isSidebarSmall, setIsSidebarSmall] = useState<boolean>(false)
    const [access, setAccess] = useState({
        roles: {},
        permissions: {},
    })
    const [isLoadingAccess, setIsLoadingAccess] = useState<boolean>(true)

    const [titlePage, setTitlePage] = useState<string>('')
    const [titleNavbar, setTitleNavbar] = useState<string | Element>('')

    const _handleTitleAll = (
        passNavTitle: string | Element,
        passTitlePage: string = '',
    ): void => {
        const configTitlePage: string =
            (passTitlePage || passNavTitle) + ' - TLT CRM'

        setTitleNavbar(passNavTitle)
        setTitlePage(configTitlePage)
        document.title = configTitlePage
    }

    const _handleCheckRenderAccess = async () => {
        const cacheRoles = JSON.parse(getLocalStorage(LS_ROLES)) || {}
        const cachePermissions =
            JSON.parse(getLocalStorage(LS_PERMISSION)) || {}

        if (isEmpty(cacheRoles) || isEmpty(cachePermissions)) {
            _getAccess()
        } else {
            setAccess((prev) => {
                const newAccess = { ...prev }
                newAccess.roles = cacheRoles
                newAccess.permissions = cachePermissions

                return newAccess
            })
            setIsLoadingAccess(false)
        }
    }

    // Config for reload cross tab
    const _handleStorageChange = (event) => {
        if (event.key === LS_MODE_THEME) {
            settingThemeMode(event.newValue)
        } else if (event.key === LS_ROLES || event.key === LS_PERMISSION) {
            _handleCheckRenderAccess()
        } else if (
            event.storageArea === localStorage &&
            isNull(getLocalStorage(LS_TOKEN))
        ) {
            console.log('location: ', location)
            navigate(authPath.login, {
                state: {
                    from: location,
                },
            })
            localStorage.clear()
        }
    }

    const _getAccess = () => {
        if (!isEmpty(dataProfileFromLS)) {
            const dataBusiness: any = []

            // const dataBusiness = getBusinessRoleAndPermission().then(
            //     (resData) => {
            //         if (isSuccess(resData) && !isEmpty(resData.result)) {
            //             return resData.result
            //         }

            //         return {}
            //     },
            // )

            Promise.all([dataBusiness]).then((results) => {
                let allRoles = {}
                let allPermissions = {}

                if (isEmpty(results)) {
                    results.map((vm) => {
                        if (vm.roles) {
                            allRoles = Object.assign(allRoles, vm.roles)
                        }

                        if (vm.permissions) {
                            allPermissions = Object.assign(
                                allPermissions,
                                vm.permissions,
                            )
                        }
                    })
                }

                setLocalStorage(LS_ROLES, JSON.stringify(allRoles))
                setLocalStorage(LS_PERMISSION, JSON.stringify(allPermissions))

                setAccess((prev) => {
                    const newAccess = { ...prev }
                    newAccess.roles = allRoles
                    newAccess.permissions = allPermissions

                    return newAccess
                })

                setIsLoadingAccess(false)
            })
        }
    }

    useEffect(() => {
        generateFaviconHelper()
        _handleCheckRenderAccess()

        window.addEventListener('storage', _handleStorageChange)

        return () => {
            document.title = ''
            clearSettingBodyLayout()
            window.removeEventListener('storage', _handleStorageChange)
        }
    }, [])

    useLayoutEffect(() => {
        settingBodyLayout()
        settingThemeMode(getPreferredTheme())
    }, [])

    return (
        <GlobalPrivateContext.Provider
            value={{
                __isSidebarSmall: isSidebarSmall,
                __handleIsSidebar: setIsSidebarSmall,
                __roles: { ...access.roles },
                __permissions: { ...access.permissions },
                __isLoadingAccess: isLoadingAccess,

                // Handle Title
                __setTitleAll: _handleTitleAll,
                __titlePage: titlePage,
                __titleNavbar: titleNavbar,

                // Profile
                __profile: useProfile.__profile,
                __isLoadingProfile: useProfile.__isLoading,
                __handleReloadProfile: useProfile.__actionReloadProfile,

                __actions: {
                    reloadAccess: () => _getAccess(),
                },
            }}>
            {children}
        </GlobalPrivateContext.Provider>
    )
}

export const useGlobalPrivateContext = () => ({
    ...useContext(GlobalPrivateContext),
})
