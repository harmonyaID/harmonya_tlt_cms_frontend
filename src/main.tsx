import { createRoot } from 'react-dom/client'
import '@/asset/theme/theme.scss'
import App from '@/App.tsx'
import { useEffect, useLayoutEffect } from 'react'
import { settingClassNameHTMLMain } from '@/helper/base/actionSettingLayout.helper.ts'
import loadBootstrapHelper from '@/helper/base/loadBootstrap.helper'
import ConfirmAuthExpired from '@/common/misc/ConfirmAuthExpired'

const RenderApp = () => {
    useLayoutEffect(() => {
        loadBootstrapHelper()
    }, [])

    useEffect(() => {
        settingClassNameHTMLMain()
    }, [])

    return (
        <>
            <App />
            <ConfirmAuthExpired />
        </>
    )
}

createRoot(document.getElementById('root')!).render(<RenderApp />)
