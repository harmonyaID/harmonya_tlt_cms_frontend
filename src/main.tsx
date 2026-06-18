import { createRoot } from 'react-dom/client'
import '@/asset/theme/theme.scss'
import App from '@/App.tsx'
import ConfirmAuthExpired from '@/common/misc/ConfirmAuthExpired'
import { settingClassNameHTMLMain } from '@/helper/base/actionSettingLayout.helper.ts'
import loadBootstrapHelper from '@/helper/base/loadBootstrap.helper'

import { useEffect, useLayoutEffect } from 'react'

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
