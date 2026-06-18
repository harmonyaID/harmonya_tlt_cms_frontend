import { useLayoutEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import {
    // General
    Home,
    FolderOpen,
    FolderCloud,
    CpuSetting,
    Setting,

    // Content Management
    MenuBoard,
    TaskSquare,
    Blogger,

    // Property Management
    Building,
    CalendarTick,

    // System Management
    GlobalEdit,
    Profile2User,
    Clock,
    InfoCircle,
} from 'iconsax-react'
import { isEmpty, isNull } from 'lodash'
import {
    LabelSectionProps,
    LinkMenuProps,
    MainMenuProps,
    MenuDropdownProps,
    LinkSubMenuProps,
} from '@/component/layout/type/layout.type'
import { useGlobalPrivateContext } from '@/context/GlobalPrivate.context'
import { autoRunSidebarRemoveOverlay } from '@/helper/base/actionSidebar.helper.ts'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
// import assetServicePath from '@/path/assetService.path.ts'
import dashboardPath from '@/path/dashboard.path'

const _configParamSubMenu = (name: string, to?: string) => ({ name, to })

const MainMenu = ({ idDataBsParent = '#sidebarMenu' }: MainMenuProps) => {
    const location = useLocation()

    const currentPath = useLocation().pathname

    const { __permissions } = useGlobalPrivateContext()

    const [pathNow, setPathNow] = useState<string>('')

    const [isMobileSide, setIsMobileSide] = useState<boolean>(false)

    const _handleExpanded = (parentPath: string, passPathNow: string) => {
        return passPathNow.includes(parentPath) ? 'true' : 'false'
    }

    const _handleCheckPathInclude = (passPath: string) => {
        return pathNow.includes(passPath)
    }

    const _handleTogglePath = (
        passPath: string,
        isDropdown: boolean = false,
    ) => {
        setPathNow((prevState) =>
            isDropdown
                ? prevState.includes(passPath)
                    ? passPath
                    : ''
                : passPath !== prevState
                  ? passPath
                  : '',
        )

        if (isMobileSide) {
            autoRunSidebarRemoveOverlay()
        }
    }

    const LinkMenu = ({
        name,
        to = '#',
        icon = <></>,
        isPathActive = false,
    }: LinkMenuProps) => {
        const isCheckPathActive = location.pathname === to

        return (
            <NavLink
                to={to}
                className={({ isActive }) => {
                    return isPathActive
                        ? isCheckPathActive
                            ? 'active'
                            : ''
                        : isActive
                          ? 'active'
                          : ''
                }}
                onClick={() => _handleTogglePath(to)}>
                <span className="menu-icon">{icon}</span>
                <span className="menu-title">{name}</span>
            </NavLink>
        )
    }

    const LinkSubMenu = ({ name, to = '#' }: LinkSubMenuProps) => (
        <NavLink
            to={to}
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => _handleTogglePath(to)}>
            <span className="menu-bullet" />
            <span className="menu-title">{name}</span>
        </NavLink>
    )

    const LinkMenuDropdown = ({
        name,
        to = '#',
        icon = <></>,
        children,
        idControl = '',
        subMenus = [],
    }: MenuDropdownProps) => (
        <>
            <NavLink
                to={to}
                data-bs-target={'#group-menu-' + idControl}
                data-bs-toggle="collapse"
                aria-expanded={_handleExpanded(to, pathNow)}
                aria-controls={'group-menu-' + idControl}>
                <span className="menu-icon">{icon}</span>
                <span className="menu-title">{name}</span>
                <span className="menu-arrow" />
            </NavLink>
            <ul
                className={joinClassNameHelper(
                    'sub-menu accordion-collapse collapse',
                    {
                        show: _handleCheckPathInclude(to),
                    },
                )}
                id={'group-menu-' + idControl}
                data-bs-parent={idDataBsParent}>
                {!isEmpty(subMenus)
                    ? subMenus.map((vm, idx) =>
                          !isNull(vm) ? (
                              <li key={idx}>
                                  <LinkSubMenu {...vm} />
                              </li>
                          ) : null,
                      )
                    : null}
                {children}
            </ul>
        </>
    )

    const MenuSection = ({ name }: LabelSectionProps) => (
        <li className="label-menu pt-4">{name}</li>
    )

    useLayoutEffect(() => {
        setPathNow(currentPath)
        if (window.matchMedia('(max-width: 1024px)').matches) {
            setIsMobileSide(true)
        }
    }, [])

    return (
        <>
            <li className="">
                <LinkMenu
                    name="Dashboard"
                    icon={<Home variant="Bulk" />}
                    to={dashboardPath.main}
                />
            </li>

            <MenuSection name="Content Management" />
            <li className="submenu-dropdown">
                <LinkMenuDropdown
                    name="Home"
                    to="/cm-home"
                    icon={<MenuBoard variant="Bulk" />}
                    idControl="cm-home"
                    subMenus={[
                        _configParamSubMenu('Page', '/cm-home/page'),
                        _configParamSubMenu('Banner', '/cm-home/banner'),
                    ]}
                />
            </li>
            <li className="">
                <LinkMenu
                    name="Page"
                    icon={<TaskSquare variant="Bulk" />}
                    to="/cm-page"
                />
            </li>
            <li className="">
                <LinkMenu
                    name="Blog"
                    icon={<Blogger variant="Bulk" />}
                    to="/cm-blog"
                />
            </li>
            <li className="submenu-dropdown">
                <LinkMenuDropdown
                    name="Setting CM"
                    to="/cm-setting"
                    icon={<Setting variant="Bulk" />}
                    idControl="cm-setting"
                    subMenus={[
                        _configParamSubMenu('Page', '/cm-setting/page'),
                        _configParamSubMenu('Blog', '/cm-setting/blog'),
                    ]}
                />
            </li>

            <MenuSection name="Property Management" />
            <li className="">
                <LinkMenu
                    name="Property"
                    icon={<Building variant="Bulk" />}
                    to="/property"
                />
            </li>
            <li className="">
                <LinkMenu
                    name="Booking System"
                    icon={<CalendarTick variant="Bulk" />}
                    to="/property-booking-system"
                />
            </li>
            <li className="submenu-dropdown">
                <LinkMenuDropdown
                    name="Setting Property"
                    to="/property-setting"
                    icon={<Setting variant="Bulk" />}
                    idControl="property-setting"
                    subMenus={[
                        _configParamSubMenu(
                            'General',
                            '/property-setting/general',
                        ),
                        _configParamSubMenu(
                            'Integration',
                            '/property-setting/integration',
                        ),
                    ]}
                />
            </li>

            <MenuSection name="System Management" />
            <li className="">
                <LinkMenu
                    name="Website Config"
                    icon={<GlobalEdit variant="Bulk" />}
                    to="/sm-website-config"
                />
            </li>
            <li className="submenu-dropdown">
                <LinkMenuDropdown
                    name="Account"
                    to="/sm-account"
                    icon={<Profile2User variant="Bulk" />}
                    idControl="sm-user"
                    subMenus={[
                        _configParamSubMenu('Users', '/sm-account/users'),
                        _configParamSubMenu(
                            'Role & Permission',
                            '/sm-account/role-permission',
                        ),
                    ]}
                />
            </li>
            <li className="">
                <LinkMenu
                    name="Activity Log"
                    icon={<Clock variant="Bulk" />}
                    to="/sm-activity-log"
                />
            </li>
            <li className="">
                <LinkMenu
                    name="Platform Information"
                    icon={<InfoCircle variant="Bulk" />}
                    to="/sm-platform"
                />
            </li>
        </>
    )
}

export default MainMenu
