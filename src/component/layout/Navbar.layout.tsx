import { useState } from 'react'
import { Menu as IconFeatherMenu, Plus } from 'react-feather'
import { Link } from 'react-router'
import {
    Cpu,
    LocationTick,
    Menu,
    Notification,
    Moon,
    Sun1,
    Home3,
    Refresh,
    Logout,
} from 'iconsax-react'
import defaultAvatar from '@/asset/image/avatar_small2x.jpeg'
import ButtonNavbarSearchServiceLoc from '@/common/misc/ButtonNavbarSearchServiceLoc'
import ModalConfirmLogout from '@/common/misc/ModalConfirmLogout'
import {
    LS_ACCOUNT,
    // LS_FCM_TOKEN,
    LS_TOKEN,
} from '@/config/localStrorage.config'
import {
    MDGeneralCheckCoverage,
    MDGeneralCheckOnu,
    MDGeneralServiceApp,
    MDLogout,
} from '@/config/modal.config'
import { useBuildContext } from '@/context/Build.context.tsx'
import { useGlobalPrivateContext } from '@/context/GlobalPrivate.context.tsx'
import actionModal from '@/helper/base/actionModal.helper'
import { sidebarToggleSize } from '@/helper/base/actionSidebar.helper'
import { settingThemeMode } from '@/helper/base/actionThemeMode.helper.js'
import {
    checkThemeMode,
    isDarkMode,
    isSuccess,
} from '@/helper/base/condition.helper'
import { defaultURLAvatarText } from '@/helper/base/generateAvatar.helper'
import {
    clearLocalStorage,
    getLocalStorage,
} from '@/helper/base/localStorage.helper'
// import { customerSupportManagementLogout } from '@/service/api/auth/auth.api.js'
// import ModalConfirmLogout from '../modal/ModalConfirmLogout'
// import { businessRefreshAccess } from '@/service/api/auth/auth.api'
// import { apiAuthLogout } from '@/service/api/auth/auth.api.ts'
import { AvatarInTable } from '../general/Avatar'
import { Loading, NotAvailable } from '../general/TextDefault'
// import LoadingSpinner from '../loading/LoadingSpinner'
import ShortAddDropdownMenu from './_menu/ShortAddDropdown.menu'
import { NavbarProps } from './type/layout.type'

