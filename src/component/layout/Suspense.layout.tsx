import { Suspense, useEffect } from 'react'
import {
    LOGO_OPENING_WAITING,
    LOGO_SPLASH_SCREEN_WHITE,
} from '@/config/logoPath.config.ts'
import { useGlobalPrivateContext } from '@/context/GlobalPrivate.context.tsx'
import { SuspenseLayoutProps } from './type/layout.type'
import WrapPermissionLayout from './WrapPermission.layout'

const LoadingFallBack = () => (
    <div className="loading-space-screen">
        <div className="wrap-logo">
            <img
                src={LOGO_OPENING_WAITING}
                alt="Loading"
                className="load-animated-logo default-logo"
            />

            <img
                src={LOGO_SPLASH_SCREEN_WHITE}
                alt="Loading"
                className="load-animated-logo dark-mode-logo"
            />
        </div>
    </div>
)

const SuspenseLayout = ({
    children,
    titlePage = '',
    titleNavbar = '',
    permission = '',
    isOtherCheckBy = '',
    isCheckPermission = true,
}: SuspenseLayoutProps) => {
    const { __setTitleAll } = useGlobalPrivateContext()

    useEffect(() => {
        if (titleNavbar) {
            __setTitleAll(titleNavbar, titlePage)
        } else {
            document.title = titlePage || titleNavbar || 'Page'
        }
    }, [titlePage, titleNavbar])

    return (
        <Suspense fallback={<LoadingFallBack />}>
            {isCheckPermission ? (
                <WrapPermissionLayout
                    permission={permission}
                    isOtherCheckBy={isOtherCheckBy}>
                    {children}
                </WrapPermissionLayout>
            ) : (
                children
            )}
        </Suspense>
    )
}

export default SuspenseLayout
