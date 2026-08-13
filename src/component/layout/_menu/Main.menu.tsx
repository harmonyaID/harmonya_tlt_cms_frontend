import { useLayoutEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import {
    // General
    Home,
    Setting,

    // Content Management
    MenuBoard,
    Home3,
    TaskSquare,
    Blogger,
    HambergerMenu,

    // Experience Management
    MedalStar,
    Map,
    Flag,
    MessageQuestion,

    // Property Management
    Building,
    CalendarTick,
    Star,

    // System Management
    GlobalEdit,
    Profile2User,
    Clock,
    InfoCircle,
    Setting2,

    // Boat Management
    Ship,
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
import boatPath from '@/path/boat.path.ts'
import boatSettingPath from '@/path/boatSetting.path.ts'
import contentAllPagesPath from '@/path/contentAllPages.path.ts'
import contentBlogPath from '@/path/contentBlog.path'
import contentExperiencePath from '@/path/contentExperience.path.ts'
import contentHomePagePath from '@/path/contentHomePage.path.ts'
import contentMenuPath from '@/path/contentMenu.path.ts'
import contentSettingPath from '@/path/contentSetting.path.ts'
import dashboardPath from '@/path/dashboard.path'
import experienceAreaPath from '@/path/experienceArea.path.ts'
import experienceInquiryFormPath from '@/path/experienceInquiryForm.path.ts'
import experienceTypePath from '@/path/experienceType.path.ts'
import propertyPath from '@/path/property.path.ts'
import propertyInquiryPath from '@/path/propertyInquiry.path.ts'
import propertyReviewsPath from '@/path/propertyReviews.path.ts'
import propertySettingPath from '@/path/propertySetting.path.ts'
import {
    smActivityLogPath,
    smGeneralSettingPath,
    smPlatformInfoPath,
    smWebConfigPath,
} from '@/path/systemManagement.path.ts'
import userPath from '@/path/user.path.ts'

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

    useLayoutEffect(() => {
        const timer = setTimeout(() => {
            const scrollParent =
                document.querySelector<HTMLElement>('.sidebar-menu')
            const activeEl =
                scrollParent?.querySelector<HTMLElement>('a.active')

            if (scrollParent && activeEl) {
                const parentRect = scrollParent.getBoundingClientRect()
                const activeRect = activeEl.getBoundingClientRect()

                const offset =
                    activeRect.top -
                    parentRect.top +
                    scrollParent.scrollTop -
                    scrollParent.clientHeight / 2 +
                    activeRect.height / 2

                scrollParent.scrollTo({
                    top: offset,
                    behavior: 'smooth',
                })
            }
        }, 30)

        return () => clearTimeout(timer)
    }, [])
    // }, [pathNow])

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
                <LinkMenu
                    name="Home Page"
                    icon={<Home3 variant="Bulk" />}
                    to={contentHomePagePath.main}
                />
            </li>
            <li className="">
                <LinkMenu
                    name="All Pages"
                    icon={<TaskSquare variant="Bulk" />}
                    to={contentAllPagesPath.main}
                />
            </li>
            <li className="">
                <LinkMenu
                    name="Blog"
                    icon={<Blogger variant="Bulk" />}
                    to={contentBlogPath.main}
                />
            </li>
            <li className="">
                <LinkMenu
                    name="Menu"
                    icon={<HambergerMenu variant="Bulk" />}
                    to={contentMenuPath.main}
                />
            </li>
            <li className="submenu-dropdown">
                <LinkMenuDropdown
                    name="Setting"
                    to={contentSettingPath.main}
                    icon={<Setting variant="Bulk" />}
                    idControl="cm-setting"
                    subMenus={[
                        _configParamSubMenu('Page', contentSettingPath.page),
                        _configParamSubMenu('Blog', contentSettingPath.blog),
                        // _configParamSubMenu(
                        //     'Experience',
                        //     contentSettingPath.experience,
                        // ),
                    ]}
                />
            </li>

            <MenuSection name="Experience Management" />
            <li className="">
                <LinkMenu
                    name="Experience"
                    icon={<MedalStar variant="Bulk" />}
                    to={contentExperiencePath.main}
                />
            </li>
            <li className="">
                <LinkMenu
                    name="Inquiry Form"
                    icon={<MessageQuestion variant="Bulk" />}
                    to={experienceInquiryFormPath.main}
                />
            </li>
            <li className="">
                <LinkMenu
                    name="Type"
                    icon={<Flag variant="Bulk" />}
                    to={experienceTypePath.main}
                />
            </li>
            <li className="">
                <LinkMenu
                    name="Area"
                    icon={<Map variant="Bulk" />}
                    to={experienceAreaPath.main}
                />
            </li>

            <MenuSection name="Boat Management" />
            <li className="">
                <LinkMenu
                    name="Boat"
                    icon={<Ship variant="Bulk" />}
                    to={boatPath.main}
                />
            </li>
            <li className="">
                <LinkMenu
                    name="Boat Setting"
                    icon={<Setting variant="Bulk" />}
                    to={boatSettingPath.main}
                />
            </li>

            <MenuSection name="Property Management" />
            <li className="">
                <LinkMenu
                    name="Property"
                    icon={<Building variant="Bulk" />}
                    to={propertyPath.main}
                />
            </li>
            <li className="">
                <LinkMenu
                    name="Property Inquiry"
                    icon={<CalendarTick variant="Bulk" />}
                    to={propertyInquiryPath.main}
                />
            </li>
            <li className="">
                <LinkMenu
                    name="Property Reviews"
                    icon={<Star variant="Bulk" />}
                    to={propertyReviewsPath.main}
                />
            </li>
            <li className="submenu-dropdown">
                <LinkMenuDropdown
                    name="Property Setting "
                    to={propertySettingPath.main}
                    icon={<Setting variant="Bulk" />}
                    idControl="property-setting"
                    subMenus={[
                        _configParamSubMenu(
                            'General',
                            propertySettingPath.general,
                        ),
                        _configParamSubMenu(
                            'Integration',
                            propertySettingPath.integration,
                        ),
                        _configParamSubMenu(
                            'Static',
                            propertySettingPath.static,
                        ),
                    ]}
                />
            </li>

            <MenuSection name="System Management" />
            <li className="submenu-dropdown">
                {/*<LinkMenuDropdown*/}
                {/*    name="Account"*/}
                {/*    to={userPath.basic}*/}
                {/*    icon={<Profile2User variant="Bulk" />}*/}
                {/*    idControl="sm-staff"*/}
                {/*    subMenus={[*/}
                {/*        _configParamSubMenu('Staff', userPath.main),*/}
                {/*        _configParamSubMenu(*/}
                {/*            'Role & Permission',*/}
                {/*            userPath.roleAndPermission.main,*/}
                {/*        ),*/}
                {/*    ]}*/}
                {/*/>*/}

                <LinkMenu
                    name="Staff"
                    icon={<Profile2User variant="Bulk" />}
                    to={userPath.main}
                />
            </li>
            <li className="">
                <LinkMenu
                    name="Website Config"
                    icon={<GlobalEdit variant="Bulk" />}
                    to={smWebConfigPath.main}
                />
            </li>
            <li className="">
                <LinkMenu
                    name="General Setting"
                    icon={<Setting2 variant="Bulk" />}
                    to={smGeneralSettingPath.main}
                />
            </li>
            <li className="">
                <LinkMenu
                    name="Activity Log"
                    icon={<Clock variant="Bulk" />}
                    to={smActivityLogPath.main}
                />
            </li>
            <li className="">
                <LinkMenu
                    name="Platform Info"
                    icon={<InfoCircle variant="Bulk" />}
                    to={smPlatformInfoPath.main}
                />
            </li>
        </>
    )
}

export default MainMenu
