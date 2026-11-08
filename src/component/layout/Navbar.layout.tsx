'use client'
import { useState } from 'react'
import { Menu as IconFeatherMenu, Plus } from 'react-feather'
import { Notification } from 'iconsax-react'
import ModalConfirmLogout from '@/common/misc/ModalConfirmLogout'
import { useGlobalPrivateContext } from '@/context/GlobalPrivate.context.tsx'
import { sidebarToggleSize } from '@/helper/base/actionSidebar.helper'
import { apiAuthLogout } from '@/service/api/auth.api.ts'
import { Loading, NotAvailable } from '../general/TextDefault'
import { NavbarProps } from './type/layout.type'
import NavbarAccountAccount from '@/component/layout/_account/NavbarAccount.account.tsx'

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
                        <NavbarAccountAccount __profile={__profile} />
                    </li>
                </ul>
            </header>

            <ModalConfirmLogout
                configHandle={{
                    // change this with relate logout API
                    urlAPI: () => apiAuthLogout(),
                }}
            />
        </>
    )
}

export default NavbarLayout
