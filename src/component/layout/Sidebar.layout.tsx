import MainMenu from '@/component/layout/_menu/Main.menu.jsx'
import {
    LOGO_DEFAULT,
    LOGO_ICON,
    LOGO_DEFAULT_WHITE,
    LOGO_ICON_WHITE,
} from '@/config/logoPath.config.ts'
import { sidebarRemoveOverlay } from '@/helper/base/actionSidebar.helper'

const SidebarLayout = () => (
    <>
        <aside className="page-sidebar" data-pages="sidebar">
            <div className="logo-container light-mode mb-3">
                <img
                    src={LOGO_DEFAULT}
                    className="logo-default"
                    alt="GlobalXtreme"
                />

                <img src={LOGO_ICON} className="logo-icon" alt="GlobalXtreme" />
            </div>

            <div className="logo-container dark-mode d-none mb-3">
                <img
                    src={LOGO_DEFAULT_WHITE}
                    className="logo-default"
                    alt="GlobalXtreme"
                />

                <img
                    src={LOGO_ICON_WHITE}
                    className="logo-icon"
                    alt="GlobalXtreme"
                />
            </div>

            <div className="sidebar-menu">
                <ul className="nav_list mb-3 wp-sidebar">
                    <MainMenu />
                </ul>
                <div className="clearfix"></div>
            </div>
        </aside>

        <div className="overlay-sidebar" onClick={sidebarRemoveOverlay} />
    </>
)

export default SidebarLayout
