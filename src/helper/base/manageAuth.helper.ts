import {
    LS_ACCOUNT,
    LS_FCM_TOKEN,
    LS_TOKEN,
} from '@/config/localStrorage.config.js'
import { MDTokenExpired } from '@/config/modal.config.js'
import loadBootstrapHelper from '@/helper/base/loadBootstrap.helper.ts'
import { clearLocalStorage } from '@/helper/base/localStorage.helper.js'

export const manageHandleTokenExpired = async () => {
    const dataModal: HTMLElement | null =
        document.getElementById(MDTokenExpired)

    if (dataModal) {
        const { Modal } = await loadBootstrapHelper()

        const myModal = Modal.getOrCreateInstance(dataModal)

        if (!myModal._isShown) {
            const bootstrapModal = new Modal(dataModal)
            bootstrapModal.show()

            manageClearTokenAuth()

            setTimeout(() => {
                Modal.getInstance(dataModal).hide()
                window.location.href = '/login'
            }, 2000)
        }
    }
}

export const manageClearTokenAuth = () => {
    localStorage.clear()
    clearLocalStorage(LS_TOKEN)
    clearLocalStorage(LS_ACCOUNT)
    clearLocalStorage(LS_FCM_TOKEN)
}