const NavbarLayout = ({ title = '' }: NavbarProps) => {
    // const {
    //    __notification,
    //    __action,
    //    __isLoadingNotification,
    //    __isLastPage,
    //    __isLoadingPage,
    // } = useBuildContext()

    const { __titleNavbar, __profile, __actions } = useGlobalPrivateContext()

    const [isLoadingRefreshAccess, setIsLoadingRefreshAccess] = useState(false)

    const _handleConfirmLogout = (isClose = false) => {
        actionModal(MDLogout, isClose)
    }

    const _handleRefreshAccess = () => {
        setIsLoadingRefreshAccess(true)

        // businessRefreshAccess().then((resData) => {
        //     setIsLoadingRefreshAccess(false)

        //     if (isSuccess(resData)) {
        //         __actions.reloadAccess()
        //     }
        // })

        setTimeout(() => {
            setIsLoadingRefreshAccess(false)
        }, 2000)
    }

    return (
        <>
            <header className="navbar-main">
                <button
                    className="button-menu-mobile open-left"
                    type="button"
                    onClick={sidebarToggleSize}>
                    <IconFeatherMenu size={18} strokeWidth={1.3} />
                </button>

                <div className="dropdown d-block ms-2 me-3">
                    <h5 className="fw-400 title-of-page text-ellipsis-line-1">
                        {__titleNavbar || title}
                    </h5>
                </div>

                {/*<div className="mx-auto d-none d-lg-block">*/}
                {/*    <ButtonNavbarSearchServiceLoc />*/}
                {/*</div>*/}

                <ul className="list-unstyled topbar-menu d-flex align-items-center float-end mb-0 ms-auto Pms-lg-0 me-1">
                    {/*<li*/}
                    {/*    className="dropdown me-3 d-sm-block d-none"*/}
                    {/*    id="navbar-link-created">*/}
                    {/*    <button*/}
                    {/*        className="dropdown-toggle hide-arrow btn btn-primary btn-sm mt-0 btn-circle-icon"*/}
                    {/*        id="dropdownMenuCreate"*/}
                    {/*        type="button"*/}
                    {/*        data-bs-toggle="dropdown"*/}
                    {/*        aria-expanded="false"*/}
                    {/*        aria-haspopup="true">*/}
                    {/*        <Plus size={20} />*/}
                    {/*    </button>*/}
                    {/*    <div*/}
                    {/*        className="dropdown-menu topbar-dropdown-menu"*/}
                    {/*        aria-labelledby="dropdownMenuCreate">*/}
                    {/*        <ShortAddDropdownMenu />*/}
                    {/*    </div>*/}
                    {/*</li>*/}

                    <li
                        className="dropdown me-3 d-sm-block d-none"
                        id="read-notification">
                        <a
                            href="#"
                            className="btn btn-link px-0 text-tint-100 dropdown-toggle hide-arrow"
                            role="button"
                            id="dropdownMenuNotification"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                            aria-haspopup="true"
                            aria-expanded="false"
                            onClick={() => {}}>
                            <Notification variant="Bulk" size={24} />
                            <div className="badge header-bell-badge badge-tint-300 badge-new-notification"></div>
                        </a>
                        <div
                            className="dropdown-menu topbar-dropdown-menu pt-3 pb-1"
                            id="global-notification"
                            aria-labelledby="dropdownMenuNotification"
                            style={{ width: '300px' }}>
                            <h6 className="fw-500 d-flex justify-content-between align-items-center mb-3 px-3">
                                Notification
                                <div className="d-flex align-align-items-center gap-2">
                                    <span
                                        className="cursor-pointer"
                                        onClick={() => {}}>
                                        <i className="bi bi-arrow-repeat fs-20 fw-500 text-neutral-400"></i>
                                    </span>
                                </div>
                            </h6>
                            <NotAvailable className="pb-5" />
                        </div>
                    </li>

                    <li className="dropdown">
                        <a
                            className="align-items-center text-neutral-100 d-flex dropdown-toggle hide-arrow"
                            data-toggle="dropdown"
                            href="#"
                            role="button"
                            id="dropdownMenuProfile"
                            aria-haspopup="true"
                            aria-expanded="false"
                            data-bs-toggle="dropdown">
                            <div className="thumbnail-wrapper circular d32">
                                <img
                                    src={
                                        __profile?.fullName
                                            ? defaultURLAvatarText(
                                                  __profile?.fullName,
                                              )
                                            : defaultAvatar
                                    }
                                    alt="Avatar"
                                />
                            </div>
                        </a>
                        <div
                            className="dropdown-menu topbar-dropdown-menu"
                            aria-labelledby="dropdownMenuProfile">
                            <div className="dropdown-item p">
                                Version {String(__APP_VERSION__)}
                            </div>
                            {/*<button*/}
                            {/*    type="button"*/}
                            {/*    className="dropdown-item profile-item py-2"*/}
                            {/*    onClick={() =>*/}
                            {/*        settingThemeMode(checkThemeMode())*/}
                            {/*    }>*/}
                            {/*    {!isDarkMode() ? (*/}
                            {/*        <>*/}
                            {/*            <span className="me-2">*/}
                            {/*                <Moon variant="Bulk" />*/}
                            {/*            </span>*/}
                            {/*            Dark Mode*/}
                            {/*        </>*/}
                            {/*    ) : (*/}
                            {/*        <>*/}
                            {/*            <span className="me-2">*/}
                            {/*                <Sun1 variant="Bulk" />*/}
                            {/*            </span>*/}
                            {/*            Light Mode*/}
                            {/*        </>*/}
                            {/*    )}*/}
                            {/*</button>*/}
                            <button
                                type="button"
                                className="dropdown-item profile-item py-2"
                                disabled={isLoadingRefreshAccess}
                                onClick={_handleRefreshAccess}>
                                <span className="me-2">
                                    <Refresh variant="Bulk" />
                                </span>
                                Refresh Access
                            </button>
                            <button
                                className="dropdown-item profile-item py-2"
                                id="logout-btn"
                                onClick={() => _handleConfirmLogout()}>
                                <span className="me-2">
                                    <Logout variant="Bulk" />
                                </span>
                                Log Out
                            </button>
                        </div>
                    </li>
                </ul>
            </header>

            <ModalConfirmLogout
                configHandle={{
                    // change this with relate logout API
                    // urlAPI: () => apiAuthLogout(),
                    urlAPI: () => {
                        return null
                    },
                }}
            />
        </>
    )
}

export default NavbarLayout
