import { Outlet } from 'react-router'
import NavbarLayout from '@/component/layout/Navbar.layout.tsx'
import SidebarLayout from '@/component/layout/Sidebar.layout.tsx'
import PrivatePageWrap from '@/component/wrapping/PrivatePage.wrap.tsx'
import { WrapGlobalPrivateContext } from '@/context/GlobalPrivate.context.tsx'
import { MainLayoutProps } from './type/wrapping.type'

const MainLayoutWrap = ({ children }: MainLayoutProps) => {
    return (
        <>
            <PrivatePageWrap>
                <WrapGlobalPrivateContext>
                    <NavbarLayout />
                    <SidebarLayout />

                    <div className="page-container" key="wp-page-container">
                        <div
                            className="page-content-wrapper"
                            key="wp-page-content-wrapper">
                            <div className="content" key="wp-content">
                                <div className="container-fluid">
                                    <Outlet />
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </WrapGlobalPrivateContext>
            </PrivatePageWrap>
        </>
    )
}

export default MainLayoutWrap
