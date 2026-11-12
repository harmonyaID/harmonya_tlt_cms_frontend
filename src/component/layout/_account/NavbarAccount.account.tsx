import { defaultURLAvatarText } from '@/helper/base/generateAvatar.helper.ts'
import defaultAvatar from '@/asset/image/avatar_small2x.jpeg'
import { Link } from 'react-router'
import userPath from '@/path/user.path.ts'
import { Devices, Logout, User } from 'iconsax-react'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { MDLogout } from '@/config/modal.config.ts'
import { BadgeStatusGeneral } from '@/component/general/Badge.tsx'

const NavbarAccountAccount = ({ __profile }: { __profile: any }) => {
    const _handleConfirmLogout = (isClose = false) => {
        actionModal(MDLogout, isClose)
    }

    return (
        <>
            <a
                className="align-items-center text-neutral-100 d-flex dropdown-toggle hide-arrow"
                data-toggle="dropdown"
                href="#"
                role="button"
                id="dropdownMenuProfile"
                aria-haspopup="true"
                aria-expanded="false"
                data-bs-toggle="dropdown">
                <span className="hstack gap-2">
                    <div className="thumbnail-wrapper circular d32">
                        <img
                            src={
                                __profile?.fullName
                                    ? defaultURLAvatarText(__profile?.fullName)
                                    : defaultAvatar
                            }
                            alt="Avatar"
                        />
                    </div>
                    <div>
                        <p className="text-neutral-100 fs-12 fw-600 mb-0 text-truncate">
                            {__profile.fullName}
                        </p>
                        {__profile?.email ? (
                            <p className="text-neutral-400 fs-12 mb-0 text-truncate">
                                {__profile.email}
                            </p>
                        ) : null}
                    </div>
                </span>
            </a>
            <div
                className="dropdown-menu topbar-dropdown-menu"
                aria-labelledby="dropdownMenuProfile">
                {__profile ? (
                    <div className="px-3 py-2 mb-2">
                        <div className="w-100">
                            <p className="text-neutral-100 fs-14 fw-600 mb-0 text-truncate">
                                {__profile.fullName}
                            </p>

                            {__profile?.email ? (
                                <p className="text-neutral-400 fs-12 mb-0 text-truncate">
                                    {__profile.email}
                                </p>
                            ) : null}

                            {__profile?.isSuperadmin && (
                                <BadgeStatusGeneral
                                    value="Superadmin"
                                    className="bg-primary mt-1"
                                />
                            )}
                        </div>
                    </div>
                ) : null}

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

                <Link
                    to={userPath.myProfile}
                    className="dropdown-item profile-item py-2">
                    <span className="me-2">
                        <User variant="Bulk" />
                    </span>
                    My Profile
                </Link>

                {/*<button*/}
                {/*    type="button"*/}
                {/*    className="dropdown-item profile-item py-2"*/}
                {/*    disabled={isLoadingRefreshAccess}*/}
                {/*    onClick={_handleRefreshAccess}>*/}
                {/*    <span className="me-2">*/}
                {/*        <Refresh variant="Bulk" />*/}
                {/*    </span>*/}
                {/*    Refresh Access*/}
                {/*</button>*/}
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
        </>
    )
}

export default NavbarAccountAccount
